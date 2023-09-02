import os
from flask import Flask, render_template, request, redirect, url_for
import pandas as pd

from pandasai.llm.starcoder import Starcoder
from pandasai import PandasAI
from pandasai import SmartDataframe
from pandasai.llm import OpenAI

app = Flask(__name__)

# Set your Hugging Face Hub API token as an environment variable.
os.environ["HUGGINGFACEHUB_API_TOKEN"] = "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"

# Initialize the OpenAI Language Model (LLM) with your OpenAI API token.
llm = OpenAI(api_token="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")
# llm = Starcoder(api_token="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")

# Define a route to render the main HTML page.
@app.route('/')
def index():
    return render_template('index.html')

# Define a route to handle file upload and chat interactions.
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return redirect(url_for('index'))

    file = request.files['file']

    if file.filename == '':
        return redirect(url_for('index'))

    if file:
        df = pd.read_csv(file)
        pandas_ai = PandasAI(llm, verbose=True, conversational=True)
        sdf = SmartDataframe(df, config={"llm": llm})

        # Process user's chat input (you can modify this based on your needs).
        user_question = request.form['user_question']
        response = sdf.chat(user_question)

        return render_template('index.html', response=response)

if __name__ == '__main__':
    app.run(debug=True)
