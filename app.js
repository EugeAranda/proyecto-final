const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;

/* middlewares */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("./static"));

/* listen */
app.listen(port, (req, res) => {
  console.log("Server started at http://localhost:" + port);
});

const connection = require("./js/db");
/* routes */
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/especiales", (req, res) => {
  res.render("especiales");
});

app.get("/quienessomos", (req, res) => {
  res.render("quienessomos");
});

app.post("/contact", (req, res) => {
  const { name, lastname, email, message } = req.body;

  connection.query(
    "INSERT INTO user SET ?",
    {
      name: name,
      lastname: lastname,
      email: email,
      message: message,
    },
    async (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.render("quienessomos", {
          alert: true,
          alertTitle: "Listo!",
          alertMessage: "Formulario Enviado",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "quienessomos",
        });
      }
    }
  );
});
