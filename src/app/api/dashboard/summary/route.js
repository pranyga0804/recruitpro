import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const jobsCount = await prisma.job.count();
    const applicationsCount = await prisma.application.count();

    return NextResponse.json({ jobsCount, applicationsCount });
  } catch (error) {
    console.error("Dashboard summary error:", error);
    return NextResponse.json({ message: "Failed to fetch summary" }, { status: 500 });
  }
}
