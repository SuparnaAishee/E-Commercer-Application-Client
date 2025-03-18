// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import { getCurrentUser } from "./services/Auth";

// const authRoutes = ["/login", "/register"];

// const roleBasedRoutes = {
//   USER: [/^\/account/],
//   ADMIN: [/^\/admin/],
//   VENDOR: [/^\/vendor/],
// };
// type TRole = keyof typeof roleBasedRoutes;
// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const user = await getCurrentUser();
//   if (!user) {
//     if (authRoutes.includes(pathname)) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(
//         new URL(`/login?redirect=${pathname}`, request.url)
//       );
//     }
//   }

//   if (user?.role && roleBasedRoutes[user.role as TRole]) {
//     const routes = roleBasedRoutes[user.role as TRole];
//     if (routes.some((route) => pathname.match(route))) {
//       return NextResponse.next();
//     }
//   }
//   return NextResponse.redirect(new URL("/", request.url));
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/account", "/account/:page*", "/admin", "/login", "/register"],
// };
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/Auth";

// Define routes
const authRoutes = new Set(["/login", "/register"]);
const publicRoutes = new Set([
  "/",
  "/products",
  "/flash-deals",
  "/recent-products",
  "/support",
  "/about",
  "/forgot-password",
  "/reset-password",
]);

const roleBasedRoutes = {
  USER: [/^\/account/],
  ADMIN: [/^\/admin/],
  VENDOR: [/^\/vendor/],
} as const;

type TRole = keyof typeof roleBasedRoutes;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for dynamic product/shop routes
  if (
    /^\/products\/[^/]+$/.test(pathname) ||
    /^\/shops\/[^/]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Allow public routes without authentication
  if (publicRoutes.has(pathname)) {
    return NextResponse.next();
  }

  try {
    const user = await getCurrentUser();

    if (!user) {
      // Allow authentication routes if the user is not logged in
      if (authRoutes.has(pathname)) {
        return NextResponse.next();
      }
      // Redirect to login with return path
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }

    // Prevent logged-in users from accessing auth pages
    if (authRoutes.has(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Check role-based access
    const userRole = user.role as TRole;
    if (roleBasedRoutes[userRole]?.some((route) => route.test(pathname))) {
      return NextResponse.next();
    }

    // Redirect unauthorized users to home
    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

// Middleware matcher
export const config = {
  matcher: [
    "/account/:path*",
    "/admin/:path*",
    "/vendor/:path*",
    "/login",
    "/register",
    "/((?!api|_next/static|_next/image|favicon.ico|products/|shops/).+)",
  ],
};

