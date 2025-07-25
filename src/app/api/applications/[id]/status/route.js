import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  const { id } = params;
  const { status } = await request.json();

  try {
    const updatedApp = await prisma.application.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    return NextResponse.json(updatedApp);
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
