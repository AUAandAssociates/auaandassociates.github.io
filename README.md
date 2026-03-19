# AUA & Associates — GitHub Pages Website

## 🌐 Live Website
**https://auaandassociates.github.io**

---

## 📁 File Structure

```
auaandassociates.github.io/
├── index.html              ← Homepage
├── about.html              ← About Us
├── services.html           ← Services Overview
├── gst-tax.html            ← GST & Tax Filing (SEO page)
├── audit.html              ← Audit & Assurance
├── company-registration.html ← Company Registration
├── financial-advisory.html ← Financial Advisory
├── virtual-cfo.html        ← Virtual CFO Services
├── team.html               ← Our Team
├── contact.html            ← Contact Us
├── style.css               ← All styles
├── main.js                 ← JavaScript (nav, FAQ, form)
└── README.md               ← This file
```

---

## 🚀 How to Publish on GitHub Pages

### Step 1: Create a GitHub Account
1. Go to **https://github.com** 
2. Click **Sign Up** → use your email and create a username exactly: **auaandassociates**

### Step 2: Create the Repository
1. After signing in, click the **+** icon (top right) → **New repository**
2. Repository name: **auaandassociates.github.io** *(exactly this)*
3. Set to **Public**
4. Click **Create repository**

### Step 3: Upload All Files
**Option A — Easy (via browser):**
1. Open your new repository on GitHub
2. Click **uploading an existing file** link
3. Drag & drop ALL files from this folder
4. Click **Commit changes**

**Option B — Via GitHub Desktop (recommended):**
1. Download GitHub Desktop: https://desktop.github.com
2. Clone your repository to your computer
3. Copy all website files into the cloned folder
4. Commit and Push

### Step 4: Enable GitHub Pages
1. Go to your repository → **Settings**
2. Left sidebar → click **Pages**
3. Under "Source" → select **Deploy from a branch**
4. Branch: **main** | Folder: **/ (root)**
5. Click **Save**

### Step 5: Wait & Access
- GitHub will take **2–5 minutes** to deploy
- Your site will be live at: **https://auaandassociates.github.io**
- You'll see a green banner in Pages settings when ready

---

## ✏️ How to Update Content Later

### Updating text:
1. Open the `.html` file in any text editor (Notepad, VS Code)
2. Edit the text between HTML tags
3. Upload the updated file to GitHub (replace existing)

### Updating contact details:
Search for these in the HTML files and replace:
- `+91 6283 153 211` → your phone
- `auaandassociatestricity@gmail.com` → your email
- `GHS 111, A-605, Sector 20, Panchkula` → your address

---

## 📧 Making the Contact Form Work

The contact form currently shows a success message. To actually receive emails:

**Option 1 — Formspree (Free, easy):**
1. Go to https://formspree.io → sign up free
2. Create a new form → get your form ID (e.g. `xyzabcde`)
3. In `contact.html`, find `<form id="contactForm">` 
4. Add: `action="https://formspree.io/f/xyzabcde" method="POST"`
5. Remove the JS form handler or keep both

**Option 2 — Google Forms:**
Embed a Google Form in the contact page iframe.

---

## 🔍 SEO Tips
- Each page is already optimized for Chandigarh Tricity CA keywords
- Submit your sitemap to Google Search Console after going live
- Add your business to Google My Business for local SEO

---

*Built for AUA & Associates — Chartered Accountants, Panchkula, Haryana*
