import { useSession, CombinedDataProvider, Image, LogoutButton, Text } from "@inrupt/solid-ui-react";
import { Button, Card, CardActionArea, CardContent, Container, Typography } from "@material-ui/core";
import { handleIncomingRedirect, login, fetch, getDefaultSession, Session } from '@inrupt/solid-client-authn-browser'
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import React, {useEffect } from "react";
import { SessionInfo } from "@inrupt/solid-ui-react/dist/src/hooks/useSession";

async function Test() {
  const session =getDefaultSession();
  await handleIncomingRedirect({
    restorePreviousSession: true
  });
  console.log('1');
// Sleeps for 2 seconds.
  await sleep(2000);
  return(session)
  // await useEffect(() => {
  //   // 2. When loading the component, call `handleIncomingRedirect` to authenticate
  //   //    the user if appropriate, or to restore a previous session.
  //   handleIncomingRedirect({
  //     restorePreviousSession: true
  //   }).then((info) => {
  //     var temp  = info;
  //     console.log(`Logged in with WebID [${info?.webId}]`)
  //   })
  // }, []);
}const sleep = (ms:number) => new Promise(r => setTimeout(r, ms));
const ProfileViewer =  () => {

  var temp;
  //handleIncomingRedirect({ restorePreviousSession : true });
  
  if (!getDefaultSession().info.isLoggedIn && false) {
     login({
      // Specify the URL of the user's Solid Identity Provider;
      // e.g., "https://login.inrupt.com".
      oidcIssuer: "https://inrupt.net",
      // Specify the URL the Solid Identity Provider should redirect the user once logged in,
      // e.g., the current page for a single-page app.
      redirectUrl: window.location.protocol + '//' + window.location.host + "/Login",
      // Provide a name for the application when sending to the Solid Identity Provider
      clientName: "My application"
    });
  }
  //const {session}  = useSession();
  //const session :Promise<Session>  =Test().finally( () => {return session});
  

  Test();
  console.log('2');
  const session = getDefaultSession();

 // const session = getSessionFromStorage(Cookies.get('accessToken'));
  return (
    <Container fixed>
      {session.info.webId ? (
        <CombinedDataProvider 
          datasetUrl={session.info.webId} 
          thingUrl={session.info.webId}>
        <Card style={{ maxWidth: 480 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <Text property={FOAF.name.iri.value} />
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", alignItems: "center" }}>
              <Text property={VCARD.organization_name.iri.value} />
            </Typography>
          </CardContent>

          <CardActionArea style={{ justifyContent: "center", display: "flex" }}>
            <Image property={VCARD.hasPhoto.iri.value} width={480} />
          </CardActionArea>
        </Card>
      </CombinedDataProvider>
      ): null }
      <LogoutButton >
        <Button style={{ marginTop: 20 }} variant="contained" color="primary">
          Logout
        </Button>
      </LogoutButton>
    </Container>
  );
}

export default ProfileViewer
