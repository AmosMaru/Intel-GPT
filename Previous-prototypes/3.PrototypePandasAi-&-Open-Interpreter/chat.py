import streamlit as st
import pandas as pd
import interpreter
import os
import io
import sys
import streamlit as st 
from pandasai.llm.openai import OpenAI
import os
import pandas as pd
from pandasai import PandasAI
# import matplotlib
# matplotlib.use('TkAgg')

from dotenv import load_dotenv
load_dotenv()

openai_api_key = ''



# Define the path to the image folder
image_folder_path = os.getcwd()  # This will get the current working directory

# Get a list of image files
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
    interpreter.chat(f'What is this dataset about{df}')
    sys.stdout = sys.__stdout__
    response_1 = buffer.getvalue()
    response_1_placeholder = st.empty()
    response_1_placeholder.success(response_1)
    


    st.info("Chat Below")               
    input_text = st.text_area("Enter your query")
    if input_text is not None:
        if st.button("Ask AI"):
            st.info("Your Query: "+input_text)
            result = chat_with_csv(df, input_text)
            result_placeholder = st.empty()
            result_placeholder.success(result)
            
        # Display the images in two columns
        col1, col2 = st.columns(2)

        for i, image_path in enumerate(image_files):
            with open(image_path, "rb") as f:
                image_stream = f.read()
                if i % 2 == 0:
                    with col1:
                        st.image(image_stream, caption='Image', use_column_width=True)
                else:
                    with col2:
                        st.image(image_stream, caption='Image', use_column_width=True)



