# TNESH Portfolio

A premium, cinematic portfolio website for Tevin (aka Nesh) - Developer, Gamer, Creator.

## Features

- **Buttery-Smooth Animations**: Powered by Framer Motion with custom easing curves
- **Custom Cursor**: Interactive cursor with trailing effects and hover states
- **Magnetic Buttons**: Buttons that react to mouse movement
- **Smooth Scroll**: Custom smooth scroll with inertia effects
- **Parallax Effects**: Scroll-triggered animations and parallax
- **Micro-Interactions**: Hover effects, transitions, and delightful details
- **Black & White Aesthetic**: High-contrast, modern, cinematic design
- **Space/Futuristic Theme**: Subtle astronaut and sci-fi undertones

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Framer Motion** - Animation library
- **Tailwind CSS** - Styling
- **React Icons** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── CustomCursor.tsx
│   ├── MagneticButton.tsx
│   └── Navigation.tsx
├── sections/        # Page sections
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   └── Contact.tsx
├── utils/           # Utility functions
│   └── smoothScroll.ts
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Customization

### Update Projects

Edit the `projects` array in `src/sections/Projects.tsx`:

```typescript
const projects: Project[] = [
  {
    title: "Your Project",
    description: "Project description",
    tags: ["React", "TypeScript"],
    link: "https://your-project.com"
  },
  // ...
]
```

### Update Skills

Edit the `skills` array in `src/sections/Skills.tsx`:

```typescript
const skills: Skill[] = [
  { name: 'Your Skill', icon: YourIcon, level: 90 },
  // ...
]
```

### Update Social Links

Edit the `socialLinks` array in `src/sections/Contact.tsx`:

```typescript
const socialLinks = [
  { name: 'GitHub', icon: SiGithub, href: 'https://github.com/yourusername' },
  // ...
]
```

## Performance

- Optimized animations with Framer Motion
- Lazy loading and viewport-based animations
- Efficient re-renders with React best practices
- Smooth 60fps animations

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT

---

Built with ❤️ by TNESH


