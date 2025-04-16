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
        backgroundImage: 'url("https://scontent.fbog5-1.fna.fbcdn.net/v/t1.6435-9/202773732_310855684035424_1713396733998623976_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3a1ebe&_nc_eui2=AeF0ixtlPJYkefm6QPCVpthMfNjQfwM8Aq182NB_AzwCrYyQn49wVOAQz0JSmgof0-J8aT-UixYr9zg9jT7Ln8OE&_nc_ohc=WSNhSlzI4eUQ7kNvgFXSMoc&_nc_zt=23&_nc_ht=scontent.fbog5-1.fna&_nc_gid=AP8Ziw9j5GS-wrPGJqyu04S&oh=00_AYD1sNsR7xnbHY64ihROnXBdmtcVvn5-Z1dX8F62Jf6BOg&oe=677D9300")', // Cambia esta URL por tu imagen de fondo.
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
              style={{ maxWidth: "140px" }}
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
            <Link href="/login" color="secondary" underline="hover" style={{ color: "#ffa726" }}>
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
