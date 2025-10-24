# Moody  Mood Tracker

Moody is a simple, elegant web application designed to track and visualize your mood. Users can submit their current mood, and the application displays a collective view of all moods submitted, complete with AI-generated imagery and daily mood averaging.

The frontend is built with **Next.js** and **Tailwind CSS**, while the backend logic, data storage, and image generation are all powered by **n8n.io** workflows.

## Features

  * **Mood Submission:** A clean, focused input form to quickly submit your current mood.
  * **Dynamic Background:** The application's background dynamically updates to reflect the generated image for the current day's mood.
  * **Mood Gallery:** Displays all submitted moods in a responsive grid, showing:
      * An AI-generated image representing the mood.
      * The mood's description.
      * The average mood for that day.
      * The total number of submissions for that day.
  * **Smooth Animations:** Utilizes **GSAP** for subtle, professional animations on form elements and card loading.
  * **Dark Mode:** Features a responsive light and dark mode theme that adapts to your system settings.

## Tech Stack

  * **Frontend:** [Next.js](https://nextjs.org/) (v16), [React](https://react.dev/) (v19), [TypeScript](https://www.typescriptlang.org/)
  * **Backend:** [n8n.io](https://n8n.io/)
  * **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4)
  * **Animation:** [GSAP](https://gsap.com/)
  * **Font:** [Geist](https://vercel.com/font)

## Backend with n8n

This project's backend is powered entirely by **n8n**, showcasing a modern, low-code approach to building server-side logic.

  * **API Endpoints:** Two n8n webhook URLs are used:
      * `POST /webhook/mood/submit`: Receives new mood submissions from the frontend.
      * `GET /webhook/moods`: Fetches the complete list of all moods to display in the gallery.
  * **Data Handling:** The n8n workflow is responsible for receiving data, processing it (e.g., generating images, calculating averages), storing it (likely in a database or Google Sheet connected to n8n), and serving it back to the Next.js app.
  * **Image Hosting:** The `next.config.ts` file is configured to allow images from `adelhefny.app.n8n.cloud`, confirming that n8n also acts as the host for the generated mood images.

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://www.google.com/search?q=%5Bhttps://nextjs.org/docs/app/api-reference/cli/create-next-app%5D\(https://nextjs.org/docs/app/api-reference/cli/create-next-app\)).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.