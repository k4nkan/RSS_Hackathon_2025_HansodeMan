import os
import requests
from dotenv import load_dotenv
import json


class TavilySearchClient:
	def __init__(self):
		# .envファイルからAPIキーを取得
		load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env', '.env'))
		self.api_key = os.environ.get('TAVILY_API_KEY')
		if not self.api_key:
			raise ValueError('TAVILY_API_KEYが設定されていません')
		self.base_url = 'https://api.tavily.com/search'

	def search(self, query, browsing=True, num_results=5, language='ja', **params):
		headers = {
			'Authorization': f'Bearer {self.api_key}',
			'Content-Type': 'application/json',
		}
		# デフォルト値をparamsで上書き可能
		payload = {
			"query": query,
			"include_answer": "advanced",
			"search_depth": "advanced",
			"topic": "news",
			"max_results": 10,
			"time_range": "month",
			"country": "japan",
			"language": 'ja',
		}
		payload.update(params)
		response = requests.post(self.base_url, json=payload, headers=headers)
		response.raise_for_status()
		data = response.json()
		results = []
		id = 1
		import re
		for item in data.get('results', []):
			title = item.get('title')
			url = item.get('url')
			content = item.get('content', '')
			# 改行・連続空白を1つのスペースにまとめる
			content = re.sub(r'[\s\u3000]+', ' ', content).strip()
			results.append({'id': str(id), 'title': title, 'url': url, 'content': content})
			id += 1
		return json.dumps({"results": results}, ensure_ascii=False, indent=2)



# Flaskハンドラー例
# from flask import Flask, request, jsonify
# app = Flask(__name__)
# tavily_client = TavilySearchClient()
#
# @app.route('/search', methods=['POST'])
# def search_handler():
#     req_json = request.get_json()
#     query = req_json.get('query')
#     params = req_json.get('params', {})
#     result = tavily_client.search(query, **params)
#     return jsonify(result)

# ローカルテスト用サンプル実行
if __name__ == "__main__":
	client = TavilySearchClient()
	print("--- browsing=True で要約 ---")
	results = client.search("ジャズ")
	print(results)
	# import json
	# data = json.loads(results)
	# for item in data["results"]:
	# 	print(item)