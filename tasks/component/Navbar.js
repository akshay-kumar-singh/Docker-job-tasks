import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Task Manager
        </Link>
        <div className="space-x-4">
          <Link href="/dashboard" className="hover:text-gray-400">
            Dashboard
          </Link>
          <Link href="/tasks" className="hover:text-gray-400">
            Tasks
          </Link>
        </div>
      </div>
    </nav>
  );
}