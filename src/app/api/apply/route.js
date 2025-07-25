import { writeFile } from 'fs/promises';
import path from 'path';
import prisma from '@/lib/prisma';

export async function POST(req) {
  const formData = await req.formData();

  const name = formData.get('name');
  const email = formData.get('email');
  const jobId = parseInt(formData.get('jobId'));

  const file = formData.get('resume');
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), 'public/uploads', fileName);

  await writeFile(filePath, buffer);

  await prisma.application.create({
    data: {
      name,
      email,
      resumeURL: `/uploads/${fileName}`,
      jobId: jobId,
    },
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
