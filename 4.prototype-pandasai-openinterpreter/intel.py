from matplotlib import pyplot as plt
import pandas as pd
import interpreter
import os
import io
import sys
from pandasai.llm.openai import OpenAI
from dotenv import load_dotenv
from pandasai import PandasAI
import base64

load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")
interpreter.auto_run = True
interpreter.api_key = openai_api_key

def chat_with_csv(df, prompt):
    llm = OpenAI(api_token=openai_api_key)
    pandas_ai = PandasAI(llm)
    result = pandas_ai.run(df, prompt=prompt)

    img_data = None  # Initialize img_data as None

    # Check if the result is not None and requires a plot
    if result and 'plot' in result:
        # Create and save the plot
        fig, ax = plt.subplots()
        df.plot(ax=ax)

        # Save it to a BytesIO object
        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)

        # Convert the BytesIO object to a base64 string
        img_data = base64.b64encode(buf.getvalue()).decode()

    print(f"Result: {result}")  # Print the value of result
    print(f"Image Data Length: {len(img_data)}")  # Print the length of img_data

    return result, img_data  # Return both the result and the base64 image data
