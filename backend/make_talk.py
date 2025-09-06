
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
		response = self.model.generate_content(prompt)
		return response.text


# ローカルテスト用
if __name__ == "__main__":
	client = GeminiClient()
	prompt = "以下の記事内容を要約した文章と，記事について2人が会話する会話例を出力してください．出力する内容は指定したもののみで，<userinput>で囲む部分のみ記事の内容であることに留意してください．<userinput>"
	prompt += "'Skip to main content 人工知能 / AI * Business * Culture * Gear * Mobility * Science * Opinion * SZ Membership * Series * Video * Newsletter * Magazine * Latest * Archive * Sci-Fi Prototyping Lab # 人工知能 / AI 人工知能（Artificial Intelligence、AI）とは、計算の概念とコンピュータを用いて知能を研究する計算機科学（コンピュータサイエンス）の一分野。言語の理解や推論、問題解決など、これまで人間にしか不可能だった知的行為を機械に代行させるためのアルゴリズムを指す。20世紀の宇宙開発競争に続いて、世界各国が積極的にAI開発を進めており、人工知能という概念は軍事利用を含めて多種多様な産業に応用されている。 その歴史は17世紀にデカルトが提唱した機械論にまでさかのぼるが、本格的な技術研究や実用化が始まったのは20世紀後半。人類はニューラルネットワークやファジィ理論、強化学習といったアプローチから人工知能の実現を試みてきた。21世紀に入り、ディープラーニングとビッグデータの登場により社会に広く浸透。2010年代の後半からは第三次人工知能ブームといわれ、ディープラーニングを用いた画像認識やテキスト解析、音声認識など、AIは日常に溶け込む身近な概念となった。 これまでWIREDでは、AI開発競争における各国の現状をはじめ、民間企業の開発方針や応用例、AIが人間社会におよぼす影響など、人工知能にまつわる様々な情報を取り上げている。 Event ### WIRED Futures Conference 2025 Collaborated with NTT AIと量子コンピューターが融合した未来を体感する2day カンファレンス／9月29日（月）・30日（火）『WIRED』日本版主催 Business ### AIを“眠らせ”、記憶の選別と定着を目指す技術 AIモデルの性能を高めるには、人間の脳のように何を記憶として残すかを判断できるようになることが重要かもしれない。大規模言語モデルはAIエージェントの夢を見るのだろうか？ By Will Knight SZ MEMBERSHIP ### 安すぎるAIツールのツケは誰が払うのか？ AI企業は、利益を度外視してAIツールを人間の労働力より安く提供している。それは長期的に見て社会全体に大きな損失をもたらす可能性がある。 By Paresh Dave Science ### ICU患者の脳波異常をリアルタイムで検知へ。新たなAIモデルの開発進む 米国のクリーブランド・クリニックとPiramidalは、脳波データを活用したAIモデルを開発している。ICU患者の脳波をリアルタイムで監視し、異常を即座に検知することで、医師の迅速な対応を支援することを目指している。 By Emily Mullin Business ### AIに“自らのミス”について説明させても当てにならない理由 AIが失敗したとき「なぜそうしたのか」と説明を求めても、望むような答えは得られない。AIモデルは、そうした質問に応えられるような構造にはなっていないのだ。 By Benj Edwards、Ars Technica SZ MEMBERSHIP ### 話題のレポート「AI 2027」から、分岐する未来を読み解く そもそもAIは人類の終末をもたらすのか、あるいは単なるツールに過ぎないのか？ その両論のシナリオから考える。 By Joshua Rothman Business ### トランプがNVIDIA製チップの対中輸出を許可した理由 By Zoë Schiffer、Will Knight ### 「GPT-5」はあなたを嫌っているわけではない。必要なのは“感情知能”の指標 「GPT-5」について「冷たくなった」との声が相次いでいる。一方、MITの研究者たちは、AIの感情的影響力を測る新たなベンチマークを提案している。ユーザーがAIと健全な関係を築けるようにするのが狙いだ。 By Will Knight By Will Knight By Will Knight By Zoë Schiffer、Will Knight'"
	prompt += "</userinput> 出力形式は，1. 要約文（200文字以内） 2. 会話例（箇条書きで，AとBの2人が交互に発言する形式で，合計6ターン）とし，それぞれ見出しをつけてください．"
	result = client.generate(prompt)
	print(result)
