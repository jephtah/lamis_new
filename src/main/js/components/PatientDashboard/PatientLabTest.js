import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FaVials } from 'react-icons/fa';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

export default function PatientLabTest(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
        <Card className={classes.cardroot} style={props.height} >
                <CardContent>
                <Typography className={classes.title} color="primary" gutterBottom>
                        Recent Lab Test
                        </Typography>
                    <List component="nav" className={classes.root} aria-label="contacts">
                        <ListItem button>
                            <ListItemIcon>
                                <FaVials />
                            </ListItemIcon>
                            <ListItemText primary="03/03/2020 AFB(Stem) Positive" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <FaVials />
                            </ListItemIcon>
                            <ListItemText  primary="03/03/2020 AFB(Stem) Positive" />
                        </ListItem>
                    </List>  
                       
                </CardContent>                      
        </Card>                     
</div>
    
  );
}