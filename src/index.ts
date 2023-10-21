import express, { Application } from "express";
import { getStock } from "./routes/getStock";
import { getHerd } from "./routes/getHerd";
import { placeOrder } from "./routes/placeOrder";
import helmet from "helmet";

const app: Application = express();
const port = process.env.PORT || 8000;

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
      reportUri: "/csp-violation-report-endpoint",
    },
  })
);

app.get("/yak-shop/stock/:day", getStock);
app.get("/yak-shop/herd/:day", getHerd);
app.post("/yak-shop/order/:day", placeOrder);

app.listen(port, async () => {
  console.log(`Yak Server has started at http://localhost:${port}`);
});
