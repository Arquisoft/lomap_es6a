import { makeStyles, Theme } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, CardHeader, Container, Typography } from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    container: {
        display: 'flex', 
        flexWrap: 'wrap',
        width: '60%',
        height:'60%',
        marginTop:'10%',
        marginLeft:'30%',
        margin: `${theme.spacing(0)} auto`
      }
  })
);

function ErrorPod(): JSX.Element {
    const classes = useStyles();
    return (
        <form className={classes.container} noValidate autoComplete="on">
        <Container fixed>
          <Card className={classes.card}>
            <CardHeader className={classes.header} title="ERROR" />
                <CardContent>
                     <Typography gutterBottom variant="h5" component="h2">
                         " NO TODOS LOS DATOS DEL POD HAN SIDO PROPORCIONADO CAMBIELOS O USE OTRO POD"
                    </Typography>
                </CardContent>
            </Card>
        
        <Button style={{ marginTop: 20 }} variant="contained" color="secondary" href="/FormLogin" >
            Aceptar
        </Button>
      </Container>
      </form>
    );
  }

export default ErrorPod;