import { Session } from "@inrupt/solid-client-authn-browser";
export const setUserSession = (session :Session) => {
    localStorage.clear();
    localStorage.setItem("userSession", JSON.stringify(session));
  }
  
  
export const getUserSession = (): Session => {
    const session = localStorage.getItem("userSession");
    return session ? JSON.parse(session) : null;
  }


//export {}