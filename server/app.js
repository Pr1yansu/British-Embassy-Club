const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const userRoutes = require("./routes/user");
const session = require("express-session");
const clubRoutes = require("./routes/club");
const RedisStore = require("connect-redis")(session);
const redis = require("redis");
const cors = require("cors");

// Configuring dotenv
dotenv.config({
  path: "./.env",
});

// express app
const app = express();

// Redis Store
const redisClient = redis.createClient({
  url: process.env.REDIS_DB_URI,
});

redisClient.on("error", (err) => {
  console.log("Redis error: ", err);
});

// Database Connection
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: redisClient }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.use(morgan("dev"));

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/club", clubRoutes);

// Port Running on process.env.PORT
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send(`welcome to the club app, ${req.hostname}!`);
});
