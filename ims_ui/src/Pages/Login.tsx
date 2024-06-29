import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField, Grid, Link, Paper } from "@mui/material";
import { useSigninMutation } from "../api/useSigninMutation";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errLabel, setErrLabel] = React.useState<any>(null)
  const { mutate, isSuccess, isError, data, error } = useSigninMutation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isSuccess) {
      console.log(data.data);
      navigate('/dashboard');
    }

    if (isError) {
      console.log(error);
      setErrLabel("Login failed")
    }
  }, [isSuccess, isError, data, error]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    mutate({username, password})
  };

  return (
    <Grid container component="main">
      <Grid className="size" item component={Paper} elevation={1} square>
        <div className="paper">
          <Typography component="h1" variant="h5">
            SIGN IN
          </Typography>
          <Typography variant="caption" sx={{marginTop: "1rem", color: "red"}}>
            {errLabel && errLabel}
          </Typography>
          <form className="form" noValidate>
            <TextField
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
              sx={{ marginTop: "2rem", backgroundColor: "#1f2833" }}
            >
              Sign In
            </Button>
            <Grid container sx={{ marginTop: "1rem" }}>
              <Grid item>
                <Link href="/signup" variant="body2" sx={{ color: "#1f2833" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
