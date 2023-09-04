import streamlit as st
import pandas as pd
from dotenv import load_dotenv
from question_insight_generator import generate_questions_from_csv
from pandasai.llm.starcoder import Starcoder
from pandasai import PandasAI

# load_dotenv()

def analyze_with_csv(df, prompts):
    llm = Starcoder(api_token="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")
    pandas_ai = PandasAI(llm)
    results = []
    for prompt in prompts:
        result = pandas_ai.run(df, prompt=prompt)
        results.append(result)
    return results

st.set_page_config(layout='wide')

st.title("Business Analytics Insight AI (BAIai)")

input_csv = st.file_uploader("Upload your document file", type=['csv'])

if input_csv is not None:
    st.info("Document Uploaded Successfully")
    df = pd.read_csv(input_csv)
    st.dataframe(df, use_container_width=True)

st.info("Chat Below")

output_questions = generate_questions_from_csv(input_csv)
if output_questions:
    st.info("Generated Questions:")
    st.write(output_questions)

    if st.button("Ask AI"):
        st.info("Asking AI...")

        # Split the questions into a list
        questions_list = output_questions.split('\n')
        
        # Process each question with Langchain and display the results
        results = analyze_with_csv(df, questions_list)

        for idx, result in enumerate(results):
            st.subheader(f"Question {idx + 1}:")
            
            if isinstance(result, pd.DataFrame):
                st.write("Query Result:")
                st.dataframe(result, use_container_width=True)
            elif isinstance(result, str) and result.startswith("data:image/"):
                st.write("Query Result (Image):")
                st.image(result, use_container_width=True)
            else:
                st.write("Query Result:")
                st.text(result)
