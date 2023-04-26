import '../../hojasEstilo/home.css'
import { useSession, SessionProvider } from "@inrupt/solid-ui-react";
import LoginForm from './LoginForm';
import ProfileViewer from "./ProfileViewer";

function Login() {
  const { session } = useSession();

  return(
    <SessionProvider sessionId="">
      {(!session.info.isLoggedIn) ? <LoginForm/> : <ProfileViewer/>}
    </SessionProvider>
  )
}
  
export default Login;