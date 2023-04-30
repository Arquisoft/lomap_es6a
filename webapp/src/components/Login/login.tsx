import '../../hojasEstilo/home.css'
import { SessionProvider } from "@inrupt/solid-ui-react";
import LoginForm from './LoginForm';
import ProfileViewer from "./ProfileViewer";
import {Session, getDefaultSession,login } from '@inrupt/solid-client-authn-browser';
//import { Session} from '@inrupt/solid-client-authn-node';
import { getSessionIdFromOauthState,StorageUtility,InMemoryStorage} from '@inrupt/solid-client-authn-core';
import { SessionType } from '../../shared/shareddtypes';
const setUserSession = (session :Session) => {
  localStorage.setItem("userSession", JSON.stringify(session));
};

function Login({ session }: SessionType) {

  //var test =  useSession();
  // var test = new Session();
  //var s = new StorageUtility();
  //getSessionIdFromOauthState(s,"aaaa")
  // test.login({ clientId: "9a21fe50-c6fd-4d95-9924-63a823d92f73",
  //      clientSecret: "84c53f35-6e76-4b5a-9562-33c54fff934b",
  //      oidcIssuer: "https://login.inrupt.com",}).then(()=>{console.log(test);}) ;
       // https://podbrowser.inrupt.com/api/app
       //https://login.inrupt.com/openid
       //https://storage.inrupt.com/d9ce8b63-c9a8-4a01-b451-1e74eeadc09a/
  // const session = new Session(
  //   {
  //     clientAuthentication: getClientAuthenticationWithDependencies({})//.login({sessionId:"testasw",tokenType:"DPoP"},{})
  //   }
  // ).login({clientName:"testasw", clientSecret: "1234567890ABCabc.",oidcIssuer: "https://inrupt.net" }) ;
  // session.login({clientName:"testASW", clientSecret: "1234567890ABCabc.",oidcIssuer: "https://inrupt.net",
  // redirectUrl: window.location.protocol + '//' + window.location.host + "/Home" }) ;
  // session.login({
  //   // 2. Use the authenticated credentials to log in the session.
  //   clientId: "https://testasw.inrupt.net/public/test.json",
  //   clientSecret: "1234567890ABCabc.",
  //   oidcIssuer: "https://inrupt.net",
  //   //redirectUrl : "" ,
  //   redirectUrl: window.location.protocol + '//' + window.location.host + "/Home",

  // })
  //https://pablofernandezdiaz.inrupt.net/
  // login({ clientId: "https://testasw.inrupt.net/public/t.jsonld",
  //      oidcIssuer: "https://inrupt.net",
  //     clientName:"Web-Solid-Auth"
  //     }).then(()=>{console.log(getDefaultSession());}) ;

  //clientid:af99f530bb34e6865a99034f404f51fc
  //clientsecret:e0052c8c5e4cb90494458627f4607e33
  // if(!session.info.isLoggedIn)
  //   login({ 
  //   clientId: "af99f530bb34e6865a99034f404f51fc",
  //   clientSecret: "e0052c8c5e4cb90494458627f4607e33",
  //   clientName:"af99f530bb34e6865a99034f404f51fc",
  //   tokenType:"DPoP",
  //   oidcIssuer: "https://inrupt.net",
  //   redirectUrl: "http://localhost:3000/"
  //   }).then(()=>{console.log(test);}) ;
  // test.login({ 
  //      clientId: "https://testasw.inrupt.net/public/web%20solid%20auth.jsonld#this",
  //     oidcIssuer: "https://inrupt.net",
  //    clientName:"Web-Solid-Auth",
  //    redirectUrl: "http://localhost:3000/"
  //    }).then(()=>{console.log(test);}) ;

  console.log(test);
  //if(!session.info.isLoggedIn)
     // setUserSession(session)

  return(
    <SessionProvider sessionId="">
      {(!session.info.isLoggedIn) ? <LoginForm/> : <ProfileViewer/>}
    </SessionProvider>
  )
}
  
export default Login;