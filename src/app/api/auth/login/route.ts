import { NextResponse } from 'next/server';

import {prisma} from '@/lib/prisma';


export async function POST(req: Request) {
  const { username, password } = await req.json();
 
  console.log(password);

  // ✅ Find matching user
  const user = await prisma.user.findFirst({
    where: { username,  password},
  });

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }


  

  return NextResponse.json({ user: { id: user.id, username: user.username } });
}
