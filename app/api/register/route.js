import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST (req) {
    console.log("Registration request received");
    
    try {
        const { name, email, password } = await req.json();
        
        // Validación básica
        if (!name || !email || !password) {
            console.log("Missing required fields");
            return NextResponse.json({
                error: "All fields are required"
            }, { status: 400 });
        }

        console.log("Connecting to MongoDB...");
        await connectMongoDB();
        
        console.log("Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);
        
        console.log("Creating user...");
        let item = await User.create({ name, email, password: hashedPassword });
        console.log("User created successfully:", { name, email });

        return NextResponse.json({
            message: "Registration successful",
            user: { name, email }
        }, { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);
        
        // Manejar errores específicos de MongoDB
        if (error.code === 11000) {
            return NextResponse.json({
                error: "User with this email or name already exists"
            }, { status: 409 });
        }
        
        return NextResponse.json({
            error: "Registration failed. Please try again. [route]"
        }, { status: 500 });
    }
}