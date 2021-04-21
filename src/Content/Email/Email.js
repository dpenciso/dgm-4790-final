import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik } from "formik";
import * as Yup from "yup";
import { SignContext } from "../../Contexts/signContext"
import './Email.css'

export default function Email() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const signContext = useContext(SignContext)

  return (
    <div>
      <Button variant="outlined" className="subscribeButton" color="inherit" onClick={handleClickOpen}>
        Subscribe
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Subscribe to our Email List
        </DialogTitle>
        <Formik
          initial
          initialValues={{
            email: "",
            firstName: "",
            lastName: "",
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email")
              .max(50)
              .required("Email is required"),
            firstName: Yup.string()
              .required("First Name is required")
              .min(2, "Must be at least 2 characters")
              .max(50, "Must be less than 50 characters"),
            lastName: Yup.string()
              .required("Last Name is required")
              .min(2, "Must be at least 2 characters")
              .max(50, "Must be less than 50 characters"),
          })}
          onSubmit={ (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              signContext.login()
              console.log(`${values.email}, ${values.firstName} ${values.lastName} has successfully subscribed!`);
            } catch (err) {
              console.log(err);
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
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <DialogContentText>
                  To subscribe to this website, please enter your first name,
                  last name, and email address here. We will send updates
                  occasionally.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  name="firstName"
                  label="First Name"
                  type="name"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  required
                />
                <TextField
                  margin="dense"
                  name="lastName"
                  label="Last Name"
                  type="name"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  required
                />
                <TextField
                  margin="dense"
                  name="email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  required
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  color="primary"
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleClose}
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={Boolean(
                    errors.email || errors.firstName || errors.lastName
                  )}
                >
                  Subscribe
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
