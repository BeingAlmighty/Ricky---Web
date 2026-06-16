# Ricky - The Future of Local Mobility 🛺

Welcome to the official landing page repository for **Ricky**, the auto rickshaw booking startup that is transforming local commutes. 

We didn't just want to build a standard corporate website; we wanted to build an *experience*. When people think of auto rickshaws, they might not immediately think of cutting-edge technology or premium design. Our goal with this website was to completely flip that narrative. We wanted every scroll, hover, and click to feel buttery smooth, intensely premium, and highly trustworthy. 

## 🛠️ The Tech Stack

To achieve this level of performance and cinematic design, we carefully chose a modern, high-performance stack:

*   **React (via Vite):** For building a blazingly fast single-page application with instant hot module replacement during development.
*   **Tailwind CSS:** For writing hyper-custom, beautiful styling directly in our markup without the overhead of massive CSS files. It allowed us to quickly iterate on that signature deep purple (`#5B21B6`) brand aesthetic.
*   **GSAP (GreenSock Animation Platform):** The absolute powerhouse behind our UX. We heavily utilized `ScrollTrigger` and `MotionPathPlugin` to create the cinematic pinning sections (like the phone mockup changing states on scroll) and the beautiful network SVG animations.
*   **Lenis:** For silky-smooth, hardware-accelerated scroll hijacking. It makes the GSAP scroll triggers feel incredibly premium and weighty, completely eliminating the "janky" feel of native browser scrolling.
*   **Lucide React:** For crisp, beautiful, and consistent SVG iconography across the entire site.
*   **React Router DOM:** For seamless, instant page transitions without ever reloading the browser.

## 🌊 The Flow & User Experience

We designed the user journey to feel less like reading a brochure and more like watching an Apple product presentation. 

### 1. The Hook (Hero Section)
The moment you land, you're greeted with a massive, high-quality image masked with a cinematic gradient, bold typography, and our custom "Magnetic Buttons" that physically pull toward your cursor. It immediately establishes that Ricky is a premium, modern tech company.

### 2. The Product Showcase (How Ricky Works)
Instead of forcing users to read boring paragraphs about how to book a ride, we built an interactive, scroll-linked phone mockup. As the user scrolls down, the left-side text cards neatly stack on top of each other like a deck of cards, while the phone on the right dynamically changes its UI to show exactly what using the Ricky app looks like—from booking to live tracking.

### 3. Trust & Safety (The Core Pillar)
Safety is everything in ride-hailing. We dedicated an entire cinematic page to it. We built a dark-mode "Safety Network" visualization that uses SVG paths to literally draw the connections between the rider, the captain, and our GPS tracking systems in real-time as you scroll. It visually proves that our system is robust.

### 4. Flawless Mobile Responsiveness
We know 90% of our users will view this on their phones. We obsessed over the mobile layout. From the buttery-smooth full-screen hamburger menu to mathematically centering the phone mockups and scaling up the network diagrams, the mobile experience is arguably even better than the desktop one.

## 🚀 How to Run Locally

1.  **Install Dependencies:** `npm install`
2.  **Start the Dev Server:** `npm run dev`
3.  Enjoy the ride!

---
*Built with ❤️ for the streets.*
