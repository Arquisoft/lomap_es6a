import '../../hojasEstilo/home.css'
import { useSession, SessionProvider } from "@inrupt/solid-ui-react";
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import ProfileViewer from "./ProfileViewer";
import { SessionInfo } from '@inrupt/solid-ui-react/dist/src/hooks/useSession';
import { Session } from '@inrupt/solid-client-authn-browser';
import * as loginManager  from "./LoginManager";
// const setUserSession = (session :Session) => {
//   localStorage.setItem("userSession", JSON.stringify(session));
// };

function Login() {
  //const { session } = useSession();

  
  var temp = useSession().session;
  //const { session } = useSession();

   var cond = temp.info.isLoggedIn
  if (loginManager.getUserSession() == null || cond ){
  loginManager.setUserSession(temp);
  }

  const  session  = loginManager.getUserSession();
  console.log(session);
  return(
    <SessionProvider sessionId="">
      {(!session.info.isLoggedIn) ? <LoginForm/> : <ProfileViewer/>}
    </SessionProvider>
  )
}
  
export default Login;