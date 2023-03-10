import { Button, Card, CardContent, CardHeader, Container, FormGroup, Link, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LoginButton} from "@inrupt/solid-ui-react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { accessToken } from "mapbox-gl";
import { TokenClass } from "typescript";

const LoginForm = () => {
  const [idp, setIdp] = useState("https://inrupt.net");
  const [currentUrl, setCurrentUrl] = useState(window.location.protocol + '//' + window.location.host + '/');
  //const [token,setToken] = useState("solid-client-authn-node"); 
  
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
              <LoginButton oidcIssuer={idp} redirectUrl={window.location.protocol + '//' + window.location.host + "/ProfileViewer"}>
                <Button variant="contained" color="primary">
                  Login
                </Button>
              </LoginButton>
            ),
          }} />
      </FormGroup>
    </Container>
  );
}
export default LoginForm;