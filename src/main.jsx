import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./components/component/create-trip";
import Header from "./components/custom/Header";
import { Toaster } from "@/components/ui/sonner"
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from "./view-trip/[tripId]";
import Mytrips from "./components/component/trip-history";
import Footer from "./components/custom/Footer";

const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
  },
  {
    path: "/create-trip",
    element: <CreateTrip/>,
  },
  {
    path: "/view-trip/:tripId",
    element: <Viewtrip />,
  },
  {
    path: "/my-trips",
    element: <Mytrips />,
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="559856819546-vkn7g6aq3f1ptss67c0h0c2iatifgk54.apps.googleusercontent.com">
    <Header/>
    <Toaster />
    
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
    <Footer></Footer>
  </StrictMode>
);
