import '../../hojasEstilo/home.css'
import { useSession, SessionProvider } from "@inrupt/solid-ui-react";
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import ProfileViewer from "./ProfileViewer";
import { SessionInfo } from '@inrupt/solid-ui-react/dist/src/hooks/useSession';
import { Session } from '@inrupt/solid-client-authn-browser';
const setUserSession = (session :Session) => {
  localStorage.setItem("userSession", JSON.stringify(session));
};

function Login() {
  const { session } = useSession();

  console.log(session);
  if(!session.info.isLoggedIn)
      setUserSession(session)

  return(
    <SessionProvider sessionId="">
      {(!session.info.isLoggedIn) ? <LoginForm/> : <ProfileViewer/>}
    </SessionProvider>
  )
}
  
export default Login;