import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  cost: yup.number().required("Cost is required").positive(),
  phone: yup.number().required("Phone number is required"),
  dueDate: yup.date().required("Date is required"),
});

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [invoices, setInvoices] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);

  useEffect(() => {
    // Fetch invoices data
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch("http://localhost:9000/getInvoices");
      const data = await response.json();
      // Ensure the _id is used as the id for each row
      const formattedData = data.map((row) => ({
        ...row,
        id: row._id,
      }));
      setInvoices(formattedData);
    } catch (error) {
      console.error("Failed to fetch invoices:", error.message);
    }
  };

  const handleAdd = () => {
    setCurrentInvoice(null);
    setOpen(true);
  };

  const handleEdit = (id) => {
    const invoice = invoices.find((invoice) => invoice._id === id);
    setCurrentInvoice(invoice);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentInvoice(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Do you want to delete this invoice?")) {
      try {
        const response = await fetch(
          `http://localhost:9000/deleteInvoice/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const error = await response.json();
          return alert(error.error);
        }
        setInvoices((prevInvoices) =>
          prevInvoices.filter((invoice) => invoice._id !== id)
        );
        alert("Invoice deleted successfully.");
      } catch (error) {
        console.error("Failed to delete invoice:", error.message);
      }
    }
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    if (currentInvoice) {
      try {
        const response = await fetch(
          `http://localhost:9000/updateInvoice/${currentInvoice._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update invoice");
        }

        const updatedInvoice = await response.json();
        setInvoices((prevInvoices) =>
          prevInvoices.map((invoice) =>
            invoice._id === currentInvoice._id ? updatedInvoice : invoice
          )
        );

        alert("Invoice updated successfully");
        window.location.reload(false);
      } catch (error) {
        console.error("Failed to update invoice:", error.message);
        alert("Failed to update invoice");
      }
    } else {
      try {
        const response = await fetch("http://localhost:9000/addInvoice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error("Failed to add invoice");
        }

        const newInvoice = await response.json();
        setInvoices((prevInvoices) => [
          ...prevInvoices,
          { ...newInvoice, id: newInvoice._id },
        ]);
        alert("Invoice added successfully");
        window.location.reload(false);
      } catch (error) {
        console.error("Failed to add invoice:", error.message);
        alert("Failed to add invoice");
      }
    }

    handleClose();
    resetForm();
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 0.4 },
    { field: "phone", headerName: "Phone Number", flex: 0.3 },
    { field: "email", headerName: "Email", flex: 0.5 },
    {
      field: "cost",
      headerName: "Cost",
      flex: 0.3,
      minWidth: 100,
      renderCell: ({ row: { cost } }) => (
        <Typography color={colors.greenAccent[500]}>${cost}</Typography>
      ),
    },
    { field: "dueDate", headerName: "Due Date", flex: 0.3, minWidth: 100 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
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
  ];

  return (
    <Box m="10px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="INVOICES" subtitle="List of Invoice Balances" />
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
          Add Invoice
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
          rows={invoices}
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
          {currentInvoice ? "Edit Invoice" : "Add Invoice"}
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={
              currentInvoice || {
                _id: "",
                name: "",
                email: "",
                cost: "",
                phone: "",
                dueDate: "",
              }
            }
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} style={{ width: "350px" }}>
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
                    htmlFor="cost"
                    style={{ fontSize: "1rem", justifyContent: "left" }}
                  >
                    Cost
                  </label>
                  <Field
                    as={TextField}
                    id="cost"
                    name="cost"
                    placeholder="Cost"
                    fullWidth
                    margin="normal"
                  />
                  <ErrorMessage
                    name="cost"
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
                    htmlFor="dueDate"
                    style={{ fontSize: "1rem", justifyContent: "left" }}
                  >
                    Due Date
                  </label>
                  <Field
                    as={TextField}
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    placeholder="Due Date"
                    fullWidth
                    margin="normal"
                  />
                  <ErrorMessage
                    name="dueDate"
                    component="div"
                    style={{ color: "tomato" }}
                  />
                </div>
                <DialogActions>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={handleClose}
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
                    {currentInvoice ? "Update" : "Add"}
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

export default Invoices;
