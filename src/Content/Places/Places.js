import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {
  Container,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { useQuery, gql } from "@apollo/client";

const ALL_PLACES = gql`
  query {
    allPlaces {
      id
      name
      description
    }
  }
`;

function Places() {
  const useStyles = makeStyles(() => ({
    root: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    card: {
      width: 345,
      margin: 20,
    },
    content: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    typeWidth: {
      width: "100%",
    },
    title: {
      margin: "auto",
      color: "white",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: "1rem",
      width: "25%",
      justifySelf: "center",
    },
  }));

  const classes = useStyles();

  const { loading, error, data } = useQuery(ALL_PLACES);

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return <Typography>{`${error.message}`}</Typography>;
  }

  const placesList = data.allPlaces;

  return (
    <div className="app">
      <div className={"main-container"}>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h1"
        >
          Zelda Places
        </Typography>
        <Container className={classes.root}>
          {placesList.map((place) => {
            return (
              <Card className={classes.card} key={place.id}>
                <CardMedia
                  component="img"
                  height="300"
                  className={classes.media}
                  image="https://gamingbolt.com/wp-content/uploads/2017/01/the-legend-of-zelda-breath-of-the-wild-1-2.jpg"
                  title={place.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {place.name}
                  </Typography>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Description</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" color="textSecondary">
                        {place.description}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </Container>
      </div>{" "}
    </div>
  );
}

export default Places;
