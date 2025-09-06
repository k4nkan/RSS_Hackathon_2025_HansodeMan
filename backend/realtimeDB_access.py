# Firebase Realtime Database への書き込みテンプレート
import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# .envファイルを読み込む（backend/.env/.env想定）
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env', '.env'))


# サービスアカウントキーのパスを環境変数から取得
cred_path = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS')
if not cred_path:
	raise ValueError("サービスアカウントキーのパスが環境変数に設定されていません。")

cred = credentials.Certificate(cred_path)

# Firebase Admin SDKの二重初期化防止
if not firebase_admin._apps:
	firebase_admin.initialize_app(cred, {
		'databaseURL': 'https://rss-hack-hansodeman-default-rtdb.firebaseio.com/'
	})

# 書き込みたいデータ例
data = {
	'PASS': 'TestPassword',
	'MainHobby': 'プログラミング',
    'SubHobby': ['ゲーム', '読書'],
}

# 書き込み先の参照
ref = db.reference('users/testuser1')
ref.set(data)

print("データを書き込みました。")
