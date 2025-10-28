// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from '@/lib/prisma'  // ✅ Correct - named import

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password || password.length < 6) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 });
    }



    const user = await prisma.user.create({
      data: { username, password },
      select: { id: true, username: true, createdAt: true },
    });

    return NextResponse.json({ message: "User registered", user }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
