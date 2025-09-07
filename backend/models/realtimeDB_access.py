import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, db
import logging

# ログ設定
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Firebase Admin SDKの初期化をモジュールロード時に一度だけ行う
if not firebase_admin._apps:
    # .envファイルを読み込む（backend/.env/.env想定）
    load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env', '.env'))

    # サービスアカウントキーのパスを環境変数から取得
    cred_path = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS')
    if not cred_path:
        raise ValueError("サービスアカウントキーのパスが環境変数に設定されていません。")

    cred = credentials.Certificate(cred_path)

    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://rss-hack-hansodeman-default-rtdb.firebaseio.com/'
    })
    logger.info("Firebase Admin SDK initialized.")


class DBAccess:
    def __init__(self):
        # コンストラクタでは特に何もしないか、インスタンス固有の初期化を行う
        pass

    def add_user(self, data):
        """
        新しいユーザーデータを 'users' パスに一意なIDを生成して追加する。
        :param user_data: 追加するユーザーのデータ(dict)
        :return: 生成された新しいユーザーのキー(ID)
        """
        username = data.get('user')
        password = data.get('pass')
        user_id = username
        ref = db.reference(f'users/{user_id}')
        ref.set({'PASS': password})
        return user_id

    @staticmethod
    def authenticate_user(user_id, password):
        """
        ユーザーIDとパスワードで認証を行う
        :param user_id: ユーザーID (例: "testuser1", "-OZUoGK-gkA14D2v4Pp1")
        :param password: パスワード
        :return: 認証成功時はユーザーデータ、失敗時はNone
        """
        try:
            logger.info(f"認証試行: user_id={user_id}")
            
            # 指定されたユーザーIDのデータを直接取得
            ref = db.reference(f'users/{user_id}')
            user_data = ref.get()
            
            if not user_data:
                logger.warning(f"ユーザーID {user_id} が見つかりません")
                return None
            
            logger.debug(f"ユーザーデータ取得成功: {list(user_data.keys()) if isinstance(user_data, dict) else type(user_data)}")
            
            # パスワード確認 - 複数のパスワードフィールドをチェック
            stored_passwords = []
            
            # 1. 'pass' フィールドをチェック
            if user_data.get('pass'):
                stored_passwords.append(('pass', user_data.get('pass')))
            
            # 2. 'PASS' フィールドをチェック  
            if user_data.get('PASS'):
                stored_passwords.append(('PASS', user_data.get('PASS')))
            
            # パスワード照合
            for field_name, stored_pass in stored_passwords:
                if stored_pass == password:
                    logger.info(f"認証成功: user_id={user_id}, password_field={field_name}")
                    return {
                        "user_id": user_id,
                        "username": user_data.get('user', user_id),
                        "password_field_used": field_name,
                        "main_hobby": user_data.get('MainHobby'),
                        "sub_hobbies": user_data.get('SubHobby', {}),
                        "full_data": user_data
                    }
            
            logger.warning(f"パスワード不一致: user_id={user_id}")
            logger.debug(f"保存されているパスワードフィールド: {[f[0] for f in stored_passwords]}")
            return None
            
        except Exception as e:
            logger.error(f"認証処理中にエラー: {str(e)}")
            return None

    @staticmethod
    def get_all_users():
        """全ユーザーデータを取得（デバッグ用）"""
        try:
            ref = db.reference('users')
            return ref.get()
        except Exception as e:
            logger.error(f"ユーザーデータ取得エラー: {str(e)}")
            return None
        
    @staticmethod
    def get_main_hobby(user_id):
        """
        指定されたユーザーIDのMainHobbyを取得する
        :param user_id: ユーザーID
        :return: MainHobbyの値、存在しない場合はNone
        """
        try:
            logger.info(f"MainHobby取得試行: user_id={user_id}")
            
            # 指定されたユーザーIDのデータを直接取得
            ref = db.reference(f'users/{user_id}')
            user_data = ref.get()
            
            if not user_data:
                logger.warning(f"ユーザーID {user_id} が見つかりません")
                return None
            
            # MainHobbyフィールドを取得
            main_hobby = user_data.get('MainHobby')
            
            if main_hobby is not None:
                logger.info(f"MainHobby取得成功: user_id={user_id}, MainHobby={main_hobby}")
                return main_hobby
            else:
                logger.warning(f"MainHobbyが設定されていません: user_id={user_id}")
                return None
                
        except Exception as e:
            logger.error(f"MainHobby取得中にエラー: user_id={user_id}, error={str(e)}")
            return None
        
    @staticmethod
    def write_hobby(data):
        username = data.get('user')
        mainhobby = data.get('mainhobby')
        subhobby = data.get('subhobby')
        h_data = {
            "mainhobby": mainhobby,
            "subhobby": subhobby
        }

        # 書き込み先の参照
        ref = db.reference(f'users/{username}')
        ref.set(h_data)
        return username