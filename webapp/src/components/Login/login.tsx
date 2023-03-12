import '../../hojasEstilo/home.css'
import {Image, LogoutButton,Text,CombinedDataProvider, useSession, SessionProvider, LoginButton } from "@inrupt/solid-ui-react"  
import { Container, FormGroup, TextField, Button, Typography, CardContent, Card, CardActionArea} from "@material-ui/core"
import { handleIncomingRedirect, login, fetch, getDefaultSession,onSessionRestore } from '@inrupt/solid-client-authn-browser'

import React, { useEffect,useRef,useState } from 'react'
import LoginForm from './LoginForm'
import ProfileViewer from "./ProfileViewer"
//import { useEffect } from 'react';
//import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { Session } from '@inrupt/solid-client-authn-browser';


function Login(){
   var t : Promise<boolean> = Test();
  return(
    <SessionProvider sessionId="log-in-example">
      {(!t) ? <LoginForm/> : <ProfileViewer/>}
    </SessionProvider>
  )
}

async function Test() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState<any>({});
  await handleIncomingRedirect();
  
 //const router = useRouter();

  // 1. Register the callback to restore the user's page after refresh and
  //    redirection from the Solid Identity Provider.
  onSessionRestore((url) => {
    //router.push(url)
  });

  useEffect(() => {
    // 2. When loading the component, call `handleIncomingRedirect` to authenticate
    //    the user if appropriate, or to restore a previous session.
    handleIncomingRedirect({
      restorePreviousSession: true
    }).then((info) => {
      var temp  = info;
      console.log(`Logged in with WebID [${info?.webId}]`)
    })
  }, []);
  //With this we can control the login status for solid
  
  //const [session, setSession] = useSession();
  //const {session} = useSession();
 

  
  const  session   =getDefaultSession();
  //We have logged in
  
  session.onLogin(()=>{
    setIsLoggedIn(true);
  
  })

  //We have logged out
  session.onLogout(()=>{
    setIsLoggedIn(false);
  
  })
  setIsLoggedIn( session.info.isLoggedIn);
  Cookies.set('accessToken', session.info.sessionId, { secure: true, sameSite: 'strict' });
  return(isLoggedIn)
  }
  
  export default Login;