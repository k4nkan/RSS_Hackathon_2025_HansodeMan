from flask import request, jsonify

def handle_detail():
    data = request.get_json()
    content = data.get('content')

    if not content:
        return jsonify({"error": "Content is required"}), 400

    # ここで受け取った content に対する処理を記述します
    # 例: 処理結果を生成
    processed_result = f"Received content: {content}"

    return processed_result
