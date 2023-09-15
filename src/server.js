import express from "express";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import "./db";
import { localsMiddleware, logger } from "./middlewares";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter.js";

export const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  res.header("Cross-Origin-Embedder-Policy", "credentialless");
  res.header("Access-Control-Allow-Headers");
  res.header("Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(flash());
app.use(localsMiddleware);

app.use("/uploads", express.static("uploads"));

app.use("/img", express.static("img"));
app.use("/static", express.static("assets"));

app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);
