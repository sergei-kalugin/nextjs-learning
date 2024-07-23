import React from "react";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/edit-form";
import {fetchCustomers} from "@/app/lib/data";
import {fetchInvoiceById} from "@/app/lib/data";

export default async function Page(
    { params }: { params: { id: string }}
): Promise<React.ReactElement> {
  const id = params.id;
  const [
      invoice,
      customers
  ] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);
  
  return (
      <main>
        <Breadcrumbs
            breadcrumbs={[
              {
                label: 'Invoices',
                href: '/dashboard/invoices',
              },
              {
                label: 'Edit Invoice',
                href: `/dashboard/invoices/${id}/edit`,
                active: true,
              }
            ]}
        />
        <Form customers={customers}  invoice={invoice}/>
      </main>
  )
}
