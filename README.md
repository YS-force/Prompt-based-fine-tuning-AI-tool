# 📘 **Prompt-Based Fine-Tuning AI Tool**
### **Structured Product Information Extraction Using LLMs**  
**Author:** *Yuvashree R*  
**Repository:** https://github.com/YS-force/Prompt-based-fine-tuning-AI-tool

---

# 🚀 **1. Project Overview**

This project demonstrates how to build a complete end-to-end AI application that extracts structured product information from raw HTML-like input.  
Instead of expensive OpenAI fine-tuning, this project uses **prompt-based fine-tuning (few-shot learning)** with the **Groq LLaMA-3.3-70B** model — which is fast, free, and effective.

The system takes HTML like:

```
<div class='product'><h2>iPad Air</h2> ... </div>
```

And returns:

```json
{
  "product": "iPad Air",
  "price": 1344,
  "category": "audio",
  "brand": "Apple"
}
```

This fulfills all assignment requirements:
✔ dataset  
✔ fine-tuning (prompt-based)  
✔ JSON output  
✔ full-stack application  
✔ secure API handling  
✔ Groq LLM inference  

---

# 🎯 **2. Goals of the Project**

✔ Understand dataset-driven model conditioning  
✔ Build prompts that mimic fine-tuning  
✔ Integrate LLM with a backend  
✔ Build a frontend to interact with the model  
✔ Produce accurate JSON output  
✔ Deliver a full-stack AI tool  

---

# 🧠 **3. Model Used — Groq LLaMA-3.3-70B**

### Why Groq?

- Free to use  
- Extremely fast inference  
- Ideal for extraction tasks  
- No token billing  
- Simple SDK for Node.js  

### Why Prompt-Based Fine-Tuning?

Instead of paid fine-tuning, we used **example-based prompt conditioning**, also called:

- Few-shot learning  
- Pattern training  
- Instruction tuning  

The model learns the expected pattern from dataset examples.

---

# 🔧 **4. System Architecture**

```
                   ┌───────────────────────────┐
                   │         FRONTEND           │
                   │        (React App)         │
                   └─────────────┬─────────────┘
                                 │  POST Request
                                 ▼
                   ┌───────────────────────────┐
                   │         BACKEND            │
                   │     Node.js + Express      │
                   └─────────────┬─────────────┘
                                 │  API Call
                                 ▼
                   ┌───────────────────────────┐
                   │    Groq LLaMA 3.3 70B      │
                   │ Extracts product details   │
                   └─────────────┬─────────────┘
                                 │
                                 ▼
                   ┌───────────────────────────┐
                   │    FRONTEND JSON Output    │
                   └───────────────────────────┘
```

---

# 🛠 **5. Backend (Node.js + Express)**

The backend:

1. Accepts user input  
2. Adds dataset-style prompt examples  
3. Sends request to Groq LLM  
4. Receives structured JSON  
5. Returns it to the frontend  

Example flow:

```js
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/extract", async (req, res) => {
  const { input } = req.body;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: "Extract product info in JSON." },
      { role: "user", content: input }
    ]
  });

  res.json(JSON.parse(response.choices[0].message.content));
});
```

---

# 💻 **6. Frontend (React)**

Frontend responsibilities:

- Textbox for user input  
- Button to trigger AI extraction  
- Sends data to backend  
- Shows neatly formatted JSON output  
- Handles loading and errors  

User workflow:

1. Paste product HTML  
2. Click **Extract**  
3. View parsed JSON  

---

# 🧪 **7. Dataset & Fine-Tuning Method**

Example entry:

```json
{
  "input": "<div class='product'><h2>iPad Air</h2>...</div>",
  "output": {
    "product": "iPad Air",
    "price": 1344,
    "category": "audio",
    "brand": "Apple"
  }
}
```

The model learns:

- How prices are parsed  
- How brand names are extracted  
- How to structure JSON  
- How to identify product attributes  

This is the essence of **prompt-based fine-tuning**.

---

# 📂 **8. Folder Structure**

```
Prompt-based-fine-tuning-AI-tool/
│── backend/
│   ├── server.js
│   ├── package.json
│   └── .env (ignored)
│
│── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── components/
│   ├── public/
│   └── package.json
│
│── dataset/
│   └── product_extraction_examples.json
│
└── README.md
```

---

# 🔐 **9. Security Features**

You implemented:

✔ `.env` to store API keys  
✔ `.gitignore` to prevent leaks  
✔ Cleaned git history after accidental key commits  
✔ Backend-only key exposure (not frontend)  
✔ Groq key stays secure server-side  

---

# 🌐 **10. Running the Project**

## Backend Setup
```sh
cd backend
npm install
```

Create `.env`:
```
GROQ_API_KEY=your_groq_key
```

Start backend:
```sh
node server.js
```
➡ Runs at http://localhost:4000

---

## Frontend Setup
```sh
cd frontend
npm install
npm start
```
➡ Runs at http://localhost:3000

---

# 🧪 **11. Example Input & Output**

### Input:
```
<div class='product'><h2>iPad Air</h2>
<span class='price'>$1344</span>
<span class='category'>audio</span>
<span class='brand'>Apple</span></div>
```

### Output:
```json
{
  "product": "iPad Air",
  "price": 1344,
  "category": "audio",
  "brand": "Apple"
}
```
