# Telugu Quotes AI — తెలుగు కోట్స్

An AI-powered Telugu quote generator built with Next.js + Anthropic Claude API.

---

## 🚀 Deploy to Vercel (Free — 5 minutes)

### Step 1 — Upload to GitHub
1. Go to [github.com](https://github.com) and create a free account if you don't have one
2. Click **"New repository"** → name it `telugu-quotes-app` → click **Create**
3. Upload all the files from this folder into that repository

### Step 2 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click **"Add New Project"**
3. Select your `telugu-quotes-app` repository → click **Import**
4. Before clicking Deploy, go to **"Environment Variables"** and add:
   - Name: `ANTHROPIC_API_KEY`
   - Value: your API key from [console.anthropic.com](https://console.anthropic.com)
5. Click **Deploy** 🎉

Your site will be live at: `https://telugu-quotes-app.vercel.app`

---

## 💻 Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Create your local env file
cp .env.example .env.local
# Then edit .env.local and paste your Anthropic API key

# 3. Start the dev server
npm run dev

# Open http://localhost:3000
```

---

## 📁 Project Structure

```
telugu-quotes-app/
├── pages/
│   ├── _app.js          # App wrapper
│   ├── _document.js     # HTML head, fonts
│   ├── index.js         # Main app UI
│   └── api/
│       └── quote.js     # Secure API route (keeps API key secret)
├── styles/
│   └── globals.css
├── .env.example         # Copy to .env.local and add your key
├── .gitignore
└── package.json
```

---

## 🔑 Getting Your Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up / Log in
3. Go to **API Keys** → click **Create Key**
4. Copy the key and paste it into Vercel's environment variables

---

## ✨ Features

- 6 quote categories: Funny, Life Lessons, Motivation, Love, Friendship, Wisdom
- Quotes in Telugu script with English translation
- Copy & Share buttons
- Mobile-first design — looks great on phones
- API key is 100% secure (never exposed in the browser)
