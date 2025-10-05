import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required." }, { status: 400 });
    }

    console.log(`[Account Deletion Cancelled] For: ${email}`);

    // Simulate updating database to cancel deletion
    // await db.user.update({ where: { email }, data: { deletionRequested: false } });

    return NextResponse.json({
      success: true,
      message: "Your account deletion request has been canceled successfully.",
    });
  } catch (err) {
    console.error("Cancel API Error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
