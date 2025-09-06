import os
import requests
from dotenv import load_dotenv

class TavilySearchClient:
	def __init__(self):
		# .envファイルからAPIキーを取得
		        load_dotenv()
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
			'query': query,
			'browsing': browsing,
			'num_results': num_results,
			'language': language
		}
		payload.update(params)
		response = requests.post(self.base_url, json=payload, headers=headers)
		response.raise_for_status()
		data = response.json()
		# 必要な項目のみ抽出
		results = []
		for item in data.get('results', []):
			title = item.get('title')
			url = item.get('url')
			content = item.get('content')
			results.append({'title': title, 'url': url, 'content': content})
		return results



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
	results = client.search("OpenAI GPT-5 評判")
	for item in results:
		print(item)