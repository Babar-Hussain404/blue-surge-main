const bodyParser = require("body-parser");
const connectDB = require("./db/conn");
const env = require("dotenv").config();
const upload = require("express-fileupload");
const path = require("path");
const express = require("express");
const http = require("http");
const cors = require("cors");
// const corssss = require("./backend/uploads");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(upload());
app.use(express.urlencoded({ extended: false }));
connectDB();
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.static(path.join(__dirname, "uploads")));
app.use("/user", require("./router/userRouter"));
app.use("/aboutus", require("./router/aboutRouter"));
app.use("/contact/address", require("./router/adressRouter"));
app.use("/about/team", require("./router/aboutTeamRouter"));
app.use("/partners", require("./router/partnerRouter"));
app.use("/contact", require("./router/contactRouter"));
app.use("/rd", require("./router/rdRouter"));
app.use("/industry", require("./router/industryRouter"));
app.use("/service", require("./router/serviceRouter"));
app.use("/product", require("./router/productRouter"));
app.use("/header",require("./router/headerRouter"))
app.use("/metatags",require("./router/metaTagsRouter"))
app.use("/icons",require("./router/iconsRouter"))


// app.get("/hello", () => {
//     console.log("hello From Server")
// })

// Serve the admin interface
// app.use("/admin", express.static(path.join(__dirname, './admin')));
// app.use("/", express.static(path.join(__dirname, './web')));
//  app.get("/admin/*", function (req, res) {
//    res.sendFile(path.join(__dirname, "./admin", "index.html"));
//  });

//  app.get("/*", function (req, res) {
//    res.sendFile(path.join(__dirname, "./web", "index.html"));
//    });

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
