import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {createSessionClient} from "./lib/appwrite";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const isAdminRoute = url.pathname.startsWith("/admin");
  const isProfileRoute = url.pathname.startsWith("/profil");

  let user = null;
  try {
    const {account} = await createSessionClient();
    user = await account.get();
  } catch (error) {
    console.error(error);
    user = null;
  }

  if (!user) {
    if (isAdminRoute || isProfileRoute) {
      return NextResponse.redirect(new URL("/not-authenticated", req.url));
    }
    return NextResponse.next();
  }

  const {labels} = user;

  if (isAdminRoute && !labels?.includes("admin")) {
    const detectedIp = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
    console.log(`❌ Acces neautorizat către /admin de la IP: ${detectedIp}`);

    return NextResponse.redirect(new URL("/not-authorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profil/:path*"],
};
