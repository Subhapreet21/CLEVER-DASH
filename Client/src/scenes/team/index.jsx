import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Header from "../../components/Header";

const validationSchema = yup.object().shape({
  name: yup.string().required("Required"),
  age: yup.number().required("Required").positive().integer(),
  phone: yup
    .string()
    .required("Required")
    .matches(/^[0-9]{10}$/, "Invalid phone number"),
  email: yup.string().required("Required").email("Invalid email"),
  accessLevel: yup.string().required("Required"),
});

const Team = () => {
  const [team, setTeam] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const fetchTeamData = async () => {
    try {
      const response = await fetch("http://localhost:9000/getMembers");
      const data = await response.json();
      const formattedData = data.map((row) => ({
        ...row,
        id: row._id,
      }));
      setTeam(formattedData);
    } catch (error) {
      console.error("Failed to fetch team data:", error.message);
    }
  };

  const handleAdd = () => {
    setCurrentMember(null);
    setOpen(true);
  };

  const handleEdit = useCallback(
    (id) => {
      const member = team.find((member) => member._id === id);
      setCurrentMember(member);
      setOpen(true);
    },
    [team]
  );

  const handleDelete = useCallback(async (id) => {
    if (window.confirm("Do you want to delete this member?")) {
      try {
        const response = await fetch(
          `http://localhost:9000/deleteMember/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const error = await response.json();
          return alert(error.error);
        }
        setTeam((prevTeam) => prevTeam.filter((member) => member._id !== id));
        alert("Member deleted successfully.");
      } catch (error) {
        console.error("Failed to delete member:", error.message);
      }
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    setCurrentMember(null);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    if (currentMember) {
      try {
        const response = await fetch(
          `http://localhost:9000/updateMember/${currentMember._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update member");
        }

        const updatedMember = await response.json();
        setTeam((prevTeam) =>
          prevTeam.map((member) =>
            member._id === currentMember._id ? updatedMember : member
          )
        );

        alert("Member updated successfully");
        window.location.reload(false);
      } catch (error) {
        console.error("Failed to update member:", error.message);
        alert("Failed to update member");
      }
    } else {
      try {
        const response = await fetch("http://localhost:9000/addMember", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error("Failed to add member");
        }

        const newMember = await response.json();
        setTeam((prevTeam) => [
          ...prevTeam,
          { ...newMember, id: newMember._id },
        ]);
        alert("Member added successfully");
        window.location.reload(false);
      } catch (error) {
        console.error("Failed to add member:", error.message);
        alert("Failed to add member");
      }
    }

    handleClose();
    resetForm();
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  const columns = useMemo(
    () => [
      { field: "name", headerName: "Name", flex: 1 },
      { field: "age", headerName: "Age", flex: 0.5 },
      { field: "phone", headerName: "Phone", flex: 1 },
      { field: "email", headerName: "Email", flex: 1 },
      // { field: "accessLevel", headerName: "Access Level", flex: 1 },
      {
        field: "accessLevel",
        headerName: "Access Level",
        flex: 1,
        minWidth: 100,
        renderCell: ({ row: { accessLevel } }) => {
          return (
            <Box
              width="100%"
              p="5px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              backgroundColor={
                accessLevel === "Admin"
                  ? colors.greenAccent[600]
                  : accessLevel === "Manager"
                  ? colors.greenAccent[600]
                  : colors.greenAccent[600]
              }
              borderRadius="4px"
            >
              {accessLevel === "Admin" && <AdminPanelSettingsOutlinedIcon />}
              {accessLevel === "Manager" && <SecurityOutlinedIcon />}
              {accessLevel === "User" && <LockOpenOutlinedIcon />}
              <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                {accessLevel}
              </Typography>
            </Box>
          );
        },
      },

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
        <Header title="TEAM" subtitle="Managing the Team Members" />
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
          Add Member
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
          rows={team}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
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
          {currentMember ? "Edit Member" : "Add Member"}
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={
              currentMember || {
                _id: "",
                name: "",
                age: "",
                phone: "",
                email: "",
                accessLevel: "",
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
                    type="number"
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
                    type="email"
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
                    htmlFor="accessLevel"
                    style={{ fontSize: "1rem", justifyContent: "left" }}
                  >
                    Access Level
                  </label>
                  <Field
                    as={Select}
                    id="accessLevel"
                    name="accessLevel"
                    fullWidth
                    margin="normal"
                    placeholder="Select Access level"
                  >
                    <MenuItem value="" disabled>
                      Select Access Level
                    </MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                  </Field>
                  <ErrorMessage
                    name="accessLevel"
                    component="div"
                    style={{ color: "tomato" }}
                  />
                </div>
                <Box mt={2} display="flex" justifyContent="space-between">
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
                      {currentMember ? "Update" : "Add"}
                    </Button>
                  </DialogActions>
                </Box>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Team;
