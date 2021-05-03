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

const ALL_BOSSES = gql`
  query {
    allBosses {
      id
      name
      description
    }
  }
`;

function Bosses() {
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
      margin: "1rem",
    },
  }));

  const classes = useStyles();

  const { loading, error, data } = useQuery(ALL_BOSSES);

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

  const bosssesList = data.allBosses;

  return (
    <div className="app">
      {" "}
      <div className={"main-container"}>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h1"
        >
          Zelda Bosses
        </Typography>
        <Container className={classes.root}>
          {bosssesList.map((boss) => {
            return (
              <Card className={classes.card} key={boss.id}>
                <CardMedia
                  component="img"
                  height="300"
                  className={classes.media}
                  image="https://i.redd.it/uzfyn2622q731.jpg"
                  title={boss.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {boss.name}
                  </Typography>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Description</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" color="textSecondary">
                        {boss.description}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </Container>
      </div>
    </div>
  );
}

export default Bosses;
