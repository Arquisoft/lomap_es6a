import React from "react";
import '../../hojasEstilo/home.css'

import { SessionProvider, LoginButton } from "@inrupt/solid-ui-react";


function Login() {
    return (
      <div className="contenedor_login_principal">
        <SessionProvider sessionId="log-in">
            <p>
                <em>
                Note:{' '}
                </em>
                to test out the Authentication examples, you will need to click the pop-out icon on the top right to open this example in a new tab first.
            </p>
            <LoginButton
                oidcIssuer="https://inrupt.net"
                redirectUrl="https://solid-ui-react.docs.inrupt.com/iframe.html?viewMode=docs&id=authentication-login-button--with-children&args="
            />
        </SessionProvider>
      </div>
    );
  }
  
  export default Login;