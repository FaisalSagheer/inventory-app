import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    console.log(req.nextUrl.pathname);
    console.log(req.nextauth.token.role);
    // if (
    //   req.nextUrl.pathname.startsWith("/dashboard") 
    //   // &&// req.nextauth.token.role != "admin"
    // ) {
    //   return NextResponse.rewrite(new URL("/Denied", req.url));
    // }
    if (
      req.nextUrl.pathname.startsWith("/dashboard/users") &&
      req.nextauth.token.role != "admin"
    ) {
      return NextResponse.rewrite(new URL("/Denied", req.url));
    }
    // if (
    //   req.nextUrl.pathname.startsWith("/dashboard/inventory") &&
    //   req.nextauth.token.role !== "admin"
    // ) {
    //   return NextResponse.rewrite(new URL("/Denied", req.url));
    // }
  },
  // {
  //   callbacks: {
  //     authorized: ({ token }) => !!token,
  //   },
  // }
);
export const config = { matcher: ["/dashboard"]};
