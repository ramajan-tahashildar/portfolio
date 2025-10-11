# 🖥️ Ramajan Control Center - Portfolio

A Neo Terminal Tech themed portfolio for a Backend & DevOps Engineer, featuring interactive components, real-time metrics, and stunning neon animations.

## 🚀 Features

- **Hero Terminal Section**: Typewriter animation with command-line interface
- **Live Dashboard**: Auto-updating system metrics with neon glow effects
- **About Me**: Professional background with engineering philosophy
- **Tech Stack**: Interactive tech icons with hover tooltips
- **Featured Projects**: Tilt cards with project details and architecture
- **CI/CD Simulation**: Interactive pipeline demo with terminal logs
- **Infrastructure Map**: Visual flowchart of system architecture
- **Contact Section**: Neon-styled contact links
- **Particle Background**: Dynamic network visualization

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (React)
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Particles**: react-tsparticles
- **Icons**: react-icons
- **TypeScript**: For type safety

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Color Palette

- **Background**: `#0E0E10`
- **Primary (Cyan)**: `#00FFFF`
- **Secondary (Indigo)**: `#6C63FF`
- **Text**: `#EDEDED`
- **Subtext**: `#A0A0A0`
- **Success**: `#00FF7F`
- **Error**: `#FF005C`

## 🖼️ Fonts

- **Primary**: Inter / Manrope (body text)
- **Terminal**: JetBrains Mono / Fira Code (code blocks)
- **Header**: Orbitron (headings)

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── globals.css       # Global styles and animations
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page component
├── components/
│   ├── About.tsx
│   ├── CICDSimulation.tsx
│   ├── Contact.tsx
│   ├── Dashboard.tsx
│   ├── Footer.tsx
│   ├── HeroTerminal.tsx
│   ├── InfrastructureMap.tsx
│   ├── Loader.tsx
│   ├── ParticleBackground.tsx
│   ├── Projects.tsx
│   └── TechStack.tsx
├── data/
│   └── portfolio.json    # Portfolio data
├── icons/                # Icon assets
└── public/              # Static files
```

## 🎯 Customization

1. **Update Personal Info**: Edit `data/portfolio.json`
2. **Change Colors**: Modify `tailwind.config.js`
3. **Add Projects**: Add entries to the projects array in `portfolio.json`
4. **Update Contact Links**: Edit the `contact` section in `portfolio.json`

## 🌟 Key Animations

- Typing effect in Hero Terminal
- Auto-updating metrics in Dashboard
- Hover glow effects on cards
- CI/CD pipeline simulation
- Particle network background
- Scroll-triggered fade-ins

## 📝 Build for Production

```bash
npm run build
npm start
```

## 🚀 Deploy

This portfolio can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any static hosting service

## 📄 License

MIT License - Feel free to use this template for your own portfolio!

## 👨‍💻 Author

**Ramajan Tahashildar**
- Backend & DevOps Engineer
- GitHub: [@ramajan](https://github.com/ramajan)
- LinkedIn: [ramajan](https://linkedin.com/in/ramajan)

---

Built with ❤️ using Next.js, TailwindCSS & Framer Motion


# portfolio
