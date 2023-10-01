from flask import Flask, render_template, request
import interpreter
import io
import sys
interpreter.auto_run = True

app = Flask(__name__)
interpreter.api_key = "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"

def chat_with_interpreter(prompt):
    buffer = io.StringIO()
    sys.stdout = buffer
    interpreter.chat(prompt)
    sys.stdout = sys.__stdout__
    response = buffer.getvalue()
    return response

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.form['user_input']
    response = chat_with_interpreter(user_input)
    return {'response': response}

if __name__ == '__main__':
    app.run(debug=True)
