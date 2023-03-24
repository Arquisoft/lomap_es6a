import '../../hojasEstilo/home.css'
import {Image, LogoutButton,Text,CombinedDataProvider, useSession, SessionProvider, LoginButton } from "@inrupt/solid-ui-react";
import { Container, FormGroup, TextField, Button, Typography, CardContent, Card, CardActionArea} from "@material-ui/core"
import React, { useEffect,useRef,useState } from 'react';
import LoginForm from './LoginForm';
import ProfileViewer from "./ProfileViewer";
import { SessionInfo } from '@inrupt/solid-ui-react/dist/src/hooks/useSession';
import { Session } from '@inrupt/solid-client-authn-browser';
const setUserSession = (session :Session) => {
  localStorage.setItem("userSession", JSON.stringify(session));
};

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //With this we can control the login status for solid
  const { session } = useSession();

  //We have logged in
  session.onLogin(()=>{
    setIsLoggedIn(true)
    setUserSession(session)
  })

  //We have logged out
  session.onLogout(()=>{
    setIsLoggedIn(false)
  })

  return(
    <SessionProvider sessionId="log-in-example">
      {(!isLoggedIn) ? <LoginForm/> : <ProfileViewer/>}
    </SessionProvider>
  )
  }
  
  export default Login;