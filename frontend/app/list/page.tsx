import Link from "next/link";
export default function DeckListPage() {
  return (
    <div>
      <h1>会話デッキ一覧</h1>
      <div>
        <Link href="/">
          <button>ホーム</button>
        </Link>
      </div>
    </div>
  );
}
