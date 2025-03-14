# Professional Portfolio

![GitHub stars](https://img.shields.io/github/stars/Hawhaz/professional-portfolio?style=social)
![GitHub forks](https://img.shields.io/github/forks/Hawhaz/professional-portfolio?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/Hawhaz/professional-portfolio?style=social)
![GitHub license](https://img.shields.io/github/license/Hawhaz/professional-portfolio)
![GitHub last commit](https://img.shields.io/github/last-commit/Hawhaz/professional-portfolio)

<div align="center">
  <img src="https://github.com/shaqdeff/Portfolio-Template/assets/92020713/eed76a82-e59d-440b-a04c-a2dc00a508b7" alt="Portfolio Demo" width="100%">
  <br>
  <p align="center">
    <a href="#live-demo">View Demo</a>
    ·
    <a href="https://github.com/Hawhaz/professional-portfolio/issues">Report Bug</a>
    ·
    <a href="https://github.com/Hawhaz/professional-portfolio/issues">Request Feature</a>
  </p>
</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Performance Optimizations](#-performance-optimizations)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Production Build](#production-build)
- [Project Structure](#-project-structure)
- [Customization Guide](#-customization-guide)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)
- [Contact](#-contact)

## 🚀 Overview

A modern, interactive portfolio website showcasing professional skills, projects, and experience. This portfolio is built with cutting-edge technologies to deliver a seamless user experience with stunning visuals, smooth animations, and responsive design.

<div align="center">
  <img src="https://github.com/shaqdeff/Portfolio-Template/assets/92020713/e41ed31c-50e5-40d3-a74f-9c0eb053fe7f" alt="Mobile View 1" width="24%">
  <img src="https://github.com/shaqdeff/Portfolio-Template/assets/92020713/e8c23aa7-ac27-48fc-bf66-50ab00e3a64f" alt="Mobile View 2" width="24%">
</div>

## ✨ Features

- **Interactive 3D Elements** - Engaging Three.js powered components
- **Smooth Animations** - Framer Motion animations for enhanced user experience
- **Responsive Design** - Flawless experience across all devices and screen sizes
- **Dark/Light Mode** - User preference-based theme switching
- **Performance Optimized** - Lazy loading, code splitting, and asset optimization
- **Accessibility Compliant** - WCAG guidelines implementation
- **SEO Friendly** - Meta tags and structured data
- **Contact Form** - Integrated email functionality
- **Analytics Ready** - Prepared for integration with analytics platforms

## 🛠 Tech Stack

- **Frontend Framework**: [React.js](https://reactjs.org/)
- **3D Graphics**: [Three.js](https://threejs.org/) with [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Deployment**: [Netlify](https://www.netlify.com/)
- **Form Handling**: [EmailJS](https://www.emailjs.com/)

## ⚡ Performance Optimizations

- **Code Splitting** - Lazy loading components for faster initial load
- **Image Optimization** - Compressed and properly sized images
- **Asset Preloading** - Strategic preloading of critical assets
- **Minification** - Reduced bundle size through code minification
- **Caching Strategies** - Implemented for faster subsequent visits
- **Tree Shaking** - Elimination of unused code

## 🏁 Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Hawhaz/professional-portfolio.git
   cd professional-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```
This will launch the application at `http://localhost:5173/`

### Production Build

1. Create an optimized production build:
   ```bash
   npm run build
   ```

2. Preview the production build locally:
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
professional-portfolio/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images, videos, and other media
│   ├── components/     # Reusable UI components
│   ├── constants/      # Configuration and constant values
│   ├── fonts/          # Custom font files
│   ├── hoc/            # Higher-order components
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main application component
│   ├── index.css       # Global styles
│   ├── main.jsx        # Application entry point
│   └── styles.js       # Styled components and theme
├── .eslintrc.cjs       # ESLint configuration
├── .gitignore          # Git ignore rules
├── index.html          # HTML entry point
├── package.json        # Project dependencies and scripts
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.cjs # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

## 🎨 Customization Guide

1. **Personal Information**: Update your details in `src/constants/index.js`
2. **Projects**: Add your projects in the same constants file
3. **Theme**: Modify colors in `tailwind.config.cjs`
4. **Content**: Update text in respective components
5. **Images**: Replace images in the `src/assets` directory
6. **3D Models**: Customize models in the `src/components/canvas` directory

## 🚢 Deployment

This portfolio is configured for easy deployment on Netlify:

1. Push your repository to GitHub
2. Connect your GitHub repository to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Original design inspiration by [Shaquille Ndunda](https://github.com/shaqdeff)
- 3D models and textures from [Three.js examples](https://threejs.org/examples/)
- Icons from [Heroicons](https://heroicons.com/)

## 📬 Contact

For any inquiries or feedback, please reach out through:

- GitHub: [Hawhaz](https://github.com/Hawhaz)
- LinkedIn: [Your LinkedIn Profile](https://www.linkedin.com/in/yourprofile/)
- Email: your.email@example.com

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Hawhaz">Hawhaz</a>
</p>