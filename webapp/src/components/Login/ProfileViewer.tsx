import { useSession, CombinedDataProvider, Image, LogoutButton, Text } from "@inrupt/solid-ui-react";
import { Button, Card, CardContent, CardHeader, CardActionArea ,Container, FormGroup, Link, TextField, Typography } from "@mui/material";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex', 
      flexWrap: 'wrap',
      width: '60%',
      height:'30%',
      marginLeft:'30%',
      marginBottom: '23%'
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    margen:{
      margin: '-25px 0 0 -25px',
      marginRight:'30%',
      marginTop: theme.spacing(20),
      display: 'flex',
      justifyContent:'center',
      position: 'absolute',
      top: '50%',
      left: '50%',
      
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10),
      width: '70%',
      height:''
    },
  })
);

const ProfileViewer = () => {
  const { session } = useSession();
  const { webId } = session.info;
  const classes = useStyles();

  return (
    <>
    <form className={classes.container} noValidate autoComplete="on">
      <Card className={classes.card}>
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
              <Button className={classes.loginBtn} variant="contained" color="primary" href="/LoginForm">
                Logout
              </Button>
            </LogoutButton>
          </Container>
      </Card>
    </form>
    </> 
  );  
}

export default ProfileViewer
