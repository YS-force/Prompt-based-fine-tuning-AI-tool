import openai
openai.api_key = "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"

models = openai.models.list()

for m in models.data:
    print(m.id)
