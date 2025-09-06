import Link from "next/link";
export default function LoginPage() {
  return (
    <div>
      <h1>ログイン画面</h1>
      <div>
        <Link href="/">
          <button>ホーム</button>
        </Link>
      </div>
    </div>
  );
}
