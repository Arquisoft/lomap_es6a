import '../../hojasEstilo/home.css'
import {Image, LogoutButton,Text,CombinedDataProvider, useSession, SessionProvider, LoginButton } from "@inrupt/solid-ui-react";
import { Container, FormGroup, TextField, Button, Typography, CardContent, Card, CardActionArea} from "@material-ui/core"
import React, { useEffect,useRef,useState } from 'react';
import LoginForm from './LoginForm';
import ProfileViewer from "./ProfileViewer";
//import { Session } from '@inrupt/solid-client-authn-browser';


function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState<any>({});

  //With this we can control the login status for solid
  
  //const [session, setSession] = useSession();
  const { session } = useSession();

  if(localStorage.getItem("solid-auth-token") == null){
    setAccessToken(session);
    localStorage.setItem("solid-auth-token", accessToken);
  }
  else{
    setAccessToken(localStorage.getItem("solid-auth-token"));
    //session = accessToken;
  }

  //We have logged in
  session.onLogin(()=>{
    setIsLoggedIn(true);
  
  })

  //We have logged out
  session.onLogout(()=>{
    setIsLoggedIn(false);
  
  })
  
  return(
    <SessionProvider sessionId="log-in-example">
      {(!isLoggedIn) ? <LoginForm/> : <ProfileViewer/>}
    </SessionProvider>
  )
  }
  
  export default Login;