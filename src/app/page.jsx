// Path: src/app/page.jsx

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold">Welcome to RecruitPro!</h1>
      <p className="mt-4 text-blue-400">Your application has been deployed successfully 🎉</p>
      <div className="mt-6">
        <a
          href="/dashboard"
          className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
        >
          Go to Dashboard
        </a>
      </div>
    </main>
  );
}
