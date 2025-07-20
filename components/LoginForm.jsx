"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  // Si ya está autenticado, redirigir al dashboard
  if (session) {
    router.push("/dashboard");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        // Redirigir al dashboard después del login exitoso
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 bg-white">
        <h1 className="text-xl font-bold my-4">Enter the details</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            type="email" 
            placeholder="Email" 
            value={email}
            disabled={isLoading}
          />
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            type="password" 
            placeholder="Password" 
            value={password}
            disabled={isLoading}
          />
          <button 
            className="bg-green-600 text-white font-bold cursor-pointer p-2 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Login"}
          </button>
          {error && <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>}
          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don't have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
