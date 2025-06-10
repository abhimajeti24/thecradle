import NotFound from "./pages/NotFound";
import ImageUpload from "./pages/ImageUpload";
import Dashboard from "./pages/Dashboard";
import {ProtectedRoute} from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import Gallery from "./pages/Gallery";

export default function App() {
    return (
    <>
    <Toaster />
      <Routes>
          <Route
            path="/"
            element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            }
          />
          <Route
            path="/imageUpload"
            element={
                <ProtectedRoute>
                    <ImageUpload />
                </ProtectedRoute>
            }
          />
          <Route
            path="/gallery"
            element={
                <ProtectedRoute>
                    <Gallery />
                </ProtectedRoute>
            }
          />
          <Route
            path="/sign-in/*"
            element={<SignIn routing="path" path="/sign-in" />}
          />
          <Route
            path="/sign-up/*"
            element={<SignUp routing="path" path="/sign-up" />}
          />
          <Route
            path="*"
            element={
                <NotFound />
            }
          />
        </Routes>
    </>
  );
}