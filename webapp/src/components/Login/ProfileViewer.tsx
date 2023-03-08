
import {Image, LogoutButton,Text,CombinedDataProvider, useSession, SessionProvider, LoginButton } from "@inrupt/solid-ui-react";
import { Container, FormGroup, TextField, Button, Typography, CardContent, Card, CardActionArea} from "@material-ui/core"
import React, { useEffect,useRef,useState } from 'react';
import{FOAF,VCARD} from '@inrupt/lit-generated-vocab-common';

const ProfileViewer = () => {
    const { session } = useSession();
    const { webId } = session.info;
  
    return (
      <Container fixed>
        {webId?(<CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
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
        ):null}
        
        <LogoutButton >
          <Button style={{ marginTop: 20 }} variant="contained" color="primary">
            Logout
          </Button>
        </LogoutButton>
      </Container>
    );
  }

  export default ProfileViewer;