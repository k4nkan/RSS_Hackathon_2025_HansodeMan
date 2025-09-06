import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      <h1>このサイトについて</h1>
      <div>
        <Link href="/">
          <button>ホーム</button>
        </Link>
      </div>
    </div>
  );
}
