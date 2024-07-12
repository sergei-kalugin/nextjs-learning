import React from "react";
import {lusitana} from "@/app/ui/fonts";
import {fetchRevenue} from "@/app/lib/data";

export default async function Page(): Promise<React.ReactElement> {
  const revenue = await fetchRevenue();

  console.log(revenue.length);

  return(
      <main>
        <h1 className={`${lusitana.className} mb-4 text-2xl md:text-3xl`}>
          Dashboard
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Cards go here */}
        </div>
        <div className="mt-6 border-t-4 grid grid-cols-1 gap-6 md:grid-cols:4 lg:grid-cols-8">
          Revenue Chart
          <hr/>
          Latest Invoices
        </div>
      </main>
  )
}
