
import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/askquestion") {
    const res = NextResponse.next();
    res.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/askquestion"],
};
