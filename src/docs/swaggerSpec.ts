import swaggerJSDoc from "swagger-jsdoc";

/**
 * Setup Swagger API auto-generation
 */
const swaggerAPIOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "YAK Rest APIs",
            version: "3.0",
            description:
                "*Note:* Yak shop"
        }
    },
    apis: [
       'src/swagger/schema/*.yaml',
    ]
};
const swaggerSpec = swaggerJSDoc(swaggerAPIOptions);

export default swaggerSpec;