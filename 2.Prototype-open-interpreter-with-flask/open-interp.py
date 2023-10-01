import os
import pandas as pd
import interpreter
import io
import sys
interpreter.api_key = "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"

def chat_with_interpreter(prompt):
    # Create a text buffer
    buffer = io.StringIO()

    # Redirect stdout to the buffer
    sys.stdout = buffer

    # Call the chat function
    interpreter.chat(prompt)

    # Reset stdout to its normal value
    sys.stdout = sys.__stdout__

    # Get the response from the buffer and return it
    response = buffer.getvalue()
    return response

print(chat_with_interpreter('what is this dataset about?data\HappyCountries.csv '))

# interpreter.chat('what is dataset abou')
