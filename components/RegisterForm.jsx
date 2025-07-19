'use client';
import Link from "next/link";
import { useState } from "react";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        
        if (!name || !email || !password) {
            setError("All fields are required");
            return;
        }

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (res.ok) {
                const form = e.target;
                form.reset();
                setSuccess("Registration successful!");
                setName("");
                setEmail("");
                setPassword("");
            } else {
                setError(data.error || "Registration failed. Please try again. [component]");
            }

        } catch (error) {
            console.error("Registration failed:", error);
            setError("Registration failed. Please try again. [component]");
        }
    }

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg  border-t-4 border-green-400 bg-white">
                <h1 className="text-xl font-bold my-4">Enter the details</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input type="text" value={name} onChange={e=> setName(e.target.value)} placeholder="Full Name" />
                    <input type="text" value={email} onChange={e=> setEmail(e.target.value)} placeholder="Email" />
                    <input type="password" value={password} onChange={e=> setPassword(e.target.value)} placeholder="Password" />
                    <button className="bg-green-600 text-white font-bold cursor-pointer p-2">Register</button>
                    {
                        error && <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>
                    }
                    {
                        success && <div className="bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{success}</div>
                    }
                    <Link className="text-sm mt-3 text-right" href={"/"}>Already have an account? <span className="underline">Login</span></Link>
                </form>
            </div>
        </div>
    )
}