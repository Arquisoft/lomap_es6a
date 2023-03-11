import '../../hojasEstilo/home.css'
import {Image, LogoutButton,Text,CombinedDataProvider, useSession, SessionProvider, LoginButton } from "@inrupt/solid-ui-react";
import { Container, FormGroup, TextField, Button, Typography, CardContent, Card, CardActionArea} from "@material-ui/core"
//import React, { useEffect,useRef,useState } from 'react';
import LoginForm from './LoginForm';
import ProfileViewer from "./ProfileViewer";
import React, { useState, useEffect } from 'react';
import { login, handleIncomingRedirect, fetch,getDefaultSession } from '@inrupt/solid-client-authn-browser';
import Cookies from 'js-cookie';
import { ISessionInfo } from '@inrupt/solid-client-authn-browser';



const Login = () => {
  const [webId, setWebId] = useState<string>('');

  const handleLogin = async () => {
    const session = getDefaultSession();
    await login({
      oidcIssuer: 'https://inrupt.net',
      redirectUrl: window.location.href,
      clientName: 'My App',
    });
  };

  useEffect(() => {
    const fetchSession = async () => {
      const session = await handleIncomingRedirect();
      if ((session as ISessionInfo).isLoggedIn) {
        const accessToken = (session as ISessionInfo);
        Cookies.set('accessToken', accessToken.sessionId, { secure: true, sameSite: 'strict' });
       // const response = await fetch((session as ISessionInfo).webId, { credentials: 'include' });
        //const data = await response.text();
        //setWebId(accessToken?.webId);
      }
    };
    fetchSession();
  }, []);

  return (
    <>
      {webId ? (
        <p>You are logged in as {webId}</p>
      ) : (
        <button onClick={handleLogin}>Login with Inrupt</button>
      )}
    </>
  );
};

export default Login;