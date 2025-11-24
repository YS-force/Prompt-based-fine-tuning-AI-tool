

import openai

openai.api_key = "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"

job = openai.fine_tuning.jobs.create(
    training_file="file-7xYChWMkSdSZQ8L76WtQDG",
    model="gpt-4o-mini-ft"  
)

print("Fine-tune job created:")
print(job)

