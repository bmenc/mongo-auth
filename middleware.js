import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Verificar si el usuario está autenticado
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    
    // Si está autenticado, permitir acceso
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Configurar las rutas que requieren autenticación
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*",
    // Agregar más rutas protegidas aquí
  ],
}; 