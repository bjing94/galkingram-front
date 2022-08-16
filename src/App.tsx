import React, { useEffect } from "react";
import "./App.css";
import styled from "styled-components";
import Appbar from "./components/Appbar/Appbar";
import Homepage from "./pages/Homepage";
import Unauth from "./pages/Unauth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import auth from "./store/auth-store";
import { observer } from "mobx-react-lite";
import postStore from "./store/post-store";
import ProfilePage from "./pages/ProfilePage";
import PostPopup from "./components/PostPopup/PostPopup";

const AppWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: #fafafa;
`;

const PageWrapper = styled.div`
  padding-top: 30px;
  max-width: 935px;
  margin: 0 auto;
`;
const App = observer(() => {
  useEffect(() => {
    auth.checkAuthentication();
  }, []);
  return (
    <BrowserRouter>
      <AppWrapper
        style={{
          overflowY: postStore.activePost ? "hidden" : "scroll",
        }}
      >
        {postStore.activePost && <PostPopup />}
        <Appbar />
        <PageWrapper>
          <Routes>
            <Route path="/" element={auth.auth ? <Homepage /> : <Unauth />} />
            <Route path="/:username" element={<ProfilePage />} />
          </Routes>
        </PageWrapper>
      </AppWrapper>
    </BrowserRouter>
  );
});

export default App;
