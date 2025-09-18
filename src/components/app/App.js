import AppHeader from "../appHeader/AppHeader";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Spinner from "../spinner/Spinner";

const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const MainPage = lazy(() => import("../pages/MainPage"));
const Page404 = lazy(() => import("../pages/404"));
const ComicPage = lazy(() => import("../pages/ComicPage"));
const CharacterPage = lazy(() => import("../pages/charactersPage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <div className="app">
          <AppHeader />
          <main>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/:charId" element={<CharacterPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="/comics/:comicId" element={<ComicPage />} />

              <Route path="/Marvel" element={<Navigate to="/" />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </main>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
