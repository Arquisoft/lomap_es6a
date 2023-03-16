import '../../hojasEstilo/home.css'
import { useSession, SessionProvider } from "@inrupt/solid-ui-react";
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import ProfileViewer from "./ProfileViewer";

function Login() {
  const { session } = useSession();

  console.log(session);

  return(
    <SessionProvider sessionId="">
      {(!session.info.isLoggedIn) ? <LoginForm/> : <ProfileViewer/>}
    </SessionProvider>
  )
}
  
export default Login;