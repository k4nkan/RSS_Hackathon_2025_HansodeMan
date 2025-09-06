
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

	def generate(self, prompt, **params):
		# paramsは現状使わずpromptのみ
		prompt = '以下の記事の内容を踏まえて，以下の指示に従ってください．記事内容は<userinput>で囲まれている点にも留意してください．\n・記事内容を200文字以内に要約してください．\n・記事内容について，AとBの2人が交互に発言する形式で，合計10ターンの会話例を作成してください．\n・出力形式は，1. 要約文（200文字以内） 2. 会話例（箇条書きで，AとBの2人が交互に発言する形式で，合計10ターン）とし，それぞれ見出しをつけてください．\n・出力は日本語で行ってください．\n・出力は指定した内容のみとし，余計な説明などは含めないでください．\n・内容不足で要約および会話文の生成が困難な時はその旨出力してください．書いてありもしない情報を並べて要約および会話文生成を行うことは絶対に避けてください\n・できるだけ専門用語は使わずだれでも理解できるような要約および会話にしてください\n・記事内容は<userinput>で囲まれた部分です．\n<userinput>' + prompt + '</userinput>'
		response = self.model.generate_content(prompt)
		return response.text


# ローカルテスト用
if __name__ == "__main__":
	client = GeminiClient()
	# prompt = "以下の記事内容を要約した文章と，記事について2人が会話する会話例を出力してください．出力する内容は指定したもののみで，<userinput>で囲む部分のみ記事の内容であることに留意してください．<userinput>"
	prompt = '105 Live Classical Music in the Morning Classical Music in the Afternoon Classical Music in the Evening Classics by Request Classics Live Conversations Film Music Friday Jazz in the Night KPR Jazz KPR Presents Live at Green Lady Lounge Live Studio: Jazz Live Studio: Classical Live Studio: Folk Research Matters Retro Cocktail Hour Trail Mix Up From Dust [...] 105 Live Classical Music in the Morning Classical Music in the Afternoon Classical Music in the Evening Classics by Request Classics Live Conversations Film Music Friday Jazz in the Night KPR Jazz KPR Presents Live at Green Lady Lounge Live Studio: Jazz Live Studio: Classical Live Studio: Folk Research Matters Retro Cocktail Hour Trail Mix Up From Dust [...] Shows 105 Live Classical Music in the Morning Classical Music in the Afternoon Classical Music in the Evening Classics by Request Classics Live Conversations Film Music Friday Jazz in the Night KPR Jazz KPR Presents Live at Green Lady Lounge Live Studio: Jazz Live Studio: Classical Live Studio: Folk Research Matters Retro Cocktail Hour Trail Mix'
	result = client.generate(prompt)
	print(result)
