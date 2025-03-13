const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const videoRoutes = require("./routes/videoRoutes");
const authRoutes = require("./routes/authRoutes");

require("./config/passport");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use(session({ secret:  process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());



app.use("/auth", authRoutes);
app.use("/videos", videoRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
