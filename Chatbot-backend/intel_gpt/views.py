from django.http import HttpResponse
from django.shortcuts import render
from documents.models import Document
from documents.forms import DocumentForm
import io
import sys
import interpreter
import pandas as pd

from dotenv import load_dotenv
load_dotenv()
openai_api_key = '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'
interpreter.auto_run = True
interpreter.api_key = openai_api_key


def home(request):
    documents = Document.objects.all()
    form = DocumentForm()
    chat_history = []  # This will store the chat history

    if request.method == 'POST':
        if request.FILES:
            form = DocumentForm(request.POST, request.FILES)
            if form.is_valid():
                newdoc = Document(document=request.FILES['document'])
                newdoc.save()
        else:
            user_message = request.POST.get("name")
            chat_history.append({"user": True, "message": user_message})

            # Open the DataFrame here
            last_document = documents.last() if documents else None
            df = None
            if last_document:
                with last_document.document.open() as f:
                    df = pd.read_csv(f)

            # Process user message and get response
            # buffer = io.StringIO()
            # sys.stdout = buffer
            # interpreter.chat(f"{user_message} use this dataset as a reference{df} and if there is plots to be graphed create and save the file in imeges folder in json formart") 
            # sys.stdout = sys.__stdout__
            # results = buffer.getvalue()

            results = df.head()

            chat_history.append({"user": False, "message": results})


    # Get the last uploaded document
    last_document = documents.last() if documents else None

    # Read file contents if a document is uploaded
    df = None
    if last_document:
        with last_document.document.open() as f:
            df = pd.read_csv(f)

    return render(request, 'home.html', {'last_document': last_document, 'form': form, 'chat_history': chat_history, 'df': df})
