import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const CharacterCard = ({ character }) => {
  return (
    <Card sx={{ height: "100%", boxShadow: "0 4px 8px black" }}>
      <CardMedia
        component="img"
        height="300"
        image={character.image}
        alt={character.name}
      />
      <CardContent
        style={{
          backgroundColor: "black",
          opacity: "0.7",
          marginTop: "-10px",
          color: "#FFF",
        }}
      >
        <Typography variant="h6" component="div">
          {character.name}
        </Typography>
      </CardContent>
      <CardContent
        style={{
          backgroundColor: "#3a3838",
          color: "#FFF",
          minHeight: "300px",
        }}
      >
        <Typography
          className="card"
          sx={{
            borderBottom: "1px solid #979090",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Status
          <Typography sx={{ color: "orange" }}> {character.status} </Typography>
        </Typography>
        <Typography
          className="card"
          sx={{
            borderBottom: "1px solid #979090",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Species:
          <Typography sx={{ color: "orange" }}> {character.species}</Typography>
        </Typography>
        <Typography
          className="card"
          sx={{
            borderBottom: "1px solid #979090",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Gender:
          <Typography sx={{ color: "orange" }}> {character.gender}</Typography>
        </Typography>
        <Typography
          className="card"
          sx={{
            borderBottom: "1px solid #979090",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Origin:
          <Typography sx={{ color: "orange" }}>
            {character.origin.name}
          </Typography>
        </Typography>
        <Typography
          className="card"
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          variant="body2"
          component="div"
        >
          Last Location:
          <Typography sx={{ color: "orange" }}>
            {" "}
            {character.location.name}{" "}
          </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
