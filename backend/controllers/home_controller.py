from models.realtimeDB_access import DBAccess
from flask import Blueprint, request, jsonify
from models.article_reqests import TavilySearchClient
import json
import logging

# ログ設定
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

home_bp = Blueprint('home', __name__)

def home(user_id):
    client = TavilySearchClient()
    
    # user_idが提供されている場合は、そのユーザーのMainHobbyを取得
    if user_id:
        try:
            main_hobby = DBAccess.get_main_hobby(user_id)
            if main_hobby:
                # ユーザーの趣味に基づいた検索クエリ
                search_query = f"{main_hobby} 最新ニュース"
                logger.info(f"ユーザー {user_id} の趣味 '{main_hobby}' に基づく検索を実行")
            else:
                # MainHobbyが見つからない場合はデフォルトクエリ
                search_query = "最新のニュース"
                logger.warning(f"ユーザー {user_id} のMainHobbyが見つからないため、デフォルトクエリを使用")
        except Exception as e:
            logger.error(f"ユーザー {user_id} のMainHobby取得中にエラー: {str(e)}")
            search_query = "最新のニュース"
    else:
        # user_idが提供されていない場合はデフォルトクエリ
        search_query = "最新のニュース"
        logger.info("user_idが提供されていないため、デフォルトクエリを使用")
    
    json_data = {"query": search_query}
    search_results_json_str = client.search(json_data)
    
    # The search function already returns a JSON string, so we need to parse it back to a Python dict
    # before jsonify can convert it to a proper JSON response.
    search_results = json.loads(search_results_json_str)
    
    logger.info(f"検索完了: クエリ='{search_query}', 結果数={len(search_results.get('results', []))}")
    
    return jsonify(search_results)