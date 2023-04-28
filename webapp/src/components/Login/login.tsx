import '../../hojasEstilo/home.css'
import { useSession, SessionProvider } from "@inrupt/solid-ui-react";
import LoginForm from './LoginForm';
import ProfileViewer from "./ProfileViewer";
import { Session } from '@inrupt/solid-client-authn-browser';
const setUserSession = (session :Session) => {
  localStorage.setItem("userSession", JSON.stringify(session));
};

function Login() {
  const { session } = useSession();
  // const session = new Session(
  //   {
  //     clientAuthentication: getClientAuthenticationWithDependencies({})//.login({sessionId:"testasw",tokenType:"DPoP"},{})
  //   }
  // ).login({clientName:"testasw", clientSecret: "1234567890ABCabc.",oidcIssuer: "https://inrupt.net" }) ;
  // session.login({clientName:"testASW", clientSecret: "1234567890ABCabc.",oidcIssuer: "https://inrupt.net",
  // redirectUrl: window.location.protocol + '//' + window.location.host + "/Home" }) ;
  // session.login({
  //   // 2. Use the authenticated credentials to log in the session.
  //   clientId: "https://testasw.inrupt.net/",
  //   clientSecret: "1234567890ABCabc.",
  //   oidcIssuer: "https://inrupt.net",
  //   //redirectUrl : "" ,
  //   redirectUrl: window.location.protocol + '//' + window.location.host + "/Home",

  // })
  
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