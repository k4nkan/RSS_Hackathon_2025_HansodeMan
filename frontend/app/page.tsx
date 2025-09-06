export default function Home() {
  return (
    <div>
      <div>
        <Link href="/create">
          <button>会話デッキ作成</button>
        </Link>
      </div>
      <div>
        <Link href="/list">
          <button>デッキ一覧</button>
        </Link>
      </div>
      <div>
        <Link href="/detail">
          <button>デッキ詳細</button>
        </Link>
      </div>
      <div>
        <Link href="/login">
          <button>ログイン</button>
        </Link>
      </div>
      <div>
        <Link href="/signup">
          <button>サインアップ</button>
        </Link>
      </div>
    </div>
  );
}
