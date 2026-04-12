# Medz Ivory: Design System Specification

### 1. Overview & Creative North Star
**Creative North Star: The Sovereign Archive**
Medz Ivory is a design system that balances the clinical coldness of medical data with the sophisticated warmth of high-end editorial layouts. It is built to communicate authority, precision, and trust. By moving away from generic grids and embracing "The Sovereign Archive" aesthetic, the system uses intentional whitespace (Spacing 3) and high-contrast typographic scales to elevate complex pharmaceutical data into a curated experience.

### 2. Colors
The palette is rooted in deep regulatory blues (`#003f87`) and sterile, high-clarity surfaces.

*   **Primary Identity:** A commanding deep blue that signifies institutional stability.
*   **The "No-Line" Rule:** Sectioning is strictly achieved through shifts in surface containers (e.g., transitioning from `surface` to `surface_container_low`). 1px solid borders are replaced by tonal shifts or `outline_variant` at 20% opacity only when functionally required.
*   **Surface Hierarchy:** 
    *   `surface_container_lowest`: Pure white (#ffffff) for card backgrounds and elevated components.
    *   `surface`: The foundation light blue tint (#f8f9ff).
    *   `surface_container_highest`: Used for subtle header accents and hero background gradients.
*   **The Glass Rule:** Interactive floating elements (headers, search bar backgrounds) must use `backdrop-filter: blur(12px)` with a 70% opacity white fill to maintain "optical depth."

### 3. Typography
The system utilizes **Inter** across all levels, but creates distinction through extreme weight variation and letter spacing.

*   **Display / Hero (3.75rem - 4.5rem):** ExtraBold, tracking-tight. The "National" scale for maximum impact.
*   **Headlines (1.875rem - 3rem):** ExtraBold, used for entity titles (e.g., Drug Names).
*   **The Intelligence Label (10px):** Uppercase, 0.2em tracking. Used for metadata and system status indicators to provide a "tactical" feel.
*   **Body & Lead (1.125rem):** Medium weight for summaries, ensuring legibility against light-tinted backgrounds.
*   **Rhythm:** The scale follows a jump from 10px (labels) to 1.125rem (body) to 1.875rem (article titles), creating a rhythmic density that feels both technical and luxurious.

### 4. Elevation & Depth
Elevation is expressed through ambient light and stacking rather than sharp shadows.

*   **The Layering Principle:** Components are layered using a "Physical Stack." The main search bar sits atop a 24px blur, while cards use the `Refined Shadow`.
*   **Shadow Specification:** `0 12px 40px rgba(11, 28, 48, 0.04)`. This ultra-diffused shadow mimics natural light in a sterile environment.
*   **Hero Gradient:** Backgrounds are never flat. Use a radial gradient starting at `rgba(211, 228, 254, 0.4)` at the top-center, fading to transparent to guide the eye toward content.

### 5. Components
*   **The Archival Card:** Large radius (1.5rem), `surface_container_lowest` background, and the `Refined Shadow`. Internal spacing must be generous (p-10).
*   **Input Fields:** Capsule-shaped (rounded-full), featuring a subtle `inner-subtle` inset shadow and a focus state that triggers a 2xl glow of `primary/5`.
*   **Action Buttons:** Primary actions use high-contrast blue with a tracking-widest uppercase label. Secondary actions utilize `surface_container_low` with primary-colored text.
*   **Status Badges:** Small, uppercase, high-tracking text inside a pill-shaped container with 10% opacity fills of the status color (e.g., Secondary for "In Stock").

### 6. Do's and Don'ts
*   **Do:** Use 24px-32px of padding inside cards to ensure data "breathes."
*   **Do:** Mix font weights (ExtraBold vs Regular) within the same line to create emphasis.
*   **Don't:** Use pure black (#000000) for text; always use `on_surface` (#0b1c30) to maintain tonal harmony.
*   **Don't:** Use sharp corners. All interactive elements must have at least an `lg` (0.25rem) or `card` (1.5rem) radius to feel modern and accessible.
