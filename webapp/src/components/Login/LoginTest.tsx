import {
    CombinedDataProvider,
    Image,
    LogoutButton,
    SessionContext,
    Text,
    useSession,
  } from "@inrupt/solid-ui-react";
  import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    Container,
    FormGroup,
    TextField,
    Typography,
  } from "@material-ui/core";
  import React, { useContext, useEffect, useRef, useState } from "react";
  import LoginTest from './LoginTest';

  const ProfileViewer = () => {
    const { session } = useSession();
    const [profile, setProfile] = useState<any>({});
  
    // This useEffect hook runs when the session object is updated
    useEffect(() => {
      // If the session object contains an access token
      if (session.info.isLoggedIn ) {
        // Store the access token in localStorage
        localStorage.setItem("solid-auth-token", session.info.sessionId);
      }
    }, [session]);
  
    return (
      <>
        <Container>
          <Typography variant="h3">Profile Viewer</Typography>
          <CombinedDataProvider
            datasetUrl={`${session.info.sessionId}/profile/card`}
            thingUrl={session.info.sessionId}
          >
            <ProfileHeader />
            <ProfileDetails />
          </CombinedDataProvider>
        </Container>
      </>
    );
  };
  
  const ProfileHeader = () => {
    const { session } = useSession();
    const profile = useContext(SessionContext).fetch;
  
    return (
      <header>
       
        <Typography variant="h4">{profile.name}</Typography>
        <Typography variant="h5">{session.info.webId}</Typography>
        <LogoutButton />
      </header>
    );
  };
  
  const ProfileDetails = () => {
    const { session } = useSession();
    const profile = useContext(SessionContext).fetch;
  
    return (
      <section>
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Profile Details
              </Typography>
              <FormGroup>
                <TextField
                  disabled
                  id="webid"
                  label="WebID"
                  value={session.info.webId}
                  fullWidth
                />
                <TextField
                  disabled
                  id="name"
                  label="Name"
                  value={profile.name}
                  fullWidth
                />
              </FormGroup>
            </CardContent>
          </CardActionArea>
        </Card>
      </section>
    );
  };
  
  export default ProfileViewer;
  