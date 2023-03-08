import React, { useEffect,useRef,useState } from 'react';
import { SessionProvider, LoginButton } from "@inrupt/solid-ui-react";
import { Container, FormGroup, TextField, Button } from "@material-ui/core"

const LoginForm = () => {
    const [idp, setIdp] = useState("https://inrupt.net");
    const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");
  
    useEffect(() => {
      setCurrentUrl(window.location.href);
    }, [setCurrentUrl]);
  
    return (
      <Container fixed>
        <FormGroup>
          <TextField
            label="Identity Provider"
            placeholder="Identity Provider"
            type="url"
            value={idp}
            onChange={(e) => setIdp(e.target.value)}
            InputProps={{
              endAdornment: (
                <LoginButton oidcIssuer={idp} redirectUrl={currentUrl}>
                  <Button variant="contained" color="primary">
                    Login
                    </Button>
                </LoginButton>
              ),
            }}
          />
        </FormGroup>
      </Container>
    );
  }

  export default LoginForm;