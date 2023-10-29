import subprocess
import threading

import os
# Change the working directory to LLaVA

# Clone the repository
subprocess.run(['git', 'clone', 'https://github.com/AmosMaru/LLaVA.git'])
os.chdir('LLaVA')
print(subprocess.run(['pwd']))

#  Install necessary packages
subprocess.run(['pip', 'install', 'ninja'])
# subprocess.run(['pip', 'install', 'flash-attn[cpu]', '--no-build-isolation'])

subprocess.run(['pip', 'install', '-e', '.'])

# Start controller and model worker threads
controller_command = [
    'python3', '-m', 'llava.serve.controller',
    '--host', '0.0.0.0',
    '--port', '10000'
]

model_worker_command = [
    'python3', '-m', 'llava.serve.model_worker',
    '--host', '0.0.0.0',
    '--controller', 'http://localhost:10000',
    '--port', '40000',
    '--worker', 'http://localhost:40000',
    '--model-path', '4bit/llava-v1.5-7b-5GB',
    '--load-8bit'
]

controller_thread = threading.Thread(target=lambda: subprocess.run(controller_command, check=True, shell=False), daemon=True)
model_worker_thread = threading.Thread(target=lambda: subprocess.run(model_worker_command, check=True, shell=False), daemon=True)

controller_thread.start()
model_worker_thread.start()

# Start Gradio web server
web_server_command = [
    'python', '-m', 'llava.serve.gradio_web_server',
    '--controller', 'http://localhost:10000',
    '--model-list-mode', 'reload',
    '--share'
]

subprocess.run(web_server_command, check=True, shell=False)
