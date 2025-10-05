
// app/api/delete-request/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Simulate deletion request
    console.log("🗑️ Account deletion requested for:", email);

    // Simulate DB update, log, or email notification (in real app)
    // await db.deletionRequests.insert({ email, requestedAt: new Date() });

    return NextResponse.json({
      success: true,
      message:
        "Your deletion request has been received. Your account and data will be permanently deleted within 7 days.",
    });
  } catch (error) {
    console.error("Error handling deletion request:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
