import { ROUTES } from "@/data/routes";
import { axiosServer } from "@/lib/axiosServer";
import { AxiosError } from "axios";
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

export default function withAuth(middleware: NextMiddleware) {
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
      pathname.startsWith("/web/") ||
      pathname.startsWith("/dashboard/") ||
      pathname.startsWith("/profile/")
    ) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (!token) {
        if (!authPage.includes(pathname)) {
          const url = new URL("/login", req.url);
          url.searchParams.set("callbackUrl", encodeURI(req.url));
          return NextResponse.redirect(url);
        }
      } else {
        if (!token.name || !token.username || !token.phone) {
          if (
            pathname !== ROUTES.UPDATE_PROFILE ||
            pathname !== ROUTES.PROFILE
          ) {
            const url = new URL(ROUTES.UPDATE_PROFILE, req.url);
            url.searchParams.set("callbackUrl", encodeURI(req.url));
            return NextResponse.redirect(url);
          }
        }
      }
    }
    if (token) {
      if (authPage.includes(pathname)) {
        const url = new URL("/web", req.url);
        return NextResponse.redirect(url);
      }
      if (pathname === ROUTES.CHECKOUT) {
        try {
          await axiosServer.get("/checkouts", {
            headers: { Authorization: `Bearer ${token.accessToken}` },
          });
        } catch (error: unknown) {
          const err = error as AxiosError;
          if (err.response?.status === 404) {
            return NextResponse.redirect(new URL(ROUTES.CRAFT, req.url));
          }
        }
      }
    }

    return middleware(req, next);
  };
}
