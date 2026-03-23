# Reiki Mastery Journey
### Doctor of Reiki Therapy Programme
**Founded and Taught by Jezrah Starflower Tracy**  
*Starflower Healing Arts Press*

---

## 🌐 Deploy Your School Live — Free in Under 10 Minutes

This is a complete React web application. Follow the steps below to publish it as a live public website at no cost.

---

## OPTION A — Netlify (Recommended — Easiest, No Account Needed to Start)

### Step 1: Download and unzip this project folder to your computer

### Step 2: Go to https://www.netlify.com and click "Sign Up Free"
- Sign up with your email or GitHub account (no credit card required)

### Step 3: From your Netlify dashboard, click "Add new site" → "Deploy manually"

### Step 4: Drag the entire `reiki-school` folder onto the Netlify deploy area

### Step 5: Netlify will ask you to set a build command:
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### Step 6: Click Deploy — your site will be live in about 60 seconds!

### Step 7 (Optional): Get a custom domain
- Netlify gives you a free URL like `reiki-mastery-journey.netlify.app`
- To use your own domain (e.g. `reikimastery.com`), go to Site Settings → Domain Management

---

## OPTION B — Vercel (Also Free, Excellent Performance)

### Step 1: Go to https://vercel.com and click "Sign Up Free"
- Sign up with GitHub, GitLab, or email (no credit card required)

### Step 2: Click "Add New Project" → "Import Git Repository"
- If you have GitHub: push this folder to a GitHub repo first (see below)
- OR use Vercel CLI: `npm install -g vercel` then run `vercel` in this folder

### Step 3: Vercel auto-detects Vite. Confirm settings:
- **Framework:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`

### Step 4: Click Deploy — live in under 2 minutes!

---

## OPTION C — GitHub + Netlify (Best for Ongoing Updates)

This method lets you update your site by simply pushing changes to GitHub.

### Step 1: Create a free GitHub account at https://github.com

### Step 2: Create a new repository called `reiki-mastery-journey`

### Step 3: Upload this entire project folder to your new repository

### Step 4: Go to https://netlify.com → "Add new site" → "Import from Git"

### Step 5: Select your GitHub repository → Deploy!

**Every time you update your App.jsx and push to GitHub, your live site automatically rebuilds.**

---

## 🛠 Running Locally (for testing before publishing)

You need Node.js installed (free at https://nodejs.org — download the LTS version).

Open a terminal/command prompt in this folder and run:

```bash
npm install
npm run dev
```

Your school will open at http://localhost:5173

To build for production:
```bash
npm run build
```

---

## 📁 Project Structure

```
reiki-school/
├── index.html          — The HTML entry point
├── package.json        — Project dependencies
├── vite.config.js      — Build configuration
├── netlify.toml        — Netlify deployment config
├── vercel.json         — Vercel deployment config
├── .gitignore
└── src/
    ├── main.jsx        — React entry point
    └── App.jsx         — Your complete Reiki school (all lessons, auth, UI)
```

---

## 🎨 Customizing Your Site

All content, lessons, and styling live in **src/App.jsx**.

To add more lessons: find the `const LESSONS = {` section and add new lesson objects.

To change colors: update the `color:` values in the `LEVELS` array.

To update the school name or instructor bio: search for "Jezrah Starflower Tracy" in App.jsx.

---

## 📧 Getting Your Custom Domain

Free domain options:
- `.netlify.app` subdomain — free forever with Netlify
- `.vercel.app` subdomain — free forever with Vercel
- Purchase a `.com` domain at Namecheap (~$10/year) and connect to Netlify/Vercel

---

*© Jezrah Starflower Tracy · Starflower Healing Arts Press · Doctor of Reiki Therapy Programme*
