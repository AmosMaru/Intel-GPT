import os
import streamlit as st
# Define the path to the image folder
image_folder_path = os.getcwd()  # This will get the current working directory

# Get a list of image files
image_files = [os.path.join(image_folder_path, file) for file in os.listdir(image_folder_path) if file.endswith(('.jpg', '.png', '.jpeg'))]

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


# from pandasai.llm.openai import OpenAI
# import pandas as pd
# from pandasai import PandasAI
# import streamlit as st

# def chat_with_csv(df,prompt):
#     llm = OpenAI(api_token=openai_api_key)
#     pandas_ai = PandasAI(llm)
#     result = pandas_ai.run(df, prompt=prompt)
#     return result

# with st.sidebar:
#     openai_api_key = st.text_input("OpenAI API Key", key="chatbot_api_key", type="password")

# st.title("💬 Chatbot")
# # Upload the CSV file
# uploaded_file = st.file_uploader("Upload a CSV file", type=["csv"])

# if uploaded_file is not None:
#     # Load the CSV file into a DataFrame
#     st.info("CSV Uploaded Successfully")
#     df = pd.read_csv(uploaded_file)

#     # Display the DataFrame
#     st.write("Uploaded DataFrame:")
#     st.write(df)

# if "messages" not in st.session_state:
#     st.session_state["messages"] = [{"role": "assistant", "content": "How can I help you?"}]

# for msg in st.session_state.messages:
#     st.chat_message(msg["role"]).write(msg["content"])

# if prompt := st.chat_input():
#     msg = chat_with_csv(df, prompt)
#     st.chat_message("user").write(prompt)
#     st.session_state.messages.append(msg)
#     st.chat_message("assistant").write(msg)

# from pandasai.llm.openai import OpenAI
# import pandas as pd
# from pandasai import PandasAI
# import streamlit as st
# from io import BytesIO
# from PIL import Image
# import os

# def chat_with_data(data, prompt):
#     llm = OpenAI(api_token=openai_api_key)
#     pandas_ai = PandasAI(llm)
#     result = pandas_ai.run(data, prompt=prompt)
#     return result

# # Create a directory to save images if it doesn't exist
# os.makedirs("images", exist_ok=True)

# with st.sidebar:
#     openai_api_key = st.text_input("OpenAI API Key", key="chatbot_api_key", type="password")

# st.title("💬 Chatbot")

# uploaded_file = st.file_uploader("Upload a file", type=["csv", "jpg", "png", "txt"])

# if uploaded_file is not None:
#     st.info("File Uploaded Successfully")
#     if uploaded_file.type == "image/jpeg" or uploaded_file.type == "image/png":
#         image = Image.open(uploaded_file)
#         st.image(image, caption='Uploaded Image.', use_column_width=True)
        
#         # Save the uploaded image to the "images" directory
#         image.save(os.path.join("images", uploaded_file.name))
#         data = image
#     elif uploaded_file.type == "text/plain":
#         text = uploaded_file.read()
#         st.text(text)
#         data = text
#     else:
#         df = pd.read_csv(uploaded_file)
#         st.write("Uploaded DataFrame:")
#         st.write(df)
#         data = df

# if "messages" not in st.session_state:
#     st.session_state["messages"] = [{"role": "assistant", "content": "How can I help you?"}]

# for msg in st.session_state.messages:
#     if isinstance(msg, dict):
#         st.chat_message(msg["role"]).write(msg["content"])
#     elif isinstance(msg, Image.Image):
#         st.image(msg, caption='Uploaded Image.', use_column_width=True)

# if prompt := st.chat_input():
#     msg = chat_with_data(data, prompt)
#     st.chat_message("user").write(prompt)

#     if isinstance(msg, str):
#         st.session_state.messages.append({"role": "assistant", "content": msg})
#     elif isinstance(msg, Image.Image):
#         st.session_state.messages.append(msg)
