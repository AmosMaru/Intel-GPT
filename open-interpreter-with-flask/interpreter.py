import os
import pandas as pd
import interpreter
import io
import sys
interpreter.api_key = "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"

# def chat_with_interpreter(prompt):
#     # Create a text buffer
#     buffer = io.StringIO()

#     # Redirect stdout to the buffer
#     sys.stdout = buffer

#     # Call the chat function
#     interpreter.chat(prompt)

#     # Reset stdout to its normal value
#     sys.stdout = sys.__stdout__

#     # Get the response from the buffer and return it
#     response = buffer.getvalue()
#     return response

# print(chat_with_interpreter('hi'))

interpreter.chat()
