mport os
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
		context = json_data.get('context', '')
		prompt = (
			'<userinput>で囲う記事内容を以下の指示に従って要約してください。\n'
			'・記事内容の言語にかかわらず要約の出力は日本語で行ってください。\n'
			'・内容が不足している場合は「記事の内容が不足しているため要約を表示できません」と出力するようにしてください（どうしてもの時に限ります）\n'
			'・出力は要約文のみで他の文が入らないようにしてください\n'
			'・なるべく専門用語などを使わず誰が読んでも理解できるような要約を生成してください\n'
			f'<userinput>{context}</userinput>'
		)
		response = self.model.generate_content(prompt)
		return json_dumps({"summary": response.text}, ensure_ascii=False, indent=2)
