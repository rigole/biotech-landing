# Biotech Landing Page
> **Note:** This project was built exclusively as a technical assessment
> submission for a Creative Frontend Developer position. It is shared
> for evaluation purposes only — see [LICENSE](./LICENSE) for usage terms.

A premium, animation-driven landing page concept for a biotechnology company — built as part of the Creative Frontend Developer technical assessment.

The goal was to demonstrate strong frontend engineering, an original visual identity, and modern interaction design: scroll-driven storytelling, orchestrated motion, and an interactive 3D biotech visual, without leaning on template defaults.

---

## Table of Contents

- [Tech Stack](#tech-stack)

- [Features](#features)

- [Getting Started](#getting-started)

- [Available Scripts](#available-scripts)

- [Project Structure](#project-structure)

- [Design & Animation Approach](#design--animation-approach)

- [Performance & Accessibility](#performance--accessibility)

- [Deployment](#deployment)

- [License](#license)

---

## Tech Stack

| Category         | Technology                                  |

|-------------------|----------------------------------------------|

| Framework          | [Next.js 15]([https://nextjs.org/](https://nextjs.org/)) (App Router) + React 19 |

| Language          | TypeScript                                    |

| Styling           | Tailwind CSS                                  |

| Scroll animation   | GSAP + ScrollTrigger                          |

| UI motion          | Framer Motion                                 |

| 3D graphics        | Three.js via React Three Fiber + Drei         |

| Smooth scroll      | Lenis                                         |

| Deployment         | Vercel                                        |

## Features

- Hero section with an interactive 3D biotech visual

- Scroll-driven section reveals and transitions (GSAP ScrollTrigger)

- Micro-interactions on buttons, cards, and navigation (Framer Motion)

- Smooth, inertia-based scrolling (Lenis)

- Fully responsive across desktop, tablet, and mobile

- Accessible by default: visible focus states, semantic markup, `prefers-reduced-motion` support

- Modular, reusable component architecture

## Getting Started

### Prerequisites

- Node.js 18.18 or later (20 LTS recommended)

- npm

### Installation

```bash

git clone [https://github.com/rigole/biotech-landing.git](https://github.com/rigole/biotech-landing.git)

cd biotech-landing

npm install

```

### Development

```bash

npm run dev

```

Open [[http://localhost:3000](http://localhost:3000)](http://localhost:3000](http://localhost:3000)) in your browser.

## Available Scripts

| Command            | Description                               |

|--------------------|------------------------------------------ |

| `npm run dev`      | Start the development server              |

| `npm run build`    | Create a production build                 |

| `npm start`        | Serve the production build                |

| `npm run lint`     | Run ESLint                                |

## Project Structure

src/
app/ # Next.js App Router pages and layouts
components/
sections/ # Page sections (Hero, About, Technology, ...)
ui/ # Reusable UI primitives (buttons, cards, ...)
three/ # React Three Fiber scene(s) and 3D assets
lib/
animations/ # GSAP timelines and ScrollTrigger configs
hooks/ # Custom hooks (e.g. useLenis, useIsomorphicLayoutEffect)
styles/ # Global styles and Tailwind config
public/ # Static assets (images, fonts, 3D models)

## Design & Animation Approach

_To be completed as the visual direction and build progress — will cover the color and type system, the signature visual/interaction, and the reasoning behind key motion choices._

## Performance & Accessibility

- Images and 3D assets are optimized and lazy-loaded where possible
- Animations respect `prefers-reduced-motion`
- Semantic HTML and keyboard-navigable interactive elements
- Lighthouse targets: 90+ across Performance, Accessibility, Best Practices, SEO

## Deployment

Live site: _link to be added once deployed_

Deployed on [Vercel](https://vercel.com/).

## License

This project was built for evaluation purposes as part of a technical assessment.