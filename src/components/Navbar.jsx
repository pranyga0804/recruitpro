import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-black p-4 flex justify-between items-center border-b border-blue-500">
      <Link href="/dashboard">
        <span className="text-neon-blue text-2xl font-bold cursor-pointer">RecruitPro</span>
      </Link>
      <div className="space-x-4">
        <Link href="/dashboard">
          <span className="text-neon-blue hover:underline cursor-pointer">Dashboard</span>
        </Link>
        <Link href="/dashboard/applications">
          <span className="text-neon-blue hover:underline cursor-pointer">Applications</span>
        </Link>
        <Link href="/dashboard/jobs">
          <span className="text-neon-blue hover:underline cursor-pointer">Jobs</span>
        </Link>
      </div>
    </nav>
  );
}
