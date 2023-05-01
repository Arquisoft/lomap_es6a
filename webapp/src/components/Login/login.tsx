import '../../hojasEstilo/home.css'
import { SessionProvider } from "@inrupt/solid-ui-react";
import LoginForm from './LoginForm';
import ProfileViewer from "./ProfileViewer";
import {Session } from '@inrupt/solid-client-authn-browser';
import { SessionType } from '../../shared/shareddtypes';
const setUserSession = (session :Session) => {
  localStorage.setItem("userSession", JSON.stringify(session));
};

function Login({ session }: SessionType) {

  return(
    <SessionProvider sessionId="">
      {(!session.info.isLoggedIn) ? <LoginForm/> : <ProfileViewer/>}
    </SessionProvider>
  )
}
  
export default Login;