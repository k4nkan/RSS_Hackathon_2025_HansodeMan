
import os
from dotenv import load_dotenv
import google.generativeai as genai


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
		return response.text


# ローカルテスト用
if __name__ == "__main__":
	client = GeminiClient()
	json_data = {
		'context': 'nflnbawnbacollege footballnhlnascarmmacollege basketballwomens college basketballworld footballtennisgolfwweboxingall elite wrestlingformula 1moto gpal centralcleveland guardianskansas city royalsdetroit tigersminnesota twinschicago white soxal easttoronto blue jaysbaltimore oriolestampa bay raysboston red soxnew york yankeesal westlos angeles angelshouston astrosoakland athleticsseattle marinerstexas rangersnl centralmilwaukee brewersst louis cardinalschicago cubspittsburgh piratescincinnati [...] MLB released its 2025 postseason schedule Tuesday, and the first Wild Card Round games will be on Sept. 30. The four Division Series then start on Oct. 4, while the American League Championship starts on Oct. 12. From there, the National League Championship Series begins on Oct. 13 ahead of the World Series, which starts on Oct. 24 and could run as late as Nov. 1 if it goes the full seven games. The entire World Series will air on Fox: TOP NEWS [...] Image 1: Video thumbnail 03:11 Featured Video ### Mets Lose 9 of Last 10 Games 😬 Image 2 Image 3: tag-logo 1. MLB MLB Playoffs 2025 Schedule, TV Info, Dates for Entire World Series Bracket Released Scott Polacek Aug 12, 2025 Major League Baseball fans will be watching playoff games in September this season.'
	}
	result = client.generate(json_data)
	print(result)
