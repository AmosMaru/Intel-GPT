import os
from flask import Flask, send_from_directory, request, session, send_file, make_response
from flask_cors import CORS
import mysql.connector
import hashlib
import csv
import pandas as pd
import io
import sys
import interpreter

import os
import pandas as pd
from pandasai.llm.openai import OpenAI
from pandasai import PandasAI


from dotenv import load_dotenv
load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")
interpreter.auto_run = True
interpreter.api_key = openai_api_key
data_df = None

# con = mysql.connector.connect(
#   host="q0h7yf5pynynaq54.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
#   user="gy5j42gpyobqtvwo",
#   password="lkvtu6t4jiwypttw",
#   database="myuskezvmard4yzb"
# )

# con = mysql.connector.connect(
#   host="localhost",
#   user="sammy",
#   password="sammy",
#   database="IntelGPT"
# )
# cur = con.cursor(buffered=True)

cur = None
app = Flask(__name__, static_folder='frontend/dist')
app.secret_key = "secret"
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_SECURE'] = True
CORS(app)
# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route("/test")
def test():
    return {"test":"Hello World"}

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    cur.execute("INSERT INTO users (role, username, name, email, password, phone) VALUES (%s, %s, %s, %s, %s, %s)", (data["role"], data["username"], data["name"], data["email"], hashlib.sha256(data["password"].encode()).hexdigest(), data['phone']))
    cur.commit() #change from con 
    return {"status":"success"}

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    cur.execute("SELECT * FROM users WHERE username = %s AND password = %s", (data["username"], hashlib.sha256(data["password"].encode()).hexdigest()))
    user = cur.fetchone()
    if user:
        session["user"] = user
        print("### Session var :: ",session["user"])
        return {"status":"success","response":{ "role":user[1], "username":user[2], "email":user[4]}}
    else:
        return {"status":"error","response":"Invalid username or password"}

@app.route("/session")
def sessioncheck():
    user = session.get("user")
    if user:
        return {"status":"success","response":{ "role":user[1], "username":user[2], "email":user[4]}}
    else:
        return {"status":"error","response":"Session expired"}

@app.route("/logout")
def logout():
    session.clear()
    return {"status":"success"}
@app.route("/upload", methods=["POST"])
def upload():
    global data_df  # Use the global keyword to access the global variable
    
    file = request.files["file"]
    if file:
        data_df = pd.read_csv(file, sep=",", header=0)
        print(data_df.head())
        return {"status": "success", "response": list(data_df.columns.values)}
    else:
        return {"status": "error", "response": "No file was uploaded"}


# Global variable to store the dataset
data_df = None

def open_interpreter(user_query):
    # Process user message and get response
    # buffer = io.StringIO()
    # sys.stdout = buffer
    # interpreter.chat(f'{user_query}')
    # sys.stdout = sys.__stdout__
    # results = buffer.getvalue()
    return 'Open_interpreter'

def pandai_interpreter(user_query):
    llm = OpenAI(api_token=openai_api_key)
    pandas_ai = PandasAI(llm)
    result = pandas_ai.run(data_df, prompt=user_query)
    return result

def open_interpreter_2(user_query):
    # Process user message and get response
    buffer = io.StringIO()
    sys.stdout = buffer
    interpreter.chat(f'{user_query} use this dataset {data_df}')
    sys.stdout = sys.__stdout__
    results = buffer.getvalue()
    return results

def llava_interpreter(user_query):
    if os.path.isfile("dashboard/image/temp_chart.png"):
        return "llava"
    else:
        return pandai_interpreter(user_query)

def determine_interpreter(user_query):
    if "1" in user_query.lower(): # Pandasai to generete graph 
        return pandai_interpreter
    elif "2" in user_query.lower():# open_interperter to interacte with dataset
        return open_interpreter_2
    elif '3' in user_query.lower():# llava to interprate images
        return llava_interpreter
    else:
        return open_interpreter_2

@app.route("/query", methods=["POST"])
def query():
    global data_df  # Use the global keyword to access the global variable
    data = request.get_json()
    user_query = data["query"]

    if data_df is not None:
        interpreter = determine_interpreter(user_query)
        response = interpreter(user_query)
        return {"status": "success", "response": response}
    else:
        return {"status": "error", "response": "Upload your Dataset.csv first"}
    
@app.route("/getChats", methods=["GET"])
def chats():
    data = request.args
    print(data['id'])
    demo = [
        {
            "query":"User",
            "response":"Intel-GPT"
        }
    ]
    return {"status":"success","response":demo}

@app.route("/getChatz", methods=["GET"])
def qwerty():
    pass

if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=5000),host="0.0.0.0")


    