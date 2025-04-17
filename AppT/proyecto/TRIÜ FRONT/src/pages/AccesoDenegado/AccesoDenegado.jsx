// eslint-disable-next-line no-unused-vars
import React from "react";
import {Container, Typography, Box, Button} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AccessDenied = () => {
    const navigate = useNavigate();

    return(
        <Container maxWidth="sm" sx={{textAlign: "center", mt: 5 }}>
            <Box sx={{mb: 3}}>
                <Typography variant="h4" color= "error">
                    Acceso denegado
                </Typography>
                <Typography variant="body1" sx={{mt:2}}>
                    No tiene permiso para ver esta pagina 
                </Typography>
            </Box>
            <Button variant="contained" color="primary" onClick={() => navigate("/Homepage")}>
                Volver al inicio
            </Button>
        </Container>
    )

}

export default AccessDenied;