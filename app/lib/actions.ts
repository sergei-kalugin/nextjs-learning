'use server';

import { z } from 'zod';
import {db} from "@/app/db/db";
import {sql} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({
  id: true,
  date: true,
})

export async function createInvoice(formData: FormData) {
  const rawFormData = {
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  };

  const {
    customerId,
    amount,
    status,
  } = CreateInvoice.parse(rawFormData);

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
