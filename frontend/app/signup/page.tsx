import Link from "next/link";
export default function SignUpPage() {
  return (
    <div>
      <h1>新規登録画面</h1>
      <div>
        <Link href="/">
          <button>ホーム</button>
        </Link>
      </div>
    </div>
  );
}
