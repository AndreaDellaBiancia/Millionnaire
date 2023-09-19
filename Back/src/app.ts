import { NextFunction, Request, Response } from "express";

// Importation des modules requis
const express = require("express");
const path = require('path');





// Importation de la route pour home
const home = require("./routes/home");


// CONNEXION BDD  

// Initialisation de l'application Express
const app = express();

// Middleware pour analyser les données JSON dans les requêtes
app.use(express.json());

// Middleware pour gérer les problèmes de CORS (Cross-Origin Resource Sharing)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Autoriser toutes les origines
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});



app.use("/api/", home);


// Exportation de l'application Express
module.exports = app;