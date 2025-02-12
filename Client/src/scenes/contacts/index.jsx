import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  registrarId: yup.number().required("Required").integer(),
  name: yup.string().required("Required"),
  age: yup.number().required("Required").positive().integer(),
  phone: yup
    .string()
    .required("Required")
    .matches(/^[0-9]{10}$/, "Invalid phone number"),
  email: yup.string().required("Required").email("Invalid email"),
  address: yup.string().required("Required"),
  city: yup.string().required("Required"),
  zipCode: yup.string().required("Required"),
});

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const fetchContactsData = async () => {
    try {
      const response = await fetch("http://localhost:9000/getContacts"); //
      const data = await response.json();
      const formattedData = data.map((row) => ({
        ...row,
        id: row._id,
      }));
      setContacts(formattedData);
    } catch (error) {
      console.error("Failed to fetch contacts data:", error.message);
    }
  };

  const handleAdd = () => {
    setCurrentContact(null);
    setOpen(true);
  };

  const handleEdit = useCallback(
    (id) => {
      const contact = contacts.find((contact) => contact._id === id);
      setCurrentContact(contact);
      setOpen(true);
    },
    [contacts]
  );

  const handleDelete = useCallback(async (id) => {
    if (window.confirm("Do you want to delete this contact?")) {
      try {
        const response = await fetch(
          `http://localhost:9000/deleteContact/${id}`, //
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const error = await response.json();
          return alert(error.error);
        }
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact._id !== id)
        );
        alert("Contact deleted successfully.");
      } catch (error) {
        console.error("Failed to delete contact:", error.message);
      }
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    setCurrentContact(null);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    if (currentContact) {
      try {
        const response = await fetch(
          `http://localhost:9000/updateContact/${currentContact._id}`, //
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update contact");
        }

        const updatedContact = await response.json();
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact._id === currentContact._id ? updatedContact : contact
          )
        );

        alert("Contact updated successfully");
        window.location.reload(false);
      } catch (error) {
        console.error("Failed to update contact:", error.message);
        alert("Failed to update contact");
      }
    } else {
      try {
        const response = await fetch("http://localhost:9000/addContact", {
          //
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error("Failed to add contact");
        }

        const newContact = await response.json();
        setContacts((prevContacts) => [
          ...prevContacts,
          { ...newContact, id: newContact._id },
        ]);
        alert("Contact added successfully");
        window.location.reload(false);
      } catch (error) {
        console.error("Failed to add contact:", error.message);
        alert("Failed to add contact");
      }
    }

    handleClose();
    resetForm();
  };

  useEffect(() => {
    fetchContactsData();
  }, []);

  const columns = useMemo(
    () => [
      { field: "registrarId", headerName: "RegistrarID", flex: 0.55 },
      { field: "name", headerName: "Name", flex: 0.85 },
      { field: "age", headerName: "Age", flex: 0.5 },
      { field: "phone", headerName: "Phone", flex: 0.75 },
      { field: "email", headerName: "Email", flex: 1 },
      { field: "address", headerName: "Address", flex: 1 },
      { field: "city", headerName: "City", flex: 0.65 },
      { field: "zipCode", headerName: "Zip Code", flex: 0.5 },

      {
        field: "actions",
        headerName: "Actions",
        flex: 1,
        renderCell: (params) => (
          <>
            <Button
              variant="contained"
              onClick={() => handleEdit(params.row._id)}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "10px",
                fontWeight: "bold",
                padding: "7px 7px",
                margin: "3px",
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              onClick={() => handleDelete(params.row._id)}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "10px",
                fontWeight: "bold",
                padding: "7px 7px",
                margin: "3px",
              }}
            >
              Delete
            </Button>
          </>
        ),
      },
    ],
    [colors, handleEdit, handleDelete]
  );

  return (
    <Box m="10px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="CONTACTS"
          subtitle="List of Contacts for Future Reference"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          Add Contact
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={contacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id} // Use _id as the unique id for each row
        />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: "black",
            color: "#CECECE",
          },
        }}
      >
        <DialogTitle>
          {currentContact ? "Edit Contact" : "Add Contact"}
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={
              currentContact || {
                _id: "",
                registrarId: "",
                name: "",
                age: "",
                phone: "",
                email: "",
                address: "",
                city: "",
                zipCode: "",
              }
            }
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} style={{ width: "350px" }}>
                <div>
                  <label
                    htmlFor="registrarId"
                    style={{ fontSize: "1rem", justifyContent: "left" }}
                  >
                    RegistrarID
                  </label>
                  <Field
                    as={TextField}
                    id="registrarId"
                    name="registrarId"
                    placeholder="RegistrarId"
                    fullWidth
                    margin="normal"
                  />
                  <ErrorMessage
                    name="registratId"
                    component="div"
                    style={{ color: "tomato" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    style={{ fontSize: "1rem", justifyContent: "left" }}
                  >
                    Name
                  </label>
                  <Field
                    as={TextField}
                    id="name"
                    name="name"
                    placeholder="Name"
                    fullWidth
                    margin="normal"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    style={{ color: "tomato" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="age"
                    style={{ fontSize: "1rem", justifyContent: "left" }}
                  >
                    Age
                  </label>
                  <Field
                    as={TextField}
                    id="age"
                    name="age"
                    placeholder="Age"
                    fullWidth
                    margin="normal"
                  />
                  <ErrorMessage
                    name="age"
                    component="div"
                    style={{ color: "tomato" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    style={{ fontSize: "1rem", justifyContent: "left" }}
                  >
                    Phone
                  </label>
                  <Field
                    as={TextField}
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    fullWidth
                    margin="normal"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    style={{ color: "tomato" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    style={{ fontSize: "1rem", justifyContent: "left" }}
                  >
                    Email
                  </label>
                  <Field
                    as={TextField}
                    id="email"
                    name="email"
                    placeholder="Email"
                    fullWidth
                    margin="normal"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    style={{ color: "tomato" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    style={{ fontSize: "1rem", justifyContent: "left" }}
                  >
                    Address
                  </label>
                  <Field
                    as={TextField}
                    id="address"
                    name="address"
                    placeholder="Address"
                    fullWidth
                    margin="normal"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    style={{ color: "tomato" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    style={{ fontSize: "1rem", justifyContent: "left" }}
                  >
                    City
                  </label>
                  <Field
                    as={TextField}
                    id="city"
                    name="city"
                    placeholder="City"
                    fullWidth
                    margin="normal"
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    style={{ color: "tomato" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="zipCode"
                    style={{ fontSize: "1rem", justifyContent: "left" }}
                  >
                    Zip Code
                  </label>
                  <Field
                    as={TextField}
                    id="zipCode"
                    name="zipCode"
                    placeholder="Zip Code"
                    fullWidth
                    margin="normal"
                  />
                  <ErrorMessage
                    name="zipCode"
                    component="div"
                    style={{ color: "tomato" }}
                  />
                </div>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    type="button"
                    variant="contained"
                    color="error"
                    sx={{
                      backgroundColor: "#FF1744",
                      color: colors.grey[100],
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "7px 7px",
                      margin: "3px",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    sx={{
                      backgroundColor: "#4461ED",
                      color: "#BBB2B2",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "7px 7px",
                      margin: "3px",
                    }}
                  >
                    {currentContact ? "Update" : "Add"}
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Contacts;
