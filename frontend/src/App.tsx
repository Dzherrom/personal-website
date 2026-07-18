import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/layout/Footer";
import { PageTransition } from "./components/layout/PageTransition";
import { Contact } from "./pages/Contact/Contact";
import { Home } from "./pages/Home/Home";
import { Intro } from "./pages/Intro/Intro";
import { Projects } from "./pages/Projects/Projects";
import { Skills } from "./pages/Skills/Skills";

export default function App() {
  const location = useLocation();
  const showFooter = !["/", "/home"].includes(location.pathname);

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Intro />
              </PageTransition>
            }
          />
          <Route
            path="/home"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/projects"
            element={
              <PageTransition>
                <Projects />
              </PageTransition>
            }
          />
          <Route
            path="/skills"
            element={
              <PageTransition>
                <Skills />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition>
                <Contact />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
      {showFooter && <Footer />}
    </>
  );
}
