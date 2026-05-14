# Vasco Moreno — Portfolio

Personal portfolio website for Vasco Moreno, Software Engineer based in Fafe, Braga — Portugal.

## About

- **Role:** Software Engineer
- **Education:** BSc Software Engineering, Universidade do Minho
- **Languages:** Portuguese (native), English (fluent), Spanish (conversational)
- **Contact:** vascobmoreno@gmail.com
- **LinkedIn:** [vasco-moreno-13a6aa261](https://www.linkedin.com/in/vasco-moreno-13a6aa261/)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion |
| 3D rendering | Three.js via @react-three/fiber + @react-three/drei |
| 3D model | Custom GLTF with per-fragment GLSL shaders |

## Architecture

The centerpiece is an interactive 3D human model rendered with WebGL. Clicking different body zones (head, chest, legs) opens holographic info panels for Skills, About, Experience, and Education. Zone classification runs per-fragment in a custom GLSL shader using model-local space, so zone boundaries stay fixed to the body regardless of rotation.

## Run locally

```bash
npm install
npm run dev
```
