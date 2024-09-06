// components/Pagination.js
import React from "react";
import { Pagination as MuiPagination } from "@mui/material";

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <MuiPagination
      count={totalPages}
      page={currentPage}
      onChange={handleChange}
      color="primary"
      sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
    />
  );
};

export default Pagination;
