# 🚀 Getting Started with ATS Resume Optimizer

**You're 3 minutes away from running your ATS Resume Optimizer!**

## ⚡ Quick Start (Copy & Paste These Commands)

```bash
# Navigate to project directory
cd ats-resume-optimizer

# Install dependencies (this will take 1-2 minutes)
npm install

# Start the development server
npm run dev
```

**🎉 Done!** Open your browser to [http://localhost:5173](http://localhost:5173)

---

## 📱 What You'll See

1. **Upload Section** - Drag & drop a resume (DOCX, PDF, or TXT)
2. **Job Description Input** - Paste a job posting (optional but recommended)
3. **Instant ATS Score** - See your 0-100 compatibility score
4. **Detailed Breakdown** - 5 categories with specific issues
5. **Recommendations** - Top fixes ranked by impact

---

## 🧪 Test It Out

### Sample Resume to Upload

Don't have a resume handy? Create a test file:

**Create `test-resume.txt`:**
```text
John Doe
john.doe@email.com | (555) 123-4567 | New York, NY

EXPERIENCE
Software Engineer at Tech Corp
January 2020 - Present
- Developed web applications using React and Node.js
- Improved page load time by 40%
- Led team of 3 developers on major project

Junior Developer at StartupCo
June 2018 - December 2019
- Built REST APIs with Python and Flask
- Collaborated with design team on UI improvements

EDUCATION
Bachelor of Science in Computer Science
State University, 2018

SKILLS
JavaScript, Python, React, Node.js, SQL, Git
```

### Sample Job Description to Paste

```text
Software Engineer - Full Stack

We're looking for a talented Software Engineer to join our team.

Required Skills:
- JavaScript, React, Node.js
- Python
- SQL databases
- Git version control
- 2+ years experience

Preferred:
- AWS or cloud experience
- Team leadership
- Performance optimization
```

### Expected Results

With this example, you should see:
- **Score**: ~75-80/100
- **Keyword Match**: ~85% (missing AWS)
- **Issues Found**: 2-3 minor issues
- **Recommendations**: Add AWS keyword, improve formatting

---

## 🎯 Next Steps

### 1. Try Your Real Resume (5 min)

- Upload your actual resume
- Paste a real job description you're applying to
- Review the ATS score and recommendations
- Make improvements based on feedback

### 2. Understand the Scoring (10 min)

Read about each category:

**Formatting (30 pts):**
- Single-column layout
- Standard fonts (Arial, Calibri)
- No images or graphics
- No tables or complex formatting

**Content (35 pts):**
- Keyword matching with job description
- Strong action verbs
- Quantifiable metrics
- Proper length (1-2 pages)

**Contact Info (10 pts):**
- Phone number
- Professional email
- Location
- LinkedIn (optional)

**Dates (10 pts):**
- Consistent formatting
- No unexplained gaps
- Chronological order

**Readability (15 pts):**
- Clean text extraction
- Logical section flow
- No special characters

### 3. Customize & Deploy (30 min - 2 hours)

**Quick Customization:**
- Change colors in `tailwind.config.js`
- Update site title in `index.html`
- Add your GitHub link in `Header.tsx`

**Deploy to Production:**
- Follow [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- Recommended: Vercel (takes 2 minutes!)
- Get a live URL to share

---

## 💡 Pro Tips

### For Best Results

1. **Use DOCX format** - Most ATS-friendly
2. **Include job description** - Better keyword matching
3. **Test multiple versions** - Try different formats
4. **Check on mobile** - Responsive design works everywhere

### Common Questions

**Q: Why is my score low?**
A: Check the Issues tab - it lists everything wrong with specific fixes.

**Q: Can I use this for multiple resumes?**
A: Yes! Just upload different files. Nothing is saved.

**Q: Does this work offline?**
A: After initial load, yes! It's a PWA (Progressive Web App).

**Q: Is my data safe?**
A: 100%! Everything processes in your browser. Nothing is uploaded.

---

## 🛠️ Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

---

## 📂 Project Structure Quick Reference

```
src/
├── components/       # React UI components
│   ├── FileUpload.tsx
│   ├── ScoreDashboard.tsx
│   └── ...
├── lib/             # Core logic
│   ├── parser.ts    # Resume parsing
│   ├── scorer.ts    # ATS scoring
│   └── store.ts     # State management
├── types/           # TypeScript definitions
├── styles/          # CSS
└── App.tsx          # Main app
```

**Want to modify something?**
- **Change UI**: Edit files in `src/components/`
- **Change scoring logic**: Edit `src/lib/scorer.ts`
- **Add new features**: Start in `src/App.tsx`

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Dependencies Won't Install

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Install TypeScript dependencies
npm install -D typescript @types/react @types/react-dom

# Check for errors
npx tsc --noEmit
```

### Build Fails

```bash
# Try clean build
rm -rf dist
npm run build
```

---

## 🎓 Learn More

### Technologies Used

- **React**: [reactjs.org](https://reactjs.org)
- **TypeScript**: [typescriptlang.org](https://www.typescriptlang.org)
- **Vite**: [vitejs.dev](https://vitejs.dev)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **Zustand**: [github.com/pmndrs/zustand](https://github.com/pmndrs/zustand)

### Extend This Project

**Ideas to try:**
- Add export to PDF feature
- Create resume templates
- Add industry-specific scoring
- Build Chrome extension
- Add resume version tracking

---

## ✅ Quick Checklist

Before you start coding:

- [x] Dependencies installed (`npm install`)
- [x] Dev server running (`npm run dev`)
- [x] Tested with sample resume
- [x] Understood scoring categories
- [ ] Read [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- [ ] Customized for your needs
- [ ] Deployed to production!

---

## 🎉 You're All Set!

Your ATS Resume Optimizer is running and ready to help job seekers!

**Stuck?** Check:
- [README.md](./README.md) - Full documentation
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Publishing guide
- GitHub Issues - Community help

**Working?** Share your success:
- Star ⭐ this repo
- Tweet about it
- Add to your portfolio

---

**Happy coding! 🚀**
