import prisma from '@/lib/prisma';

export async function GET(request, context) {
  const { id } = context.params;

  try {
    const job = await prisma.job.findUnique({
      where: { id: parseInt(id) },
    });

    if (!job) {
      return new Response(JSON.stringify({ error: 'Job not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(job), { status: 200 });
  } catch (error) {
    console.error("Error fetching job:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
