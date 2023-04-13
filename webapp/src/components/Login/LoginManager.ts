import { Session,  ISessionOptions, onSessionRestore, handleIncomingRedirect, logout} from "@inrupt/solid-client-authn-browser";
//import {  ISessionOptions} from "@inrupt/solid-client-authn-browser";
//import { Session } from "@inrupt/solid-client-authn-node"
import { IStorage, StorageUtility,ISessionInfoManager } from "@inrupt/solid-client-authn-core";
import { SessionContext,useSession } from "@inrupt/solid-ui-react";
import { useContext } from "react";
import { ILoginHandler, ILogoutHandler, IIncomingRedirectHandler, ISessionInfo, IIssuerConfigFetcher, ISessionInternalInfo, ILoginOptions } from "@inrupt/solid-client-authn-core";
import React, { useState, useEffect } from 'react';
import * as apptest from "../../App";
//import { getSessionFromStorage, getSessionIdFromStorageAll,Session } from "@inrupt/solid-client-authn-node";
import { SessionInfo } from "@inrupt/solid-ui-react/dist/src/hooks/useSession";
import { getDefaultSession, login,getClientAuthenticationWithDependencies } from "@inrupt/solid-client-authn-browser";
//const cookieSession = require("cookie-session");

class SesionTemp extends Session{
 // const fetch = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>; 
  constructor(sesion : Session,sessionOptions?: Partial<ISessionOptions>, sessionId?: string | undefined) {
    super();
    Session.prototype = sesion ;
    // async (url, init) => {
    //   return this.clientAuthentication.fetch(url, init);
    // }
    
  }
  //fetch: ((input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>) & typeof fetch;
}

//var ses : Session = new Session;

export const userLogout = () =>{
  const session = getUserSession()
  // var testLogout = logout

  // session.logout = testLogout;
  // session.logout()
  
  // var testeoo = getDefaultSession();
  
  // var list =testeoo.listeners
  // session.addListener = testeoo.addListener
  // // for (var i in list){
  // //   session.addListener(i.)
  // // }

  // session.logout = testeoo.logout;
  // session.logout()
  
  // var f = new Session();
  // f = Session.prototype;
  session.info.isLoggedIn = false;
  setUserSession(session)
  logout()
  //logout.caller(session)
}

export const setUserSession = (session :Session) => {
 // logout.caller(session)
  localStorage.clear();
  localStorage.setItem("userSession", JSON.stringify(session));
}


// export  const getUserSession =  (): Session => {
//   const session = localStorage.getItem("userSession");
//   var temp : Session = session ? JSON.parse(session) : null;
//   const ret =  getSessionFromStorage(temp.info.sessionId);
  
//  return ret
  
//  };

const test = async  (url : string)  =>  {
    handleIncomingRedirect({restorePreviousSession: true});
 
  // 2. Start the Login Process if not already logged in.
  if (!getDefaultSession().info.isLoggedIn) {
     await login({
      // Specify the URL of the user's Solid Identity Provider;
      // e.g., "https://login.inrupt.com".
      oidcIssuer: "https://inrupt.net",
      // Specify the URL the Solid Identity Provider should redirect the user once logged in,
      // e.g., the current page for a single-page app.
      redirectUrl: url,
      // Provide a name for the application when sending to the Solid Identity Provider
      clientName: "My application"
    });
  } 

}
// export const getUserSession =  (url : string) : Session =>  {
//   test(url);
//   return getDefaultSession()
// }
// export const getUserSession =  (url : string): Session =>  {
//   handleIncomingRedirect();
//   const session = localStorage.getItem("userSession");
//   const temp: Session  = session ? JSON.parse(session) : null;
//   const ret = getDefaultSession();

//   if(!ret.info.isLoggedIn)
//   login({
//     oidcIssuer: 'https://inrupt.net',
//     clientId: temp.info.clientAppId,
//     redirectUrl: url
//   });

//   return ret
// };
// export const getUserSession =  (): Session =>  {
//   const session = localStorage.getItem("userSession");
//   const temp: Session  = session ? JSON.parse(session) : null;
//   const test = getDefaultSession()
//   //const test =  getSessionFromStorage(temp.info.sessionId);
//   var ret : Session = new Session
//    Promise.resolve(test).then((value) : Session =>{
//     if(typeof value === 'undefined')
//       ret= new Session
//     else
//       ret= value as Session
//     return ret
//     });
//   return ret 
// };


  //return session ? JSON.parse(session) : null;



// export const setUserSession = (session :Session) => {
 

//     localStorage.clear();
//     localStorage.setItem("userSession", JSON.stringify(session));
//   }
  
  
export const getUserSession = (): Session => {
    const session = localStorage.getItem("userSession");
    //var retu : Session = new Session();
    //silentlyAuthenticate()

    //if(session ? JSON.parse(session) : null)
    var retu : Session 
    var test : Session = session ? retu =JSON.parse(session) : null
   // var retu : Session = new Session(test);
    return session ? JSON.parse(session) : null;
  }

// export const getUserSession = (): Session => {
//export async function loginAndFetch() : Promise<Session> {
export const useLoginAndFetch =  ()  => {
  // 1. Call `handleIncomingRedirect()` to complete the authentication process.
  //    If called after the user has logged in with the Solid Identity Provider, 
  //      the user's credentials are stored in-memory, and
  //      the login process is complete. 
  //   Otherwise, no-op.  
  //  handleIncomingRedirect({
  //   restorePreviousSession: true
  // }).then((info) => {
  //   console.log(`Logged in with WebID [${info?.webId}]`)
  // })

  useEffect(() => {
    // 2. When loading the component, call `handleIncomingRedirect` to authenticate
    //    the user if appropriate, or to restore a previous session.
    handleIncomingRedirect({
      restorePreviousSession: true
    }).then((info) => {
      console.log(`Logged in with WebID [${info?.webId}]`)
    })
  }, []);
  console.log("log in process start")
   //handleIncomingRedirect();
  // 2. Start the Login Process if not already logged in.
  console.log("log in process mid")
  if (!getDefaultSession().info.isLoggedIn) {
     login({
      // Specify the URL of the user's Solid Identity Provider;
      // e.g., "https://login.inrupt.com".
      oidcIssuer: "https://inrupt.net",
      // Specify the URL the Solid Identity Provider should redirect the user once logged in,
      // e.g., the current page for a single-page app.
      redirectUrl: window.location.protocol + '//' + window.location.host + "/ProfileViewer",
      // Provide a name for the application when sending to the Solid Identity Provider
      clientName: "My application"
    });
  }
  console.log("log in process fin")
  //getDefaultSession();
}
export const useLogin = async  ()  => {
 // 1. Call `handleIncomingRedirect()` to complete the authentication process.
  //    If called after the user has logged in with the Solid Identity Provider, 
  //      the user's credentials are stored in-memory, and
  //      the login process is complete. 
  //   Otherwise, no-op.  
  console.log("log in process start")
  await handleIncomingRedirect();
  console.log("log in process mid")
  // 2. Start the Login Process if not already logged in.
  if (!getDefaultSession().info.isLoggedIn) {
    await login({
      // Specify the URL of the user's Solid Identity Provider;
      // e.g., "https://login.inrupt.com".
      oidcIssuer: "https://inrupt.net",
      // Specify the URL the Solid Identity Provider should redirect the user once logged in,
      // e.g., the current page for a single-page app.
      redirectUrl: window.location.href,
      // Provide a name for the application when sending to the Solid Identity Provider
      clientName: "My application"
    });
  }
  console.log("log in process fin")
  //var ses = getDefaultSession();

}

export function useLoginT(){
  console.log("log start")
  //useLoginAndFetch().then(() =>{return});
  useLoginAndFetch();
  console.log("log end")
}
// }
//export {}