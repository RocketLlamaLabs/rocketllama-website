import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Owner sign in",
};

export default function AuthLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex flex-1 flex-col bg-mist">
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-12">
        <Link href="/" className="mb-8 self-center">
          <Image
            src="/brand/logo-nav.svg"
            alt="Rocket Llama Labs"
            width={249}
            height={40}
            priority
            className="h-10 w-auto"
          />
        </Link>
        <div className="rounded-lg bg-white p-8 shadow-md">{children}</div>
      </main>
    </div>
  );
}
