# ResumeAI: Premium Neural Resume Engineering

The industry-standard AI resume system. Bypassing modern ATS filters through structural precision and high-impact semantic optimization.

## 🚀 Features

- **Neural Builder**: Real-time, split-screen editing with live-sync visualization.
- **ATS-Optimized Templates**: Precision-engineered layouts (Modern, Creative, Tech) designed to pass through any recruiter filter.
- **AI Enhancement**: Integrated with Google Gemini for professional summary and experience refinement.
- **Quick Access**: One-click demo mode for immediate entry.
- **PDF Export**: High-fidelity PDF generation matching the visual design.

## 🚀 Deployment (Vercel)

To get a professional deployment link like `https://ai-resume-builder-rakshitharaks570.vercel.app/`:

1.  **Push to GitHub**: Initialize a git repository and push your code to GitHub.
    ```bash
    git init
    git add .
    git commit -m "feat: Neural Resume Engine Initialized"
    git remote add origin YOUR_GITHUB_REPO_URL
    git push -u origin main
    ```
2.  **Import to Vercel**: 
    - Go to [Vercel](https://vercel.com).
    - Import your new GitHub repository.
    - Add your `GOOGLE_API_KEY` and `NEXTAUTH_SECRET` to the environment variables.
3.  **Launch**: Vercel will provide you with a unique, professional deployment URL.

## 🔑 Universal Node Access
The system is currently in **Open Access Mode**. You can log in using **any email address**. This allows for seamless collaborative testing and universal access to the neural resume engine.

## 🛠️ Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS 4.0, Framer Motion
- **AI**: Google Generative AI (Gemini Flash)
- **Auth**: NextAuth.js
- **PDF**: jsPDF + html2canvas

## 📦 Getting Started

1. **Clone & Install**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   Create a `.env.local` file with:
   - `GOOGLE_API_KEY`: Your Gemini API Key
   - `NEXTAUTH_SECRET`: A secure random string
   - `NEXTAUTH_URL`: `http://localhost:3000`

3. **Run Dev**:
   ```bash
   npm run dev
   ```

4. **Access**:
   Navigate to `http://localhost:3000/login` and use the **Universal Quick Access** button.

## 🎨 Design Philosophy

ResumeAI is built on the **Glassmorphism** principle, featuring:
- Deep slate backgrounds (#050505)
- Indigo neon accents
- Subtle neural grid patterns
- Micro-animations for feedback

---
&copy; 2026 VAULT ARCHIVE | Neural Intelligence Active
