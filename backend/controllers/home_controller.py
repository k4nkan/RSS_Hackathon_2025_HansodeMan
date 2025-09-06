from models.realtimeDB_access import DBAccess
from flask import Blueprint, request, jsonify
from models.article_reqests import TavilySearchClient
import json

home_bp = Blueprint('home', __name__)

def home(user_id):
    client = TavilySearchClient()
    # For demonstration, using a hardcoded query. You might want to get this from request.args or request.json
    main_hobby = DBAccess.get_main_hobby(user_id)
    json_data = {"query": "最新のニュース"}
    search_results_json_str = client.search(json_data)
    
    # The search function already returns a JSON string, so we need to parse it back to a Python dict
    # before jsonify can convert it to a proper JSON response.
    search_results = json.loads(search_results_json_str)
    
    return jsonify(search_results)