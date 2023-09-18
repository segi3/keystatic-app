import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { nextauthOptions } from "../../lib/nextAuthOptions";
import KeystaticApp from "./keystatic";

export default async function Layout() {

  // Example of getting server session
  // const session = await getServerSession(nextauthOptions);
  // console.log(session)
  // if (!session?.user) {
  //   const url = new URL("/api/auth/signin", "http://localhost:3000");
  //   url.searchParams.append("callbackUrl", "/keystatic");
  //   redirect(url.toString());
  // }
  

  return (
    <html>
      <head />
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}