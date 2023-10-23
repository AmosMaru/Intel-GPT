import os
from flask import Flask, send_from_directory, request, session, send_file, make_response
from flask_cors import CORS
import mysql.connector
import hashlib
import csv
import pandas as pd

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
    con.commit()
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

@app.route("/query", methods=["POST"])
def query():
    data = request.get_json()
    print(data["query"])
    return {"status":"success","response":"responding..."}

@app.route("/getChats", methods=["GET"])
def chats():
    data = request.args
    print(data['id'])
    demo = [
        {
            "query":"question",
            "response":"answer"
        }
    ]*7
    return {"status":"success","response":demo}

@app.route("/upload", methods=["POST"])
def upload():
    file = request.files["file"]
    if file:
        data_df = pd.read_csv(file, sep=",", header=0)
        # file.save(file.filename)  # Save the file to disk
        print(data_df.head())
        return {"status": "success", "response": list(data_df.columns.values)}
    else:
        return {"status": "error", "response": "No file was uploaded"}

if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=5000),host="0.0.0.0")