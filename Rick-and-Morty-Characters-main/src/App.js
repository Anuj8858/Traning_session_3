// App.js
import React, { useState, useEffect } from "react";
import { Container, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Box } from "@mui/material";

import CharacterCard from "./Components/CharacterCard";
import Filter from "./Components/Filter";
import SelectedFilters from "./Components/SelectedFilters";
import Pagination from "./Components/Pagination";

function App() {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterSpecies, setFilterSpecies] = useState([]);
  const [filterGender, setFilterGender] = useState([]);
  const [filterOrigin, setFilterOrigin] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character/");
      const data = await response.json();
      setCharacters(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    const sortedCharacters = [...characters].sort((a, b) => {
      if (newOrder === "asc") {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setCharacters(sortedCharacters);
  };

  const handleFilterChange = (filterType, values) => {
    switch (filterType) {
      case "species":
        setFilterSpecies(values);
        break;
      case "gender":
        setFilterGender(values);
        break;
      case "origin":
        setFilterOrigin(values);
        break;
      default:
        break;
    }
  };

  const clearFilter = (filterType) => {
    switch (filterType) {
      case "species":
        setFilterSpecies([]);
        break;
      case "gender":
        setFilterGender([]);
        break;
      case "origin":
        setFilterOrigin([]);
        break;
      default:
        break;
    }
  };

  const filteredCharacters = characters.filter(
    (character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterSpecies.length === 0 || filterSpecies.includes(character.species)) &&
      (filterGender.length === 0 || filterGender.includes(character.gender)) &&
      (filterOrigin.length === 0 || filterOrigin.includes(character.origin.name))
  );

  const paginatedCharacters = filteredCharacters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container sx={{ py: 1 }}>
      <Typography variant="h3" sx={{ mb: 3, color: "black", textAlign: "center" }}>
        Rick and Morty Characters
      </Typography>

      <SelectedFilters
        filters={{
          species: filterSpecies,
          gender: filterGender,
          origin: filterOrigin,
        }}
        onRemoveFilter={handleFilterChange}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} style={{ position: 'sticky', top: 0 }}>
          <Box sx={{ width: "100%", mb: 2 }}>
            <Filter
              title="Filter by Species"
              options={["Human", "Alien", "Humanoid"]}
              selectedFilters={filterSpecies}
              onFilterChange={(values) => handleFilterChange("species", values)}
              onClearFilter={() => clearFilter("species")}
            />
            <Filter
              title="Filter by Gender"
              options={["Male", "Female", "Genderless"]}
              selectedFilters={filterGender}
              onFilterChange={(values) => handleFilterChange("gender", values)}
              onClearFilter={() => clearFilter("gender")}
            />
            <Filter
              title="Filter by Origin"
              options={["Earth (C-137)", "Earth (Replacement Dimension)", "Unknown"]}
              selectedFilters={filterOrigin}
              onFilterChange={(values) => handleFilterChange("origin", values)}
              onClearFilter={() => clearFilter("origin")}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={9}>
          <TextField
            label="Search by Name"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Sort Order</InputLabel>
            <Select
              value={sortOrder}
              onChange={handleSortChange}
              label="Sort Order"
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={3} justifyContent="center">
            {paginatedCharacters.map((character) => (
              <Grid key={character.id} item xs={12} sm={6} md={4} lg={3}>
                <CharacterCard character={character} />
              </Grid>
            ))}
          </Grid>

          <Pagination
            currentPage={currentPage}
            totalItems={filteredCharacters.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </Grid>
      </Grid>

      <Typography variant="body2" align="center" sx={{ mt: 4, pt: 2, borderTop: "1px solid #ccc" }}>
        &copy; {new Date().getFullYear()} | ANUJ | All rights reserved.
      </Typography>
    </Container>
  );
}

export default App;
