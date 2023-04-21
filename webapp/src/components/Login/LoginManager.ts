import { Session,  ISessionOptions, handleIncomingRedirect, getDefaultSession, login} from "@inrupt/solid-client-authn-browser";

class SesionTemp extends Session{
  constructor(sesion : Session,sessionOptions?: Partial<ISessionOptions>, sessionId?: string | undefined) {
    super();
    Session.prototype = sesion ;
    
  }
}



export const setUserSession = (session :Session) => {

  localStorage.clear();
  localStorage.setItem("userSession", JSON.stringify(session));
}


const test = async  (url : string)  =>  {
   await handleIncomingRedirect({restorePreviousSession: true});

  if (!getDefaultSession().info.isLoggedIn) {
     await login({
      oidcIssuer: "https://inrupt.net",
      redirectUrl: url,
      clientName: "My application"
    });
  } 

}

export const getUserSession = (): Session => {
    const session = localStorage.getItem("userSession");
   
    return session ? JSON.parse(session) : null;
  }