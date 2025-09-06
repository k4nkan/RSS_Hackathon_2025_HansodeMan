import os
import firebase_admin
from firebase_admin import credentials, db
from dotenv import load_dotenv

def initialize_firebase():
    """Firebase Admin SDKを初期化する。アプリケーション起動時に一度だけ呼び出す。"""
    if not firebase_admin._apps:
        # App Engine環境では、デフォルトの認証情報が自動的に使用される
        if os.getenv('GAE_ENV', '').startswith('standard'):
            firebase_admin.initialize_app(options={
                'databaseURL': 'https://rss-hack-hansodeman-default-rtdb.firebaseio.com/'
            })
        else:
            # ローカル開発環境
            dotenv_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.env')
            load_dotenv(dotenv_path=dotenv_path)

            cred_path = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS')
            if not cred_path:
                raise ValueError("ローカル開発環境では、環境変数 'GOOGLE_APPLICATION_CREDENTIALS' が設定されていません。")
            
            if not os.path.isabs(cred_path):
                cred_path = os.path.join(os.path.dirname(dotenv_path), cred_path)

            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred, {
                'databaseURL': 'https://rss-hack-hansodeman-default-rtdb.firebaseio.com/'
            })

class UserDB:
    @staticmethod
    def add(user_data):
        """
        新しいユーザーデータを 'users' パスに一意なIDを生成して追加する。
        :param user_data: 追加するユーザーのデータ(dict)
        :return: 生成された新しいユーザーのキー(ID)
        """
        ref = db.reference('users')
        new_user_ref = ref.push(user_data)
        print(f"データが新しいIDで書き込まれました: {new_user_ref.key}")
        return new_user_ref.key
