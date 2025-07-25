import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/jobs -> Create New Job
export async function POST(req) {
  try {
    const body = await req.json();
    const { title, company, location, salary, description } = body;

    if (!title || !company || !location || !salary || !description) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const job = await prisma.job.create({
      data: {
        title,
        company,
        location,
        salary,
        description,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error('Error posting job:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// GET /api/jobs -> List Jobs
export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
