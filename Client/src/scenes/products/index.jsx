import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
  Rating,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup.number().required("Price is required"),
  description: yup.string().required("Description is required"),
  rating: yup.number().required("Rating is required").min(0).max(5),
  category: yup
    .string()
    .oneOf(
      [
        "Category_A",
        "Category_B",
        "Category_C",
        "Category_D",
        "Category_E",
        "Category_F",
      ],
      "Invalid Category"
    )
    .required("Category is required"),
  supply: yup.number().required("Supply is required"),
  yearlySalesTotal: yup.number().required("Yearly Sales Total is required"),
  yearlyTotalSoldUnits: yup
    .number()
    .required("Yearly Total Sold Units is required"),
});

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const fetchProductData = async () => {
    try {
      const response = await fetch("http://localhost:9000/getProducts");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch product data:", error.message);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const handleAdd = () => {
    setCurrentProduct(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProduct(null);
  };

  const handleFormSubmit = async (values) => {
    const productData = {
      ...values,
      stat: [
        {
          yearlySalesTotal: values.yearlySalesTotal,
          yearlyTotalSoldUnits: values.yearlyTotalSoldUnits,
        },
      ],
    };

    if (currentProduct && currentProduct._id !== null) {
      // Update product
      try {
        const response = await fetch(
          `http://localhost:9000/updateProduct/${currentProduct._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update product");
        }

        const updatedProduct = await response.json();
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === currentProduct._id ? updatedProduct : product
          )
        );

        alert("Product updated successfully");
        window.location.reload(false);
      } catch (error) {
        console.error("Failed to update product:", error.message);
        alert("Failed to update product");
      }
    } else {
      // Add product
      try {
        const response = await fetch("http://localhost:9000/addProduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        });

        if (!response.ok) {
          throw new Error("Failed to add product");
        }

        // Refetch product data to update the state with the latest data
        fetchProductData();

        alert("Product added successfully");
      } catch (error) {
        console.error("Failed to add product:", error.message);
        alert("Failed to add product");
      }
    }

    handleClose();
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setOpen(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Do you want to delete this product?")) {
      try {
        const response = await fetch(
          `http://localhost:9000/deleteProduct/${productId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const error = await response.json();
          return alert(error.error);
        }

        // Refetch product data to update the state with the latest data
        fetchProductData();

        alert("Product deleted successfully.");
      } catch (error) {
        console.error("Failed to delete product:", error.message);
        alert("Failed to delete product");
      }
    }
  };

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PRODUCTS" subtitle="See your list of products." />
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
          Add Product
        </Button>
      </Box>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        justifyContent="space-between"
        rowGap="20px"
        columnGap="1.33%"
      >
        {products.map((product) => (
          <Card
            key={product._id}
            sx={{
              backgroundColor: colors.blueAccent[600],
              borderRadius: "0.55rem",
              "&:hover": {
                boxShadow: `0 4px 20px 0 ${colors.shadow}`,
              },
            }}
          >
            <CardContent>
              {/* Category */}
              <Typography
                sx={{ fontSize: 14 }}
                color={theme.palette.secondary[700]}
                gutterBottom
              >
                {product.category || "N/A"}
              </Typography>

              {/* Name */}
              <Typography variant="h5" component="div">
                {product.name || "N/A"}
              </Typography>

              {/* Price */}
              <Typography
                sx={{ mb: "1.5rem" }}
                color={theme.palette.secondary[400]}
              >
                ${product.price ? Number(product.price).toFixed(2) : "N/A"}
              </Typography>

              {/* Rating */}
              <Box display="flex" alignItems="center">
                <Typography>Rating:</Typography>
                <Rating
                  value={product.rating}
                  readOnly
                  precision={0.5}
                  sx={{ fontSize: "1.2rem", ml: 0.5 }}
                />
              </Box>

              {/* Description */}
              <Typography variant="body2">
                {product.description || "No description available"}
              </Typography>
            </CardContent>

            {/* Actions */}
            <CardActions>
              <Button
                variant="contained"
                color="warning"
                size="small"
                onClick={() => toggleExpanded(product._id)}
              >
                {expandedId === product._id ? "See Less" : "See More"}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => handleEdit(product)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </Button>
            </CardActions>

            {/* Extra Info */}
            <Collapse
              in={expandedId === product._id}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
                <Typography>ID: {product._id}</Typography>
                <Typography>Supply: {product.supply}</Typography>
                <Typography>
                  Yearly Sales Total: {product.stat[0].yearlySalesTotal}
                </Typography>
                <Typography>
                  Yearly Total Sold Units:{" "}
                  {product.stat[0].yearlyTotalSoldUnits}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </Box>

      {/* Dialog for adding/editing product */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {currentProduct && currentProduct._id !== null
            ? "Edit Product"
            : "Add Product"}
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              _id: currentProduct ? currentProduct._id : null,
              name: currentProduct ? currentProduct.name : "",
              price: currentProduct ? currentProduct.price : "",
              description: currentProduct ? currentProduct.description : "",
              rating: currentProduct ? currentProduct.rating : 0,
              category: currentProduct ? currentProduct.category : "",
              supply: currentProduct ? currentProduct.supply : "",
              yearlySalesTotal: currentProduct
                ? currentProduct.stat[0].yearlySalesTotal
                : "",
              yearlyTotalSoldUnits: currentProduct
                ? currentProduct.stat[0].yearlyTotalSoldUnits
                : "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ errors, touched }) => (
              <Form style={{ width: "350px" }}>
                <label
                  htmlFor="name"
                  style={{ fontSize: "1rem", justifyContent: "left" }}
                >
                  Name
                </label>
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  fullWidth
                  margin="normal"
                  error={touched.name && !!errors.name}
                  helperText={<ErrorMessage name="name" />}
                />
                <label
                  htmlFor="price"
                  style={{ fontSize: "1rem", justifyContent: "left" }}
                >
                  Price
                </label>
                <Field
                  as={TextField}
                  name="price"
                  label="Price"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={touched.price && !!errors.price}
                  helperText={<ErrorMessage name="price" />}
                />
                <label
                  htmlFor="description"
                  style={{ fontSize: "1rem", justifyContent: "left" }}
                >
                  Description
                </label>
                <Field
                  as={TextField}
                  name="description"
                  label="Description"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={3}
                  error={touched.description && !!errors.description}
                  helperText={<ErrorMessage name="description" />}
                />
                <label
                  htmlFor="rating"
                  style={{ fontSize: "1rem", justifyContent: "left" }}
                >
                  Rating
                </label>
                <Field
                  as={TextField}
                  name="rating"
                  label="Rating"
                  type="number"
                  fullWidth
                  margin="normal"
                  inputProps={{ step: 0.5, min: 0, max: 5 }}
                  error={touched.rating && !!errors.rating}
                  helperText={<ErrorMessage name="rating" />}
                />
                <label
                  htmlFor="category"
                  style={{ fontSize: "1rem", justifyContent: "left" }}
                >
                  Category
                </label>
                <Field
                  as={TextField}
                  name="category"
                  label="Category"
                  fullWidth
                  margin="normal"
                  select
                  error={touched.category && !!errors.category}
                  helperText={<ErrorMessage name="category" />}
                >
                  {[
                    "Category_A",
                    "Category_B",
                    "Category_C",
                    "Category_D",
                    "Category_E",
                    "Category_F",
                  ].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Field>
                <label
                  htmlFor="supply"
                  style={{ fontSize: "1rem", justifyContent: "left" }}
                >
                  Supply
                </label>
                <Field
                  as={TextField}
                  name="supply"
                  label="Supply"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={touched.supply && !!errors.supply}
                  helperText={<ErrorMessage name="supply" />}
                />
                <label
                  htmlFor="yearlySalesTotal"
                  style={{ fontSize: "1rem", justifyContent: "left" }}
                >
                  Yearly Sales Total
                </label>
                <Field
                  as={TextField}
                  name="yearlySalesTotal"
                  label="Yearly Sales Total"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={touched.yearlySalesTotal && !!errors.yearlySalesTotal}
                  helperText={<ErrorMessage name="yearlySalesTotal" />}
                />
                <label
                  htmlFor="yearlyTotalSoldUnits"
                  style={{ fontSize: "1rem", justifyContent: "left" }}
                >
                  Yearly Total Sold Units
                </label>
                <Field
                  as={TextField}
                  name="yearlyTotalSoldUnits"
                  label="Yearly Total Sold Units"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={
                    touched.yearlyTotalSoldUnits &&
                    !!errors.yearlyTotalSoldUnits
                  }
                  helperText={<ErrorMessage name="yearlyTotalSoldUnits" />}
                />
                <Box mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      backgroundColor: "#4461ED",
                      color: "#BBB2B2",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "7px 7px",
                      margin: "3px",
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Products;
