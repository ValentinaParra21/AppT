import swaggerJSDOC from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

// Configuracion

const options ={
    definition: {
        openapi: "3.0.0",
        info:{
            title: "Api con conexion MongoDB",
            version: "1.0.0",
            descripcion: "Conectancdose MongoDB y separando las rutas ",
            contact:{
                name:"API Support",
                url: "",
                email: "Juan@example.com",
            },
        },
        servers:[
            {
                url: "/api",
                descripcion:"Documentacion de API REST colection",
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization", 
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis:["src/routes/*.js"],
};


const swaggerSpec = swaggerJSDOC(options);
const swaggerJSDOCs = (app, port) => {
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get("api-docs.json", (req , res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    console.log(
        `Version No 1 de la documentacion estara disponible en http://localhost:${port}/api-docs `
    )
        
    
};

export default swaggerJSDOCs;