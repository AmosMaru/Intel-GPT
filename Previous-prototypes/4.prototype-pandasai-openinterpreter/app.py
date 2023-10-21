from flask import Flask, render_template, request, redirect, url_for, session
import os
import pandas as pd
from intel import chat_with_csv

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change this to a strong secret key

@app.route('/', methods=['GET', 'POST'])
def index():
    try:
        if request.method == 'POST':
            file = request.files['file']
            if file:
                filename = os.path.join('uploads', file.filename)
                file.save(filename)
                session['uploaded_file'] = filename
                return redirect(url_for('chat'))
    except Exception as e:
        return str(e)  # You might want to return a user-friendly error message here
    return render_template('index.html')

@app.route('/chat', methods=['GET', 'POST'])
def chat():
    try:
        uploaded_file = session.get('uploaded_file')
        if not uploaded_file:
            return redirect(url_for('index'))

<<<<<<< HEAD:Previous-prototypes/4.prototype-pandasai-openinterpreter/app.py
    if request.method == 'POST':
        prompt = request.form['prompt']
        df = pd.read_csv(uploaded_file)
        # Assuming 'chat_with_csv' is defined somewhere
        result, img_str = chat_with_csv(df, prompt)  
        return render_template('index.html', result=result, img_data=img_str)

    return render_template('index.html', result=None)
=======
        if request.method == 'POST':
            prompt = request.form['prompt']
            df = pd.read_csv(uploaded_file)
            result, img_data = chat_with_csv(df, prompt)  # Get both the result and the base64 image
            return render_template('chat.html', result=result, img_data=img_data)  # Pass img_data to the template

    except Exception as e:
        return str(e)  # You might want to return a user-friendly error message here
    return render_template('chat.html', result=None)
>>>>>>> b39a39ed8e98a3f0a5e171e67ff1bb27cf41c20b:4.prototype-pandasai-openinterpreter/flaskapp.py

if __name__ == '__main__':
    app.run(debug=True)