import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ContentProvider } from "./context/ContentContext.tsx";
import { TagProvider } from "./context/TagsContext.tsx";
import { SearchProvider } from "./context/SearchContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <ContentProvider>
          <TagProvider>
            <SearchProvider>
              <App />
            </SearchProvider>
          </TagProvider>
          <ToastContainer />
        </ContentProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
