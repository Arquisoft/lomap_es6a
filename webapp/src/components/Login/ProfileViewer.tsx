import { useSession, CombinedDataProvider, Image, LogoutButton, Text } from "@inrupt/solid-ui-react";
import { Button, Card, CardActionArea, CardContent, CardHeader, Container, Typography } from "@material-ui/core";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import { SessionInfo } from "@inrupt/solid-ui-react/dist/src/hooks/useSession";
import { Session } from "@inrupt/solid-client-authn-browser";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import * as loginManager2  from "./LoginManager";
import { getUser } from "../../api/api";
let loginManager = require("./LoginManager.ts");


const useStyles = makeStyles((theme: Theme) =>
createStyles({
  container: {
    display: 'flex', 
    flexWrap: 'wrap',
    width: '60%',
    height:'60%',
    marginTop:'10%',
    marginLeft:'30%',
    margin: `${theme.spacing(0)} auto`
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
    left: '50%'
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


// const setUserSession = (session :Session) => {
//   localStorage.clear();
//   localStorage.setItem("userSession", JSON.stringify(session));
// };


// const getUserSession = (): Session => {
//   const session = localStorage.getItem("userSession");
//   return session ? JSON.parse(session) : null;
// };




const ProfileViewer = () => {
  const classes = useStyles();
  
  var temp = useSession().session;
  //const { session } = useSession();
  
   var cond = temp.info.isLoggedIn
if (loginManager.getUserSession() == null || cond ){
  loginManager.setUserSession(temp);
}

//const  session  = loginManager.getUserSession(window.location.protocol + '//' + window.location.host + "/ProfileViewer");
 const  session  = loginManager.getUserSession();
 const { webId } = session.info;

 function guardarWebId() {
   sessionStorage.setItem('webIdSesion', webId as string);
   const w = sessionStorage.getItem('webIdSesion');
 }
  return (
    <>
    <form className={classes.container} noValidate autoComplete="on">
      { sessionStorage.getItem('address') === "NEGATIVO" ? (
          window.location.href = window.location.protocol + '//' + window.location.host + '/ErrorPod'
        ) : (
              [
                <Container fixed>
                  {session.info.webId ? (
                    <CombinedDataProvider
                      datasetUrl={session.info.webId}
                      thingUrl={session.info.webId}>
                      <Card className={classes.card}>
                        <CardHeader className={classes.header} title="User" />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            <Text property={FOAF.name.iri.value} />
                          </Typography>
                        </CardContent>
                        <CardActionArea style={{ justifyContent: "center", display: "flex" }}>
                        </CardActionArea>
                      </Card>
                    </CombinedDataProvider>
                  ) : null}
                  <LogoutButton>
                    <Button style={{ marginTop: 20 }} variant="contained" color="primary" href="/LoginForm">
                      Logout
                    </Button>
                  </LogoutButton>
                </Container>
              ]
        )
      }
    </form>
    </>
  ); 
}

export default ProfileViewer;
