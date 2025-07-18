import { NextResponse } from "next/server";

export async function POST (req) {
    try {
        const { name, email, password } = await req.json();
        console.log(name, email, password);
        return NextResponse.json({
            message: "Registration successful",
            user: { name, email }
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            error: "Registration failed. Please try again."
        }, { status: 500 });
    }
}