import React from "react";
import AcmeLogo from "@/app/ui/acme-logo";
import LoginForm from "@/app/ui/login-form";

export default function LoginPage(): React.ReactElement {
  return (
      <main>
        <div className="flex items-center justify-center md:h-screen">
          <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32 bg-amber-700">
            <div className="w-32 text-white md:w-36">
              <AcmeLogo />
            </div>
          </div>
        <LoginForm />
        </div>
      </main>
  )
}
