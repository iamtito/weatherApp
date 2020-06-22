import React from 'react';
import classes from './Conditions.module.css'
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    atmospheric: {
      fontSize: "28px",
      padding: "5px"
    },
    buttons: {
      color: "black"
    },
    card: {
      width: "20%",
      marginBottom: "5%",
      padding: "20px",
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    error: {
      color: "red",
      padding: "10px"
    },
    fullList: {
      width: "auto"
    },
    layout: {
      marginTop: "20px"
    },
  
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    recommendation: {
      fontFamily: "Montserrat, sans-serif",
      padding: "20px 0px 10px 0px",
      fontSize: "26px",
      textAlign: "center"
    },
    root: {
      flexiGrow: 1,
      color: "black"
    },
    search: {
      marginTop: "100px"
    },
    wi: {
      color: "#673ab7"
    }
  }));

const conditions = (props) => {
    const humidity = "wi wi-humidity";
    const strongWind = "wi wi-strong-wind";
    return (
    <div className={classes.Wrapper}>
        {props.error && <small>Please enter a valid city.</small>}
        {props.loading && <div className={classes.Loader} />}
       
           {props.responseObj.cod === 200 ?
               <div>
                   
                    <Card className={classes.card}>
                        <CardHeader
                            title={props.responseObj.name + ", " + props.responseObj.sys.country}
                            subheader={props.responseObj.weather[0].description}
                        />
                        <CardContent>
                            {/* <CardMedia
                            className={`${icon} ${classes.wi}`}
                            src={icon}
                            style={{ fontSize: "128px", float: "right" }}
                            /> */}
                            <Typography
                            variant="h2"
                            className="big-temp"
                            color="textPrimary"
                            component="h2"
                            style={{ fontFamily: "Montserrat", paddingTop: "30px" }}
                            >
                            {Math.round(props.responseObj.main.temp)}&deg;
                            </Typography>
                            <Typography
                            variant="subtitle2"
                            className="atmospheric-conditions"
                            color="textSecondary"
                            gutterBottom
                            style={{ paddingTop: "40px" }}
                            >
                            <span
                                className={`${strongWind} ${classes.wi} ${classes.atmospheric}`}
                            ></span>
                            {props.responseObj.wind.speed} km/h Winds{" "}
                            <span
                                className={`${humidity} ${classes.wi} ${classes.atmospheric}`}
                            ></span>
                            {props.responseObj.main.humidity}% Humidity
                            </Typography>
                            <Divider variant="middle" />
                            <p>It is currently {props.responseObj.weather[0].description} in {props.responseObj.name}.</p>
                        </CardContent>
                    </Card>


                   {/*  */}
               </div>
           : null
           }
    </div>
   )
}

export default conditions;