from flask import Flask, render_template, request,jsonify
import pandas as pd
import interpreter
import os
import io
import sys

from dotenv import load_dotenv
load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")
openai_api_key = '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'
interpreter.auto_run = True
interpreter.api_key = openai_api_key

app = Flask(__name__)
# Set the upload folder
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
   
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    message = request.form["message"]
    if file:
        # Save the uploaded file
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        # Convert to DataFrame
        df = pd.read_csv(file_path)  # Assuming it's a CSV file
        buffer = io.StringIO()
        sys.stdout = buffer
        print(message)
        interpreter.chat(f'Hi')
        sys.stdout = sys.__stdout__
        response_1 = buffer.getvalue()

        response_data = {
            'message': response_1,
            'df_html': df.to_html()
            
        }

        return jsonify(response_data)
    return "No file uploaded"

# @app.route('/message', methods=['POST'])
# def message():

# @app.route('/upload', methods=['POST'])
# def ask_ai():
#     message = request.form.get('message')

#     # Process the message using your AI interpreter
#     response = ('Success')  # Assuming you have an interpreter function

#     return response

if __name__ == '__main__':
    app.run(debug=True)
