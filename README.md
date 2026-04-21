# 🎯 ATS Resume Optimizer

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178c6.svg)](https://www.typescriptlang.org/)

**Beat the bots, land the interview.** A free, privacy-focused tool that analyzes your resume for Applicant Tracking System (ATS) compatibility and provides actionable improvements.

## ✨ Features

- **📊 Instant ATS Scoring (0-100)**: Get comprehensive scoring across 5 categories
  - Formatting & Structure (30 pts)
  - Content Optimization (35 pts)
  - Contact Information (10 pts)
  - Dates & Consistency (10 pts)
  - Readability & Parsing (15 pts)

- **🎯 Keyword Matching**: Compare your resume against job descriptions and identify missing keywords

- **✅ Actionable Recommendations**: Prioritized fixes with projected score improvements

- **🔒 100% Private**: All processing happens in your browser - your resume never leaves your device

- **📱 Responsive Design**: Works on desktop, tablet, and mobile

- **🚀 Lightning Fast**: Results in under 2 seconds

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ats-resume-optimizer.git
cd ats-resume-optimizer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist/` directory.

## 📦 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ats-resume-optimizer)

**Manual Deployment:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/ats-resume-optimizer)

**Manual Deployment:**

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

**Note:** Update `vite.config.ts` with your base path:

```typescript
export default defineConfig({
  base: '/ats-resume-optimizer/', // your repo name
  // ... rest of config
})
```

### Deploy to Cloudflare Pages

1. Push your code to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Connect your repository
4. Build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Deploy!

## 📖 How to Use

1. **Upload Your Resume**
   - Drag and drop or click to upload
   - Supports DOCX, PDF, and TXT formats
   - Max file size: 5MB

2. **Paste Job Description** (Optional)
   - Add a job description for keyword matching
   - Tool works without JD for general ATS analysis

3. **View Your Score**
   - Instant ATS compatibility score (0-100)
   - Detailed breakdown by category
   - Prioritized recommendations with impact

4. **Fix Issues**
   - Follow actionable recommendations
   - See projected score improvements
   - Re-upload to track progress

## 🏗️ Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Document Parsing**:
  - mammoth.js (DOCX)
  - pdf-parse (PDF)
- **Document Generation**: docx (for future ATS-optimized exports)
- **NLP**: compromise.js (keyword extraction)
- **Icons**: Lucide React

## 🔧 Project Structure

```
ats-resume-optimizer/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── FileUpload.tsx
│   │   ├── JobDescriptionInput.tsx
│   │   ├── ScoreDashboard.tsx
│   │   ├── ScoreGauge.tsx
│   │   ├── CategoryBreakdown.tsx
│   │   ├── IssuesList.tsx
│   │   └── Recommendations.tsx
│   ├── lib/                 # Core logic
│   │   ├── parser.ts        # Resume parsing
│   │   ├── scorer.ts        # ATS scoring engine
│   │   └── store.ts         # State management
│   ├── types/               # TypeScript definitions
│   │   └── index.ts
│   ├── styles/              # Global styles
│   │   └── index.css
│   ├── App.tsx              # Main component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🎨 Customization

### Change Color Scheme

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-color',
        600: '#your-color',
        // ... etc
      },
    },
  },
}
```

### Add More Scoring Categories

1. Update types in `src/types/index.ts`
2. Add scoring logic in `src/lib/scorer.ts`
3. Update UI in `src/components/CategoryBreakdown.tsx`

## 🛣️ Roadmap

- [ ] ATS-optimized resume generator (DOCX export)
- [ ] Resume version history tracking
- [ ] A/B testing multiple resume versions
- [ ] Industry-specific scoring profiles
- [ ] Chrome extension for quick checks
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Privacy & Security

- **No data collection**: Your resume is never uploaded to any server
- **Client-side processing**: All analysis happens in your browser
- **No cookies**: No tracking or analytics
- **Open source**: Fully transparent - inspect the code yourself

## ⚠️ Disclaimer

This tool provides guidance on ATS compatibility based on common ATS best practices. While it aims to be accurate, different ATS systems may have varying requirements. Always review your resume with human eyes before submission.

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/ats-resume-optimizer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/ats-resume-optimizer/discussions)

## 🙏 Acknowledgments

- Built with ❤️ for job seekers
- Inspired by the need for better ATS transparency
- Thanks to the open-source community

---

**Star ⭐ this repo if it helped you land an interview!**
