import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "./amiibo.css";
import LazyLoad from "react-lazyload";
import {
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Formik } from "formik";
import * as Yup from "yup";
import _ from 'lodash'

function Amiibo() {
  const [amiibos, setAmiibos] = useState([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedAmiibo, setSelectedAmiibo] = useState({ name: "" });
  const [editOpen, setEditOpen] = useState(false);
  const [postAmiibo, setPostAmiibo] = useState({ name: "", game: "", image: "", id: "", release: "" });
  const [debouncedName, setDebouncedName] = useState('')
  const apiURL = "https://dgm-4790-server.herokuapp.com/amiibo";

  const fetchData = async () => {
    const response = await axios.get(apiURL);
    setAmiibos(response.data);
  };

  const handleInput = (event) => {
    debounce(event.target.value)
  }

  const debounce = useCallback(
    _.debounce((searchVal) => {
      setDebouncedName(searchVal)
    }, 1000),
    [],
  )

  const handleSearch = () => {
    if (debouncedName) {
      setAmiibos(amiibos.filter(amiibo => amiibo.name.toLowerCase().includes(debouncedName.toLowerCase())))
    } else {
      fetchData()
    }
  }

  const handleClickEditOpen = (amiibo) => {
    setSelectedAmiibo(amiibo);
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
  };

  const handleUpdate = async (values) => {
    console.log(selectedAmiibo._id);
    try {
      console.log("working");
      const result = await axios.put(`${apiURL}/update`, {
        data: {
          name: values.name,
          game: values.game,
          release: values.release,
          amiiboId: selectedAmiibo._id,
        },
      });
      console.log(result);
      if (result.status === 200) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostNewAmiibo = async () => {
    setPostAmiibo()
    try {
      await axios.post(`${apiURL}/`, {
        name: postAmiibo.name,
        game: postAmiibo.game,
        image: postAmiibo.image,
        id: postAmiibo.id,
        release: postAmiibo.release,
      });
    } catch (error) {
      console.log(error);
    }
    fetchData();
  };

  const handleClickDeleteOpen = (amiibo) => {
    setSelectedAmiibo(amiibo);
    console.log(amiibo);
    setDeleteOpen(true);
  };

  const handleCloseDelete = async () => {
    setDeleteOpen(false);
  };

  const handleDelete = async () => {
    setDeleteOpen(false);
    console.log(selectedAmiibo._id);
    try {
      await axios.delete(`${apiURL}/delete`, {
        data: {
          amiiboId: selectedAmiibo._id,
        },
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
    console.log(selectedAmiibo._id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const useStyles = makeStyles({
    root: {
      maxWidth: 250,
      margin: "1rem",
    },
    media: {
      height: 400,
    },
  });

  const classes = useStyles();

  return (
    <div className="app">
      <form className="searchInput">
        <TextField placeholder="Search" onChange={handleInput} />
        <IconButton aria-label="search" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </form>

      <Formik
        initialValues={{
          name: " ",
          game: " ",
          image: " ",
          id: " ",
          release: " ",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string("Enter Amiibo name.").required("Name is required"),
          game: Yup.string("Amiibo game"),
          image: Yup.string("Image"),
          id: Yup.string("ID").required("ID is required"),
          release: Yup.string("Release date"),
        })}
        onSubmit={async ({ setErrors, setStatus, setSubmitting }) => {
          try {
            await handlePostNewAmiibo();
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
            <h3>Fill in the information to create your new Amiibo:</h3>
            <div>
              {" "}
              <TextField
                autoFocus
                id="name"
                name="name"
                label="Amiibo Name"
                type="text"
                style={{ margin: "1rem" }}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                autoFocus
                id="game"
                name="game"
                label="Game Series"
                type="text"
                style={{ margin: "1rem" }}
                value={values.game}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.game && errors.game)}
                helperText={touched.game && errors.game}
              />
              <TextField
                autoFocus
                id="image"
                name="image"
                label="Image"
                type="text"
                style={{ margin: "1rem" }}
                value={values.image}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.image && errors.image)}
                helperText={touched.image && errors.image}
              />
              <TextField
                autoFocus
                id="id"
                name="id"
                label="ID"
                type="text"
                style={{ margin: "1rem" }}
                value={values.id}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.id && errors.id)}
                helperText={touched.id && errors.id}
              />
              <TextField
                autoFocus
                name="release"
                id="release"
                label="Release Date"
                type="text"
                style={{ margin: "1rem" }}
                value={values.release}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.release && errors.release)}
                helperText={touched.release && errors.release}
              />
            </div>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{ margin: "1rem" }}
            >
              Create Amiibo
            </Button>
          </form>
        )}
      </Formik>
      <div className="container-container">
        {amiibos &&
          amiibos.map((amiibo) => {
            return (
              <div className="cards-container" key={amiibo.tail}>
                <Card className={classes.root}>
                  <CardActionArea
                    onClick={() => window.open(amiibo.image, "_blank")}
                  >
                    <LazyLoad offset={100}>
                      <CardMedia
                        className={classes.media}
                        image={amiibo.image}
                        title={amiibo.name}
                      />
                    </LazyLoad>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {amiibo.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        The {amiibo.name} Amiibo, from the {amiibo.game} series,
                        was originally released in North America on{" "}
                        {amiibo.release}.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleClickEditOpen(amiibo)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleClickDeleteOpen(amiibo)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </div>
            );
          })}
      </div>
      <Dialog
        open={editOpen}
        onClose={handleCloseEdit}
        aria-labelledby="edit-dialog-title"
      >
        <Formik
          initialValues={{
            name: selectedAmiibo?.name,
            game: selectedAmiibo?.game,
            release: selectedAmiibo?.release,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string("Enter Amiibo name.").required("Name is required"),
            game: Yup.string("Amiibo game"),
            release: Yup.string("Release date"),
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
              <DialogTitle id="edit-dialog-title">Edit Amiibo</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Make changes below to the data about this Amiibo:
                </DialogContentText>
                <TextField
                  autoFocus
                  id="name"
                  name="name"
                  label="Amiibo Name"
                  type="text"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  autoFocus
                  id="game"
                  name="game"
                  label="Game Series"
                  type="text"
                  fullWidth
                  value={values.game}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.game && errors.game)}
                  helperText={touched.game && errors.game}
                />
                <TextField
                  autoFocus
                  name="release"
                  id="release"
                  label="Release Date"
                  type="text"
                  fullWidth
                  value={values.release}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.release && errors.release)}
                  helperText={touched.release && errors.release}
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
        <DialogTitle>Delete Amiibo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Amiibo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Amiibo;
