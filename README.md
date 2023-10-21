# Yak Shop

---

If you need fresh milk and wool from rarest of labyak tribe yak shop is for you

## Get Started

1. Clone this repository and navigate inside root directory
2. Install node 16 and npm 8 :  [Link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm "https://docs.npmjs.com/downloading-and-installing-node-js-and-npm")
3. xmls are stored inside src/data folder, update entries in these files to run custom test cases.
   herd.xml contains attributes of yak while sales.xml contains information on how much stock is sold on  a daily basis.
4. Execute `npm start`
5. To get stock details using command line execute `npm run stock 13` . This takes days elapsed as parameter.

This should start the Yak Shop server and it should print the base url to access apis.
`Yak Shop Server has started at http://localhost:8000`

## List of API's

**For Swagger documentation refer [Link](http://localhost:8000/yak-shop/api-docs/ "http://localhost:8000/yak-shop/api-docs/")**

#### GET /yak-shop/stock/:day/

This api accepts elapsed day as parameter and returns stock in the following format

```
{
  "milk": 85.5,
  "skins": 3
}
```

#### GET /yak-shop/herd/:day/

This api accepts elapsed day as parameter and returns stock in the following format

```
{
  "herd": [
    {
      "name": "Betty-1",
      "age": 4.14,
      "ageLastShaved": 4.13
    },
    {
      "name": "Betty-2",
      "age": 8.14,
      "ageLastShaved": 8
    },
    {
      "name": "Betty-3",
      "age": 9.64,
      "ageLastShaved": 9.5
    }
  ]
}
```

#### POST /yak-shop/order/:T

This API is used to place order to shop, it accepts T as parameter which is the day on which customer orders, below payload is required to execute this api

```
{
    "customer": "Medvedev",
    "order": {
        "milk": 12,
        "skins": 5
    }
}
```

#### GET yak-shop/sales?from=10/22/2023&to=10/23/2023 (Bonus feature)

This API accepts date range and returns stock sold between these dates will be useful in building dashboard from UI where we can plot trend chart and bar chart based on this api.

```
{
  "milk": 85.5,
  "skins": 3
}
```

#### Deployment using Docker (Bonus feature)

This application can be effortlessly deployed in any environment by utilizing Docker. Within the root directory, you'll find a Docker file that efficiently manages all the necessary environment dependencies. To successfully run this application using Docker, follow these steps:

1. Install docker using [orbstack](https://docs.orbstack.dev/install "https://docs.orbstack.dev/install") or docker [desktop](https://www.docker.com/products/docker-desktop/ "https://www.docker.com/products/docker-desktop/")
2. cd to root directory of this project
3. Execute `docker build -t yak-shop . `
4. Execute `docker run -p 8080:8000 yak-shop`
5. Access the apis using `http://localhost:8080/yak-shop/api-docs/`

#### Safeguarding API's Against Vulnerabilities(Bonus feature)

Please refer to this file `src/index.ts` this contains information related to different routes being used in code.
You can find bunch of security best practices that have been followed while developing these apis.
Refer to line 23 that adds [rate limits](https://www.npmjs.com/package/express-rate-limit "https://www.npmjs.com/package/express-rate-limit") to that can prevent from DDOS attacks
Refer to line 25 that limits size of json payload

Refer to line 35 that Defines a CSP policy using node js package [helmet](https://www.npmjs.com/package/helmet "https://www.npmjs.com/package/helmet") that restricts how resources are loaded and executed in web pages.The goal is to minimize the risk of Cross-Site Scripting (XSS) attacks, data injection, and other related vulnerabilities.
