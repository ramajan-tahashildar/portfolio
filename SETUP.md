# 🚀 Setup Instructions

## Quick Start

1. **Install Dependencies**
```bash
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

3. **Open Browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customization Guide

### Update Personal Information

Edit `data/portfolio.json`:

```json
{
  "hero": {
    "name": "Your Name",
    "title": "Your Title",
    "tagline": "Your Tagline"
  }
}
```

### Change Colors

Edit `tailwind.config.js`:

```js
colors: {
  background: '#0E0E10',
  primary: '#00FFFF',
  secondary: '#6C63FF',
  // ... customize as needed
}
```

### Add Your Projects

In `data/portfolio.json`, add to the `projects` array:

```json
{
  "id": 4,
  "name": "Your Project",
  "description": "Project description",
  "stack": ["Tech1", "Tech2"],
  "repo": "https://github.com/yourname/repo",
  "live": "https://yourproject.com"
}
```

### Update Contact Links

In `data/portfolio.json`:

```json
{
  "contact": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername",
    "email": "your@email.com",
    "resume": "/your-resume.pdf"
  }
}
```

### Replace Icons

Replace the placeholder icons in the `/icons` folder with your own:
- `cloud-computing.png`
- `software.gif`
- `social.png`
- `broken-monitor.png`
- `launch.png`
- `cloud.png`

## 🎨 Features Checklist

- ✅ Hero Terminal with typing animation
- ✅ Live Dashboard with auto-updating metrics
- ✅ About section with your story
- ✅ Tech Stack with hover tooltips
- ✅ Featured Projects with tilt effects
- ✅ CI/CD Pipeline simulation
- ✅ Infrastructure Map flowchart
- ✅ Contact section with neon effects
- ✅ Footer with uptime counter
- ✅ Particle network background
- ✅ Scroll-triggered animations
- ✅ Custom loader with bouncing dot

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 🌐 Deploy

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

### Deploy to Netlify

```bash
npm run build
```

Drag the `.next` folder to Netlify's deployment interface.

## 🔧 Troubleshooting

**Issue**: Particles not showing
- **Solution**: Particles are loaded client-side. They'll appear after the page hydrates.

**Issue**: Typing animation not working
- **Solution**: Check browser console for errors. Make sure all dependencies are installed.

**Issue**: Build errors
- **Solution**: Run `rm -rf .next node_modules && npm install && npm run build`

## 📦 Dependencies

- `next`: Next.js framework
- `react`: React library
- `framer-motion`: Animation library
- `react-tsparticles`: Particle effects
- `tailwindcss`: CSS framework
- `react-icons`: Icon library

## 🎯 Performance Tips

1. Optimize images: Use WebP format for icons
2. Lazy load components: Already implemented for ParticleBackground
3. Minimize animations on mobile: Consider media queries
4. Enable caching: Configure in `next.config.js`

## 📱 Responsive Design

The portfolio is optimized for desktop (1440px) but includes responsive breakpoints:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## 🛠️ Tech Stack Details

- **Next.js 14**: App Router, Server Components
- **TypeScript**: Type safety
- **TailwindCSS**: Utility-first CSS
- **Framer Motion**: Smooth animations
- **tsparticles**: Background particles

## 📄 License

MIT License - Free to use for personal and commercial projects

## 💡 Tips

- Update the favicon in `/public`
- Add your resume PDF to `/public/resume.pdf`
- Customize the particle configuration in `ParticleBackground.tsx`
- Adjust animation timings in component files
- Add Google Analytics in `layout.tsx`

---

Need help? Check the README.md or create an issue on GitHub!


