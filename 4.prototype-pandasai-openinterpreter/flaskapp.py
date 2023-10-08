from flask import Flask, render_template, request, redirect, url_for, session
import os
import pandas as pd
from intel import chat_with_csv  # Import your chat_with_csv function

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change this to a strong secret key

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        file = request.files['file']
        if file:
            filename = os.path.join('uploads', file.filename)
            file.save(filename)
            session['uploaded_file'] = filename
            return redirect(url_for('chat'))
    return render_template('index.html')

    
@app.route('/chat', methods=['GET', 'POST'])
def chat():
    uploaded_file = session.get('uploaded_file')
    if not uploaded_file:
        return redirect(url_for('index'))

    if request.method == 'POST':
        prompt = request.form['prompt']
        df = pd.read_csv(uploaded_file)
        result, img_str = chat_with_csv(df, prompt)  # Get both the result and the base64 string
        return render_template('chat.html', result=result, img_data=img_str)

    return render_template('chat.html', result=None)

if __name__ == '__main__':
    app.run(debug=True)