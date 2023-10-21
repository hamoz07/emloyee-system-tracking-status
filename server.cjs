/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const PORT = process.env.PORT || 8000; // Use the provided PORT or default to 8000
const url =
  "https://6f39f9bb-90e4-4712-a7ed-b1ca0bd22d1c-us-east1.apps.astra.datastax.com/api/rest/v2/namespaces/tickets/collections/tasks";
const token =
  "AstraCS:XfpofEKcHYmkjFlDMwICFhBe:fe1e088a061463e83a1242181e19a1aeb381f6789c720ad820dbdfda71c9fa0b"
const app = express();

app.use(cors()); 

app.use(express.json()); 

// all gets

app.get("/tickets", async (req, res) => {

  const options = {
    method: "GET",
    headers: {
      Accepts: "application/json",
      "x-Cassandra-Token": token,
    },
  };

  try {
    const response = await axios(`${url}?page-size=20`,options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error});
  }
});

app.get("/tickets/:documentId", async (req, res) => {
  const formData = req.params.documentId
  const options = {
    method: "GET",
    headers: {
      Accepts: "application/json",
      "x-Cassandra-Token": token,
    },
  };

  try {
    const response = await axios(`${url}/${formData}`,options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error});
  }
});

app.post("/tickets", async (req, res) => {
  const formData = req.body;
  
  const options = {
    method: "POST",
    headers: {
      Accepts: "application/json",
      "x-Cassandra-Token": token,
      "Content-Type": "application/json",
    },
    data: formData,
    url: url,
  };

  try {
    const response = await axios(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error});
  }
});

app.delete("/tickets/:documentId", async (req, res) => {
  const formData = req.params.documentId;

  const options = {
    method: "DELETE",
    headers: {
      Accepts: "application/json",
      "x-Cassandra-Token": token,
    },
  };
  
  try {
    const response = await axios(`${url}/${formData}`,options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});

app.put("/tickets/:documentId", async (req, res) => {
  const formData = req.params.documentId
  const data = req.body.data
  console.log(data);
  const options = {
    method: "PUT",
    headers: {
      Accepts: "application/json",
      "x-Cassandra-Token": token,
    },
    data
  };

  try {
    const response = await axios(`${url}/${formData}`,options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error});
  }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
