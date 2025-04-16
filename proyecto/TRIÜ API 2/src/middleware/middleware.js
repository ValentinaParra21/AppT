export const middleware = (schema, property) => {
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false});
        if (error){
            return res.status(400).json({
                message: "Error de validacion",
                details: error.details.map((err) => err.message),
            });
        }
        next();
    };
};