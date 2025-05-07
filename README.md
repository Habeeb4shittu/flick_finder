# 🎬 Flick Finder

Flick Finder is a sleek, responsive movie discovery app powered by the [TMDB API](https://www.themoviedb.org/documentation/api). Users can browse popular movies, search for specific titles, and explore detailed information about each film—including cast, ratings, genres, and more.

## 🚀 Features

- 🔍 **Search** for movies using keywords
- 🏆 **View top-rated and trending films**
- 🎥 **Detailed movie pages** with:
  - Poster and backdrop
  - Overview, release date, and rating
  - Duration and genre breakdown
  - Cast profiles with names and characters
- 📱 **Responsive UI** optimized for all screen sizes
- 💀 **Skeleton loaders** for a smooth loading experience
- 📸 **Fallback images** for missing poster paths

## 🛠️ Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Data Source**: TMDB API
- **State Management**: (Mention if you're using any state management library like Zustand, Redux Toolkit, or Context API)
- **HTTP Client**: (Mention if you're using a specific library for API calls, like `axios` or the built-in `fetch`)
- **Image Optimization**: (Mention if you're using Next.js's `Image` component or any other image optimization techniques)
- **Linting and Formatting**: (Mention tools like ESLint, Prettier, or Stylelint if you're using them)

## ⚙️ Getting Started

1.  **Prerequisites**:

    - Node.js (version \>= X.X.X)
    - npm or yarn

2.  **Installation**:

    ```bash
    git clone <repository-url>
    cd flick-finder
    npm install  # or yarn install
    ```

3.  **Environment Variables**:

    - Create a `.env.local` file in the root of your project.
    - Add your TMDB API key:
      ```
      NEXT_PUBLIC_TMDB_API_KEY=YOUR_TMDB_API_KEY
      ```
      _(Make sure to get your API key from the [TMDB website](https://www.google.com/search?q=https://www.themoviedb.org/settings/api).)_

4.  **Running the Development Server**:

    ```bash
    npm run dev  # or yarn dev
    ```

    - Open your browser and navigate to `http://localhost:3000`.
