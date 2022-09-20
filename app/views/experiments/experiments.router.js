const service = require("./experiments.service");
const tableService = require("./table.service");
const d3Service = require("./d3.service");

const express = require("express");

const router = new express.Router();

router.get("/", (req, res) => {
  const { experiments } = service;

  res.render("experiments", { experiments });
});

router.get("/table", (req, res) => {
  const { data } = tableService;

  res.render("experiments/table", { data });
});

router.get("/d3", (req, res) => {
  const { data } = d3Service;

  res.render("experiments/d3", { data });
});

module.exports = router;
