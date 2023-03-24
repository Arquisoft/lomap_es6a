import { useSession, CombinedDataProvider, Image, LogoutButton, Text } from "@inrupt/solid-ui-react";
import { Button, Card, CardActionArea, CardContent, Container, Typography } from "@material-ui/core";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import { SessionInfo } from "@inrupt/solid-ui-react/dist/src/hooks/useSession";
import { Session } from "@inrupt/solid-client-authn-browser";

const setUserSession = (session :Session) => {
  localStorage.clear();
  localStorage.setItem("userSession", JSON.stringify(session));
};


const getUserSession = (): Session => {
  const session = localStorage.getItem("userSession");
  return session ? JSON.parse(session) : null;
};



const ProfileViewer = () => {

  var temp = useSession().session;
  //const { session } = useSession();
   var cond = useSession().session.info.isLoggedIn
if (getUserSession() == null || cond ){
  setUserSession(temp);
}

 const  session  = getUserSession();
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
