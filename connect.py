import os

# Define folder structure
dirs = [
    "gsr-backend/app",
    "gsr-backend/logs",
    "gsr-backend/data/raw",
    "gsr-backend/data/processed",
    "gsr-backend/models",
]

files = {
    "gsr-backend/app/main.py": "",
    "gsr-backend/app/serial_reader.py": "",
    "gsr-backend/app/model_runner.py": "",
    "gsr-backend/app/preprocess.py": "",
    "gsr-backend/app/storage.py": "",
    "gsr-backend/app/config.py": "",
    "gsr-backend/models/gsr_model.pkl": "",
    "gsr-backend/requirements.txt": "",
    "gsr-backend/.env": "",
}

# Create directories
for d in dirs:
    os.makedirs(d, exist_ok=True)

# Create files
for filepath, content in files.items():
    with open(filepath, "w") as f:
        f.write(content)

print("Folder structure created successfully!")
