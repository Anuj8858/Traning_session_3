import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const Filter = ({
  title,
  options,
  selectedFilters,
  onFilterChange,
  onClearFilter,
}) => {
  const [displayedFilters, setDisplayedFilters] = useState([]);

  const handleFilterChange = (value, checked) => {
    if (checked) {
      onFilterChange([...selectedFilters, value]);
    } else {
      onFilterChange(selectedFilters.filter((item) => item !== value));
    }
  };

  const handleRemoveFilter = (filter) => {
    const updatedFilters = selectedFilters.filter((item) => item !== filter);
    onFilterChange(updatedFilters);
  };

  // Update displayed filters whenever selectedFilters change
  React.useEffect(() => {
    setDisplayedFilters(selectedFilters);
  }, [selectedFilters]);

  return (
    <Box
      sx={{
        border: "1px solid black",
        borderRadius: "5px",
        width: "80%",
        p: 1,
        marginBottom: 1,
        borderColor: "black",
      }}
    >
      {/* Display selected filters above the title */}
      {displayedFilters.length > 0 && (
        <Box sx={{ mb: 1 }}>
          {displayedFilters.map((filter) => (
            <Box
              key={filter}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                borderRadius: "4px",
                backgroundColor: "#f0f0f0",
                padding: "4px",
                marginRight: "4px",
              }}
            >
              <Typography variant="body2">{filter}</Typography>
              <IconButton
                size="small"
                onClick={() => handleRemoveFilter(filter)}
                sx={{ marginLeft: "4px" }}
              >
                <Close fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
      
      {/* Title for the filter section */}
      <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
        {title}
      </Typography>

      <FormControl fullWidth sx={{ mb: 1 }}>
        <FormGroup>
          {options.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={selectedFilters.includes(option)}
                  onChange={(e) => handleFilterChange(option, e.target.checked)}
                  value={option}
                />
              }
              label={option}
            />
          ))}
        </FormGroup>
      </FormControl>
      {selectedFilters.length > 0 && (
        <Box sx={{ textAlign: "right" }}>
          {/* Uncomment if you want to use a clear filters button */}
          {/* <IconButton size="small" onClick={onClearFilter}>
            <Close fontSize="small" />
          </IconButton> */}
        </Box>
      )}
    </Box>
  );
};

export default Filter;
