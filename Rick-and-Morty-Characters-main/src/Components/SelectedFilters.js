import React from "react";
import { Chip, Grid, Typography } from "@mui/material";

function SelectedFilters({ filters, onRemoveFilter }) {
  const filterLabels = {
    species: "Species",
    gender: "Gender",
    origin: "Origin",
  };

  const handleRemove = (filterType, value) => {
    onRemoveFilter(filterType, value);
  };

  const renderSelectedFilters = () => {
    let selectedFilters = [];

    for (const [filterType, values] of Object.entries(filters)) {
      if (Array.isArray(values)) {
        values.forEach((value) => {
          selectedFilters.push(
            <Grid item key={`${filterType}-${value}`}>
              <Chip
                label={`${filterLabels[filterType]}: ${value}`}
                color="primary"
                variant="outlined"
                sx={{
                  backgroundColor: "black",
                  color: "#FFF",
                }}
              />
            </Grid>
          );
        });
      }
    }

    return selectedFilters;
  };

  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      justifyContent="center"
      marginBottom={2}
    >
      {!!renderSelectedFilters().length && (
        <Grid item>
          <Typography variant="h6" sx={{ color: "Black" }}>
            Selected Filters:
          </Typography>
        </Grid>
      )}
      {renderSelectedFilters()}
    </Grid>
  );
}

export default SelectedFilters;
