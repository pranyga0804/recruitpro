import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  const body = await request.json();
  const { title, description, company, location, salary, userId } = body;

  try {
    const job = await prisma.job.create({
      data: {
        title,
        description,
        company,
        location,
        salary,
        userId,
      },
    });

    return NextResponse.json({ message: "Job posted", job }, { status: 201 });
  } catch (error) {
    console.error("Job post error:", error);
    return NextResponse.json({ message: "Error posting job" }, { status: 500 });
  }
}
