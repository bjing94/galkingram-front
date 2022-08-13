import React, { useEffect } from "react";
import "./App.css";
import styled from "styled-components";
import Appbar from "./components/Appbar/Appbar";
import Homepage from "./pages/Homepage";
import Unauth from "./pages/Unauth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import auth from "./store/auth-store";
import { observer } from "mobx-react-lite";

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
`;
const App = observer(() => {
  useEffect(() => {
    auth.checkAuthentication();
  }, []);
  return (
    <BrowserRouter>
      <AppWrapper>
        <Appbar />
        <Routes>
          <Route path="/" element={auth.auth ? <Homepage /> : <Unauth />} />
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  );
});

export default App;
