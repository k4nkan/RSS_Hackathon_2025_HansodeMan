from flask import request, jsonify
"""
from models.make_question import GeminiClient
from models.make_summary import GeminiClient
"""

def handle_detail(data):
    content = data.get('content')

    if not content:
        return jsonify({"error": "Content is required"}), 400

    # ここで受け取った content に対する処理を記述します
    # 例: 処理結果を生成
    processed_result = f"Received content: {content}"

    return processed_result
