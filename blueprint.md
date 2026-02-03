
# Blueprint: LottoForge

## Overview

LottoForge is an interactive web application that simulates a lottery drawing. It provides a visually engaging experience for users to see randomly selected numbers drawn one by one, mimicking a real-life lottery.

## Project Outline

### Design and Style

*   **Theme:** Modern, clean, and engaging with a "lucky" feel.
*   **Color Palette:**
    *   Primary: Deep Blue (`#0A1931`)
    *   Secondary: Gold (`#FFD700`) for highlights and winning numbers.
    *   Accent: White (`#FFFFFF`) for text and contrast.
    *   Background: A subtle noise texture over a dark gradient.
*   **Typography:**
    *   Headers: `Poppins`, bold and expressive.
    *   Body: `Roboto`, clean and readable.
*   **Layout:**
    *   A central container for the main content.
    *   A responsive design that works on both desktop and mobile devices.
*   **Visual Effects:**
    *   Multi-layered drop shadows on containers to create depth.
    *   "Glow" effect on the "Draw" button and winning numbers.
    *   Animations for the lottery ball drawing.

### Features

*   **Lottery Number Display:** A container showing all 45 numbers before the draw.
*   **Random Number Generation:** A button to initiate the drawing of 6 unique numbers between 1 and 45.
*   **Animated Drawing:** An animation sequence that "draws" each winning number individually.
*   **Winning Numbers Display:** A dedicated section to display the 6 winning numbers and a bonus number.
*   **Web Components:** A `<lotto-ball>` custom element to encapsulate the style and behavior of each number ball, making the code modular and reusable.

## Current Plan

*   **Phase 1: Initial Setup**
    1.  Create the basic HTML structure in `index.html`.
    2.  Develop the CSS in `style.css` to implement the visual design.
    3.  Implement the core lottery logic in `main.js`, including the `<lotto-ball>` web component.
    4.  Ensure all files are correctly linked and the initial application is functional.
