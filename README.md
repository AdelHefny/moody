# Moody Mood Tracker

Moody is a simple, elegant web application designed to track and visualize your mood. Users can submit their current mood, and the application displays a collective view of all moods submitted, complete with representative imagery and daily mood averaging.

The frontend is built with **Next.js** and **Tailwind CSS**. The backend is powered by **n8n.io** workflows, which use **AI** to analyze mood submissions, generate image queries, and calculate daily mood metrics.

## Features

* **Mood Submission:** A clean, focused input form to quickly submit your current mood.
* **Dynamic Background:** The application's background dynamically updates to reflect the image for the current day's mood.
* **Mood Gallery:** Displays all submitted moods in a responsive grid, showing:
    * A representative image for the mood (fetched from Pexels).
    * The mood's description.
    * The average mood for that day.
    * The total number of submissions for that day.
* **Smooth Animations:** Utilizes **GSAP** for subtle, professional animations on form elements and card loading.
* **Dark Mode:** Features a responsive light and dark mode theme that adapts to your system settings.

## Tech Stack

* **Frontend:** [Next.js](https://nextjs.org/) (v16), [React](https://react.dev/) (v19), [TypeScript](https://www.typescriptlang.org/)
* **Backend:** [n8n.io](https://n8n.io/) (with AI integration)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4)
* **Animation:** [GSAP](https://gsap.com/)
* **Font:** [Geist](https://vercel.com/font)

## Backend with n8n

This project's backend is powered entirely by **n8n**, showcasing a modern, low-code approach to building server-side logic.

* **API Endpoints:** Two n8n webhook URLs are used:
    * `POST /webhook/mood/submit`: Receives new mood submissions from the frontend.
    * `GET /webhook/moods`: Fetches the complete list of all every day to display in the gallery.
* **AI-Powered Data Handling:** The n8n workflow is responsible for:
    1.  Receiving the new mood text.
    2.  Using an **AI model to analyze the sentiment** of the text.
    3.  Generating a **search query** based on the AI analysis.
    4.  Fetching a relevant image from **Pexels** using that query.
    5.  **Calculating the average mood** for the day.
    6.  Storing all processed data (Google Sheet) and serving it back to the Next.js app.

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```