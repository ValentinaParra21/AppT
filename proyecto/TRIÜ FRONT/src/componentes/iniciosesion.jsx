// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  Link,
  Paper,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formValues, setFormValues] = useState({
    correo: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:9001/api/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;
        const payload = JSON.parse(atob(token.split(".")[1]));

        login(token, payload.roles);

        navigate("/Homepage");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al iniciar sesión");
      }
      }catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMessage(error.message);
      setOpenSnackbar(true);
    }
  };

  return (
    <div
      style={{
    backgroundImage: `url(../../src/assets/FondoInicio.jpeg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "94vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0",
    padding: "0",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={5}
          style={{
            padding: "40px",
            borderRadius: "10px",
            background: "#eeeeeedc",
            width: "100%",
          }}
        >
          <Box textAlign="center" marginBottom={2}>
            <img
              src="../../logo.ico"
              alt="Logo"
              style={{ maxWidth: "140px" , borderRadius:"100px"}}

            />
          </Box>
          <Typography variant="h4" align="center" gutterBottom style={{ color: "#ffa726" }}>
            Iniciar sesión
          </Typography>
          <TextField
            label="Correo"
            name="correo"
            value={formValues.correo}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formValues.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box marginTop={3}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleLogin}
              style={{
                padding: "10px",
                fontWeight: "bold",
                backgroundColor: "#ffa726",
              }}
            >
              Iniciar sesión
            </Button>
          </Box>
          <Box marginTop={2} textAlign="center">
            <Link href="/Homepage" color="secondary" underline="hover" style={{ color: "#ffa726" }}>
              Volver
            </Link>
          </Box>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
          >
            <Alert severity="error" onClose={() => setOpenSnackbar(false)}>
              {errorMessage}
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
