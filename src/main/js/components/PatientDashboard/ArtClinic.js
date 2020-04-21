import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Table } from 'reactstrap';
import {FaPencilAlt, FaTrashAlt} from 'react-icons/fa';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabsWrappedLabel() {
  const classes = useStyles();
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
          <Tab
            value="one"
            label="ART Clinic Visit"
            wrapped
            {...a11yProps('one')}
          />
          <Tab value="two" label="Child Follow Up" {...a11yProps('two')} />
          <Tab value="three" label="ANC/PNC Visits" {...a11yProps('three')} />
          <Tab value="four" label="Labour/Delivery" {...a11yProps('four')} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="one">
            <Table striped>
            <thead>
                <tr>
                <th>#</th>
                <th>Date of Visit</th>
                <th>Clinic Stage</th>
                <th>Functional Status</th>
                <th>TB Status</th>
                <th>Next Clinic Visit</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>01/02/2020</td>
                <td>Stage 1</td>
                <td>Working</td>
                <td>No Sign of TB</td>
                <td>02/03/2020</td>
                <td><FaPencilAlt />{ ' ' }<FaTrashAlt /></td>
                </tr>
                <tr>
                <th scope="row">1</th>
                <td>01/02/2020</td>
                <td>Stage 1</td>
                <td>Working</td>
                <td>No Sign of TB</td>
                <td>02/03/2020</td>
                <td><FaPencilAlt />{ ' ' }<FaTrashAlt /></td>
                </tr>
                <tr>
                <th scope="row">1</th>
                <td>01/02/2020</td>
                <td>Stage 1</td>
                <td>Working</td>
                <td>No Sign of TB</td>
                <td>02/03/2020</td>
                <td><FaPencilAlt />{ ' ' }<FaTrashAlt /></td>
                </tr>
            </tbody>
            </Table>
      </TabPanel>
      <TabPanel value={value} index="two">
      <Table striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Date of Visit</th>
                    <th>Feeding At Present</th>
                    <th>Outcome</th>
                    <th>Rapid Test Result</th>
                    <th>On Contrim</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>01/02/2020</td>
                <td>Yes</td>
                <td> -- </td>
                <td> -- </td>
                <td>Yes</td>
                <td><FaPencilAlt />{ ' ' }<FaTrashAlt /></td>
                </tr>
                
            </tbody>
            </Table>
      </TabPanel>
      <TabPanel value={value} index="three">
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date of Visit</th>
                        <th>CD4 Count </th>
                        <th>Partner's HIV Status</th>
                        <th>Symphills Test Result</th>
                        <th>Family Planning Method</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>01/02/2020</td>
                    <td>22</td>
                    <td> Positive </td>
                    <td> Negative </td>
                    <td>Condom</td>
                    <td><FaPencilAlt />{ ' ' }<FaTrashAlt /></td>
                    </tr>
                    
                </tbody>
            </Table>
      </TabPanel><TabPanel value={value} index="four">
      <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date of Visit</th>
                        <th>Made of Delivery </th>
                        <th>Material Outcome</th>                       
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>01/02/2020</td>
                    <td>CS</td>
                    <td> Positive </td>                    
                    <td><FaPencilAlt />{ ' ' }<FaTrashAlt /></td>
                    </tr>
                    
                </tbody>
            </Table>
      </TabPanel>
      
    </div>
  );
}
