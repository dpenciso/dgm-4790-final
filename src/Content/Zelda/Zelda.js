import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./Zelda.css";
// import LazyLoad from "react-lazyload";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Container,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Formik } from "formik";
import * as Yup from "yup";
import { useQuery, useMutation, gql } from "@apollo/client";

const ALL_CHARACTERS = gql`
  query {
    allCharacters {
      id
      name
      description
      race
      gender
    }
  }
`;

const UPDATE_CHARACTER = gql`
  mutation updateCharacter(
    $id: Int!
    $name: String!
    $description: String!
    $gender: String
    $race: String
  ) {
    updateCharacter(
      id: $id
      data: {
        name: $name
        description: $description
        gender: $gender
        race: $race
      }
    ) {
      id
    }
  }
`;

const DELETE_CHARACTER = gql`
  mutation deleteCharacter($id: Int!) {
    deleteCharacter(id: $id) {
      id
    }
  }
`;

function Zelda() {
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
  }));

  const classes = useStyles();

  const [updateCharacter] = useMutation(UPDATE_CHARACTER);
  const [deleteCharacter] = useMutation(DELETE_CHARACTER);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState({ name: "" });
  const { loading, error, data } = useQuery(ALL_CHARACTERS);

  const handleClickEditOpen = (character) => {
    setSelectedCharacter(character.character);
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
  };

  const handleClickDeleteOpen = (character) => {
    setSelectedCharacter(character.character);
    setDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
  };

  const handleUpdate = async (values) => {
    console.log("here");
    updateCharacter({
      variables: {
        id: selectedCharacter.id,
        name: values.name,
        description: values.description,
        gender: values.gender,
        race: values.race,
      },
    });
    console.log(`worked`);
  };

  const handleDelete = async () => {
    setDeleteOpen(false);
    console.log(selectedCharacter.id);
    try {
      deleteCharacter({ variables: { id: selectedCharacter.id } });
    } catch (err) {
      console.error(err);
    }
  };

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

  const characterList = data.allCharacters;
  console.log(characterList);

  return (
    <div className="app">
      <Container className={classes.root}>
        {characterList.map((character) => {
          return (
            <Card className={classes.card} key={character.id}>
              <CardMedia
                component="img"
                height="300"
                className={classes.media}
                image="https://www.pngitem.com/pimgs/m/83-831568_the-legend-of-zelda-png-download-zelda-logo.png"
                title={character.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {character.name}
                </Typography>
                <Box className={classes.content}>
                  <Typography variant="subtitle1" color="textSecondary">
                    Race: {character.race}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Gender: {character.gender}
                  </Typography>
                </Box>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Description</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="textSecondary">
                      {character.description}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
              <CardActions>
                <IconButton
                  aria-label="edit"
                  onClick={() => handleClickEditOpen({ character })}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleClickDeleteOpen({ character })}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
      </Container>
      <Dialog
        open={editOpen}
        onClose={handleCloseEdit}
        aria-labelledby="edit-dialog-title"
      >
        <Formik
          enableReinitialize
          initialValues={{
            name: selectedCharacter?.name,
            description: selectedCharacter?.description,
            gender: selectedCharacter?.gender,
            race: selectedCharacter?.race,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string("Enter character name.").required(
              "Name is required"
            ),
            description: Yup.string("Description"),
            gender: Yup.string("Gender"),
            race: Yup.string("Race"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              console.log("worked");
              await handleUpdate(values);
              handleCloseEdit();
            } catch (err) {
              console.error(err);
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              className={classes.dialogContent}
            >
              <DialogTitle id="edit-dialog-title">Edit Character</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Make changes below to the information about this character:
                </DialogContentText>
                <TextField
                  autoFocus
                  id="name"
                  name="name"
                  label="Character Name"
                  type="text"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                <Box className={classes.content}>
                  <TextField
                    autoFocus
                    id="gender"
                    name="gender"
                    label="Gender"
                    type="text"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.gender && errors.gender)}
                    helperText={touched.gender && errors.gender}
                  />
                  <TextField
                    autoFocus
                    name="race"
                    id="race"
                    label="Race"
                    type="text"
                    value={values.race}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.race && errors.race)}
                    helperText={touched.race && errors.race}
                  />
                </Box>
                <TextField
                  autoFocus
                  id="description"
                  name="description"
                  label="Character Description"
                  type="text"
                  fullWidth
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEdit} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Save
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
      <Dialog open={deleteOpen} onClose={handleCloseDelete}>
        <DialogTitle>Delete Character</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the character{" "}
            {selectedCharacter?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Zelda;
