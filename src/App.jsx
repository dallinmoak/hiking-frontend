import "./App.css";
import '@neondatabase/auth-ui/css';
import Header from "./components/Header";
import HikeList from "./components/HikeList";
import NewHike from "./components/NewHike";
import IndividualHike from "./components/IndividualHike";
import { HikeProvider } from "./context/HikeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthView, NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react";
import { authClient } from "./lib/auth";
import Login from "./components/Login";
import AccountSettings from "./components/AccountSettings";
import AccountSecurity from "./components/AccountSecurity";

function App() {
  return (
    <>
      <NeonAuthUIProvider emailOTP authClient={authClient}>
        <BrowserRouter>
          <HikeProvider>
            <Header />
            <Routes>
              <Route path="/" element={<HikeList />} exact />
              <Route path="/newHike" element={<NewHike />} exact />
              <Route path="/hikes/:id" element={<IndividualHike />} />
              <Route path="/auth/sign-in" element={<Login />} />
              <Route
                path="/auth/sign-out"
                element={
                  <>
                    <p>should be sign out</p>
                    <AuthView pathname="sign-out" />
                  </>
                }
              />
              <Route
                path="/auth/sign-up"
                element={<AuthView pathname="sign-up" />}
              />
              <Route path="/account/settings" element={<AccountSettings />} />
              <Route path="/account/security" element={<AccountSecurity />} />
            </Routes>
          </HikeProvider>
        </BrowserRouter>
      </NeonAuthUIProvider>
    </>
  );
}

export default App;
