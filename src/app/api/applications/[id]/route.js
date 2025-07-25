import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.application.delete({
      where: { id: id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json({ error: "Failed to delete application" }, { status: 500 });
  }
}
