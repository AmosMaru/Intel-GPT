import matplotlib
matplotlib.use('Agg')  # Add this line at the beginning
from matplotlib import pyplot as plt
import pandas as pd
import interpreter
import os
import io
import sys
from pandasai.llm.openai import OpenAI
from pandasai import PandasAI
import base64
from dotenv import load_dotenv
load_dotenv()

openai_api_key = os.environ["OPENAI_API_KEY"]
image_folder_path = 'images'
image_files = [os.path.join(image_folder_path, file) for file in os.listdir(image_folder_path) if file.endswith(('.jpg', '.png', '.jpeg'))]

interpreter.auto_run = True
interpreter.api_key = openai_api_key

def chat_with_csv(df,prompt):
    llm = OpenAI(api_token=openai_api_key)
    pandas_ai = PandasAI(llm)
    result = pandas_ai.run(df, prompt=prompt)

    # Add your plot creation code here
    fig, ax = plt.subplots()
    df.plot(ax=ax)

    # Save it to a BytesIO object
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)

    # Convert the BytesIO object to a base64 string
    img_str = base64.b64encode(buf.getvalue()).decode()

    return result, img_str  # Return both the result and the base64 string
