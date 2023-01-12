import React, {useState, useEffect} from 'react';
import './App.css';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { getServerTime, getServerMetrics } from "./services/api/data";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import DnsIcon from "@mui/icons-material/Dns";
import PublicIcon from "@mui/icons-material/Public";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { Typography } from "@mui/material";

import {timeDifference} from './util/util';

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor:"#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: 'black',
  }));
  

function App() {

  const [serverTime, setServerTime] = useState(0);
   const [clientTime, setClientTime] = useState(0);
   const [timeDiff, setTimeDifference] = useState('00:00:00');
   const [metricsData, setMetricsData] = useState<string | null>(null)
   const [serverLoading, setServerLoading] = useState(true)
   const [metricsLoading, setMetricsLoading] = useState(true)
   
  

  

  useEffect(() => {
      const interval = setInterval(() => {
          getEpochSeconds();
          getMetrics();
      }, 20000);
      return () => clearInterval(interval);
  }, [])

  const getEpochSeconds = async () => {
      const epochSeconds = await getServerTime();
      setServerTime(epochSeconds);
      setServerLoading(false)
      const now = new Date();
      const clientEpochSeconds = Math.round(now.getTime() / 1000);
      setClientTime(clientEpochSeconds);

      const getDiff = timeDifference(clientEpochSeconds, epochSeconds);
      setTimeDifference(getDiff);


  };

  const getMetrics = async() => {
    const data = await getServerMetrics();
    setMetricsData(`${data}`);
    setMetricsLoading(false)
  }

 

  return (
    <Box sx={{ flexGrow: 1 }}>
      {serverLoading && metricsLoading ? (
        <Backdrop
          sx={{
            color: "#fff",
            backgroundColor: "teal",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={serverLoading && metricsLoading}
        >
          <CircularProgress color="inherit" /> Connex One
        </Backdrop>
      ) : (
        <Grid
          container
          spacing={2}
          sx={{
            color: "white",
            backgroundColor: "teal",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Grid xs={6} md={4}>
            {serverLoading ? (
              <CircularProgress color="success" />
            ) : (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "teal",
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <DnsIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    color="white"
                    primary="Server time"
                    secondary={serverTime}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PublicIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    color="white"
                    primary="Client Time"
                    secondary={clientTime}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <HourglassTopIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    color="white"
                    primary="Time Difference"
                    secondary={timeDiff}
                  />
                </ListItem>
              </List>
            )}
          </Grid>
          <Grid xs={6} md={8}>
            {metricsLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
              
                <Item>{metricsData}</Item>
              </>
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default App;
