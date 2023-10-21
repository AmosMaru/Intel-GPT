import os
import io
import sys
import interpreter



# openai_api_key = os.getenv("")

interpreter.auto_run = True
interpreter.api_key = ""

buffer = io.StringIO()
sys.stdout = buffer

interpreter.chat(f'hi')
# interpreter.chat(f'list 2 graphs that can be plotted from this supermarket_sales - Sheet1.csv to get insight. Save them in a cvs file')
sys.stdout = sys.__stdout__
response_1 = buffer.getvalue()
print(response_1)