const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 5001;

app.use(cors());

let cachedVehicles = [];

const shareNowVehicles = JSON.parse(fs.readFileSync('share-now/vehicles.json', 'utf8'));
const freeNowVehicles = JSON.parse(fs.readFileSync('free-now/vehicles.json', 'utf8'));

// SHARE NOW ROUTE
app.get('/share-now/vehicles', (req, res) => {
  res.send(JSON.stringify(shareNowVehicles));
});

// FREE NOW ROUTE
app.get('/free-now/vehicles', (req, res) => {
  res.send(JSON.stringify(freeNowVehicles));
});

function loadVehicles() {
  console.log("🔄 Loading vehicle data...");

  const shareNowVehicles = JSON.parse(
    fs.readFileSync("share-now/vehicles.json", "utf8")
  ).placemarks;
  const freeNowVehicles = JSON.parse(
    fs.readFileSync("free-now/vehicles.json", "utf8")
  ).poiList;

  cachedVehicles = [
    ...freeNowVehicles.map((vehicle) => ({
      id: vehicle.id,
      type: "FREENOW",
      licencePlate: vehicle.licencePlate,
      coordinates: [vehicle.coordinate.longitude, vehicle.coordinate.latitude],
      address: null,
      state: vehicle.state === "ACTIVE" ? "ACTIVE" : "INACTIVE",
      condition: vehicle.condition === "GOOD" ? "GOOD" : "BAD",
      fuel: null,
    })),
    ...shareNowVehicles.map((vehicle) => ({
      id: vehicle.id,
      type: "SHARENOW",
      licencePlate: vehicle.licencePlate,
      coordinates: [vehicle.coordinates[0], vehicle.coordinates[1]],
      address: vehicle.address || null,
      state: vehicle.state === "ACTIVE" ? "ACTIVE" : "INACTIVE",
      condition: vehicle.condition === "GOOD" ? "GOOD" : "BAD",
      fuel: typeof vehicle.fuel === "number" ? vehicle.fuel : null,
    })),
  ];

  console.log(`✅ Loaded ${cachedVehicles.length} vehicles into memory.`);
}

app.get('/all-vehicles', (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + Number(limit);

  const paginatedResult = cachedVehicles.slice(startIndex, endIndex);

  const response = {
    currentPage: Number(page),
    pageSize: Number(limit),
    totalItems: cachedVehicles.length,
    totalPages: Math.ceil(cachedVehicles.length / limit),
    data: paginatedResult,
  };

  res.json(response);
});

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
  loadVehicles();
});