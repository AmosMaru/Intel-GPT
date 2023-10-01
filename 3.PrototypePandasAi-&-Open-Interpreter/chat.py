import streamlit as st
import pandas as pd
import interpreter
import os
import io
import sys
import streamlit as st 
from pandasai.llm.openai import OpenAI
from dotenv import load_dotenv
import os
import pandas as pd
from pandasai import PandasAI
import matplotlib
matplotlib.use('TkAgg')

load_dotenv()

# openai_api_key = os.getenv("OPENAI_API_KEY")
openai_api_key = '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'
# Define the path to the folder containing images
image_folder_path = 'images'

# Get a list of image file paths in the folder
image_files = [os.path.join(image_folder_path, file) for file in os.listdir(image_folder_path) if file.endswith(('.jpg', '.png', '.jpeg'))]


interpreter.auto_run = True
interpreter.api_key = openai_api_key

def chat_with_csv(df,prompt):
    llm = OpenAI(api_token=openai_api_key)
    pandas_ai = PandasAI(llm)
    result = pandas_ai.run(df, prompt=prompt)
    return result

# Set up the layout
st.title("Intel-GPT")

# Upload the CSV file
uploaded_file = st.file_uploader("Upload a CSV file", type=["csv"])

if uploaded_file is not None:
    # Load the CSV file into a DataFrame
    st.info("CSV Uploaded Successfully")
    df = pd.read_csv(uploaded_file)

    # Display the DataFrame
    st.write("Uploaded DataFrame:")
    st.write(df)

    
    buffer = io.StringIO()
    sys.stdout = buffer
    interpreter.chat(f'Give me a quick rundown of this data{df}')
    sys.stdout = sys.__stdout__
    response_1 = buffer.getvalue()
    response_1_placeholder = st.empty()
    response_1_placeholder.success(response_1)
    

    # buffer = io.StringIO()
    # sys.stdout = buffer
    # interpreter.chat(f'Write 3 short statements of plots which can be used from the dataset  {df}')
    # sys.stdout = sys.__stdout__
    # response_2 = buffer.getvalue()
    # response_2_placeholder = st.empty()
    # response_2_placeholder.success(response_2)

    
    st.info("Chat Below")
    
    input_text = st.text_area("Enter your query")

    if input_text is not None:
        if st.button("Ask AI"):
            st.info("Your Query: "+input_text)
            result = chat_with_csv(df, input_text)
            result_placeholder = st.empty()
            result_placeholder.success(result)

            # Display each image
            for image_file in image_files:
                st.image(image_file, caption=os.path.basename(image_file), use_column_width=True)

            #interpreting the image 
            # buffer = io.StringIO()
            # sys.stdout = buffer
            # interpreter.chat(f'Analyese image and give a short description about it ')
            # sys.stdout = sys.__stdout__
            # response_1 = buffer.getvalue()
            # response_1_placeholder = st.empty()
            # response_1_placeholder.success(response_1)
            



