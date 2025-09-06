import os
import firebase_admin
from firebase_admin import credentials, db
from dotenv import load_dotenv

import firebase_admin
import os

def initialize_firebase():
    """Firebase Admin SDKを初期化する。"""
    if not firebase_admin._apps:
        # GOOGLE_APPLICATION_CREDENTIALS環境変数から認証情報を自動的に読み込む
        firebase_admin.initialize_app(options={
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
