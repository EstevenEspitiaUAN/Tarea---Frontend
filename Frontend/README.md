# Frontend - Vite + React

Aplicación frontend construida con **Vite** y **React**. Se comunica con un backend Express a través de un proxy configurado en Vite.

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

El servidor de desarrollo se ejecuta en `http://localhost:5173`. Las peticiones a `/api` se redirigen al backend en `http://localhost:5000`.

## Build para producción

```bash
npm run build
```

## Lint

```bash
npm run lint
```
```
