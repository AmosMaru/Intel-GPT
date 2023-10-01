import streamlit as st
import pandas as pd
from pandasai import PandasAI
from pandasai.llm.openai import OpenAI
from pandasai.llm.starcoder import Starcoder
import os
import matplotlib
from mitosheet.streamlit.v1 import spreadsheet
matplotlib.use('TkAgg')  # or 'Qt5Agg'

import os
import shutil
from datetime import datetime

def copy_folder_contents(source_folder, destination_folder):
    # Check if the source folder exists
    if not os.path.exists(source_folder):
        print(f"The source folder '{source_folder}' does not exist.")
        return

    # Create the destination folder if it doesn't exist
    if not os.path.exists(destination_folder):
        os.makedirs(destination_folder)

    # Get a list of all files and subdirectories in the source folder
    items = os.listdir(source_folder)

    # Get the current time as a timestamp
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")

    # Iterate through each item in the source folder
    for item in items:
        source_path = os.path.join(source_folder, item)
        destination_name = f"{timestamp}_{item}"
        destination_path = os.path.join(destination_folder, destination_name)

        # Check if the item is a file or a directory
        if os.path.isfile(source_path):
            # Copy the file to the destination folder
            shutil.copy2(source_path, destination_path)
        elif os.path.isdir(source_path):
            # Recursively copy the subdirectory
            shutil.copytree(source_path, destination_path)

# Load OpenAI API key
# openai_api_key = os.environ["OPENAI_API_KEY"]
# llm = OpenAI(api_token='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')
llm = Starcoder(api_token="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")
pandas_ai = PandasAI(llm)

# Streamlit App
st.header("Business Analyst and Insight AI(BAIai)")

# File uploader for CSV
# uploaded_file = st.file_uploader("Choose a CSV file", type=["csv"])
# Streamlit App
# st.title("Data Science Salaries")

# Add a sidebar
with st.sidebar:
    st.header("Business Analyst and Insight AI(BAIai)")
    uploaded_file = st.file_uploader("Choose a CSV file", type=["csv"])

# Main content area
if uploaded_file is not None:
    df = pd.read_csv(uploaded_file)
    # st.write(df)
    new_dfs, code = spreadsheet(df)

    # Display the DataFrame

    # Prompt input
    prompts = ["Plot a bar graph to compare the annual tax collected from different cities.",
               "Plot a scatter plot to visualize the correlation between the happiness index and the annual tax collected."]
    # Define the source and destination folders
    source_folder = 'exports/charts'  # Note the use of forward slashes
    destination_folder = 'images'
    for prompt in prompts:
        # st.write(prompt)
        response = pandas_ai.run(df, prompt=prompt)
        # st.write(response)
        # Call the function to copy contents
        copy_folder_contents(source_folder, destination_folder)

    # Title for your app
    st.title("Dashboard")

    # Path to the folder containing images
    folder_path = destination_folder

    # Get a list of image file paths
    image_paths = [os.path.join(folder_path, filename) for filename in os.listdir(folder_path) if
                   filename.endswith(('.jpg', '.png', '.jpeg'))]

    # Display images in three columns
    col1, col2, col3 = st.columns(3)

    for i, image_path in enumerate(image_paths):
        col = col1 if i % 3 == 0 else col2 if i % 3 == 1 else col3
        col.image(image_path, caption='Image', use_column_width=True)

    input_text = st.chat_input("Say something")
    if input_text is not None:
        st.info("Your Query: "+input_text)
