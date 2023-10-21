import express, { Application } from "express";
import { getStock } from "./routes/getStock";
import { getHerd } from "./routes/getHerd";
import { placeOrder } from "./routes/placeOrder";
import helmet from "helmet";
import RateLimit from "express-rate-limit";
import { validateDay } from "./middleware/dayValidator";
import { validateOrder } from "./middleware/orderValidator";
import { getSales } from "./routes/getSales";
import { validateDateParams } from "./middleware/dateValidator";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swaggerSpec";


const app: Application = express();
const port = process.env.PORT || 8000;

app.use('/yak-shop/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Setting up rate limiting for all apis to prevent DDOS attacks
//Currently set to 500 requests/min as we anticipate low genuine traffic initially for our YAK store
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 500,
});
app.use(limiter);

//Reduced the size of request body to prevent flooding server quickly during ddos attack
app.use(express.json({ limit: "256kb" }));

//Defining a CSP policy using helmet that restricts how resources are loaded and executed in web pages.
//The goal is to minimize the risk of Cross-Site Scripting (XSS) attacks, data injection, and other related vulnerabilities.
//We can add the url of trusted source in each tag since i am not using any external resource hence using self in most of them
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
    },
  })
);
app.get("/yak-shop/stock/:day", validateDay, getStock);

app.get("/yak-shop/herd/:day", validateDay, getHerd);

app.post("/yak-shop/order/:day", validateDay, validateOrder, placeOrder);

app.get("/yak-shop/sales/", validateDateParams, getSales);

app.listen(port, async () => {
  console.log(`Yak Shop Server has started at http://localhost:${port}`);
});
