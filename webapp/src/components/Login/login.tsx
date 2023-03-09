import { SessionProvider, useSession } from "@inrupt/solid-ui-react";
import { useState} from "react";
import LoginForm from './LoginForm';
import ProfileViewer from "./ProfileViewer"


function Login() {
    //We use this state variable
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //With this we can control the login status for solid
    const { session } = useSession();
  
    //We have logged in
    session.onLogin(()=>{
      setIsLoggedIn(true)
    })
  
    //We have logged out
    session.onLogout(()=>{
      setIsLoggedIn(false)
    })

    return (
      <div className="contenedor_login_principal">
        <SessionProvider sessionId="log-in">
          {(!isLoggedIn) ? <LoginForm/> : <ProfileViewer/>}
        </SessionProvider>
      </div>
    );
  }
  
  export default Login;