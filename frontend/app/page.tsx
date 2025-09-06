import Link from "next/link";
import Image from "next/image";

export default function WelcomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-12">
          <Image
            src="/logo.png"
            alt="app-logo"
            width={64}
            height={64}
            className="mx-auto"
            priority
          />
          <h2 className="font-bold text-2xl text-blue-800">News2talk</h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="w-full sm:w-auto transform transition-transform duration-300 hover:scale-105 bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700"
          >
            サインアップ
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto transform transition-transform duration-300 hover:scale-105 bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-lg border border-blue-600 hover:bg-gray-100"
          >
            ログイン
          </Link>
        </div>
      </div>
    </main>
  );
}
