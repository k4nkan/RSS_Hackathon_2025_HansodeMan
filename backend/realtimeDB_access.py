import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db


class DBAccess:
    def __init__(self):
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

    def write_sample(self, userKey, data):
        # 書き込みたいデータ例
        # data = {
        #     'PASS': 'TestPassword',
        #     'MainHobby': 'プログラミング',
        #     'SubHobby': ['ゲーム', '読書'],
        # }

        # 書き込み先の参照
        ref = db.reference(f'users/{userKey}')
        ref.set(data)
        print("データを書き込みました。")


if __name__ == "__main__":
    db_access = DBAccess()
    data = {
        'PASS': 'TestPassword',
        'MainHobby': 'プログラミング',
        'SubHobby': ['ゲーム', '読書'],
    }
    db_access.write_sample('testuser1', data)
