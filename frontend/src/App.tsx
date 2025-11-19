import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/ui/Layout";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import NotFound from "./pages/NotFound";
import PublicRoute from "./pages/PublicRoute";
import Links from "./pages/Links";
import Documents from "./pages/Documents";
import YoutubeVideos from "./pages/YoutubeVideos";
import Tweets from "./pages/Tweets";
import HomePage from "./pages/HomePage";
import SharedContent from "./components/SharedContent";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/links" element={<Links />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/youtube-links" element={<YoutubeVideos />} />
            <Route path="/tweets" element={<Tweets />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/shared/:shareableId" element={<SharedContent />} />
      </Routes>
    </>
  );
};

export default App;
