import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { checkAdminPermission } from "@/lib/api/checkAdminPermission";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get("roomId");

    if (!roomId) {
      return NextResponse.json({ error: "roomId is required" }, { status: 400 });
    }

    const isAdmin = await checkAdminPermission(session.user.email, roomId);
    
    return NextResponse.json({ isAdmin });
  } catch (error) {
    console.error("Error checking admin permission:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}