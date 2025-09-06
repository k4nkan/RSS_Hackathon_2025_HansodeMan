import Link from "next/link";
export default function DeckDetailPage() {
  return (
    <div>
      <h1>デッキ詳細画面</h1>
      <div>
        <Link href="/">
          <button>ホーム</button>
        </Link>
      </div>
    </div>
  );
}
