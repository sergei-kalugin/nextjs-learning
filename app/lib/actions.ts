'use server';

import { z } from 'zod';
import {db} from "@/app/db/db";
import {sql} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce.number().gt(0, {
    message: 'Please enter an amount greater than $0.',
  }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({
  id: true,
  date: true,
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
}

export async function createInvoice(prevState: State, formData: FormData) {
  // Validate fields with zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // console.log(validatedFields);
  // console.log(validatedFields.error?.flatten());

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to create invoice.',
    }
  }

  const { amount, customerId, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await db.execute(sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `);
  } catch (error) {
    return {
      message: 'Database error: failed to create invoice',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// Update Invoice
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice (id: string, formData: FormData) {
  const {
      customerId,
      amount,
      status,
  } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  })

  const amountInCents = amount * 100;

  try {
    await db.execute(sql`
    UPDATE invoices
    SET customer_id = ${customerId},
        amount = ${amountInCents},
        status = ${status}
    WHERE id = ${id}
  `);
  } catch (error) {
    return {
      message: 'Database error: failed to update invoice',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// Delete Invoice
export async function deleteInvoice(id: string) {
  // todo: remove in production
  throw new Error('Not implemented!');

  try {
    await db.execute(sql`
    DELETE FROM invoices
    WHERE id = ${id}
  `);
    revalidatePath('/dashboard/invoices');
    return {
      message: 'Invoice deleted successfully',
    }
  } catch (error) {
    return {
      message: 'Database error: failed to delete invoice',
    };
  }
}
