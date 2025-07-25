import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      include: {
        job: true,  // <-- Fetch related Job details
      },
      orderBy: {
        appliedAt: 'desc'
      }
    });

    // If applications is null or undefined, fallback to []
    return NextResponse.json(applications || []);
  } catch (error) {
    console.error("Error fetching applications:", error);
    // Return proper error response structure
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}
