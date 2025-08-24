import { ROUTES } from "@/data/routes";
import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
const authPage = [ROUTES.LOGIN, ROUTES.REGISTER];
const publicRoutes = [
  ROUTES.EXPLORE_WITH_PACKAGE,
  ROUTES.TOURISM_PACKAGE,
  ROUTES.CRAFT,
];

// special routes yang punya parameter, perlu dicek dengan startsWith
const dynamicPublicRoutes = [ROUTES.CRAFT, ROUTES.TOURISM_PACKAGE];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[]
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const isPublic =
      publicRoutes.includes(pathname) ||
      dynamicPublicRoutes.some((route) => { 
        return pathname.startsWith(route);
      });

    if (isPublic) {
      return middleware(req, next);
    }
    if (
      requireAuth.includes(pathname) ||
      pathname.startsWith("/web/") ||
      pathname.startsWith("/dashboard/")
    ) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (!token && !authPage.includes(pathname)) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }
    }
    if (token) {
      if (authPage.includes(pathname)) {
        const url = new URL("/web", req.url);
        return NextResponse.redirect(url);
      }
    }

    return middleware(req, next);
  };
}
