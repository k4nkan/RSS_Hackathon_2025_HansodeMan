
import os
from dotenv import load_dotenv
import google.generativeai as genai
from json import dumps as json_dumps

# Geminiクライアント（google.generativeai使用）

class GeminiClient:
	def __init__(self):
		# .envファイルからGemini APIキーを取得
		load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env', '.env'))
		self.api_key = os.environ.get('GEMINI_API_KEY')
		if not self.api_key:
			raise ValueError('GEMINI_API_KEYが設定されていません')
		genai.configure(api_key=self.api_key)
		self.model = genai.GenerativeModel(model_name='gemini-1.5-flash')

	def generate(self, json_data, **params):
		# json_dataはdict型を想定
		summary = json_data.get('summary', '')
		attributes = json_data.get('attributes', {})
		age = attributes.get('age', '')
		relationship = attributes.get('relationship', '')
		prompt = (
			'<userinput>で囲う記事の要約内容から以下の指示に従って質問を生成してください。\n'
			'・できるだけ記事に即した質問を生成してください\n'
			'・質問は5つ程度生成してください\n'
			'・<target>で囲う属性の相手に質問することを想定し，年代・口調・付随するトピックを組み込めるよう考慮してください\n'
			'・考慮するバックグラウンド等は出力せず，出力するのは質問内容のみにしてください。\n'
			f'<userinput>{summary}</userinput>'
			f'<target>年齢:{age}, 関係性:{relationship}</target>'
		)
		response = self.model.generate_content(prompt)
		return json_dumps({"questions": response.text}, ensure_ascii=False, indent=2)


# ローカルテスト用
if __name__ == "__main__":
	client = GeminiClient()
	json_data = {
		'summary': 'メジャーリーグベースボール（MLB）の2025年ポストシーズンの日程が発表されました。ワイルドカードラウンドは9月30日、ディビジョンシリーズは10月4日、リーグチャンピオンシップシリーズはアメリカンリーグが10月12日、ナショナルリーグが10月13日、ワールドシリーズは10月24日から開始されます。ワールドシリーズはFOXで放送されます。',
		'attributes': {
			'age': '30代',
			'relationship': '恋人',
		}
	}
	result = client.generate(json_data)
	print(result)
