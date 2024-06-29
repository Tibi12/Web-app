import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField, Grid, Link, Paper } from '@mui/material';

export const SignupPage = () => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');


  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('Signup submitted:', username, password1, password2, email);
  };

  return (
    <Grid container component="main">
      <Grid
        className="size"
        item
        component={Paper}
        elevation={1}
        square
      >
        <div className="paper">
          <Typography component="h1" variant="h5">
            SIGN UP
          </Typography>
          <form className="form" noValidate>
            <TextField
            onChange={(event)=>{setUsername(event.target.value)}}
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
            onChange={(event)=>{setEmail(event.target.value)}}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
            />
            <TextField
            onChange={(event)=>{setPassword1(event.target.value);}}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password1"
              label="Password"
              type="password"
              id="password1"
            />
            <TextField
            onChange={(event)=>{setPassword2(event.target.value);}}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Password"
              type="password"
              id="password2"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick = {(e)=> {handleSubmit(e)}}
              sx={{marginTop: "2rem", backgroundColor: "#1f2833"}}
            >
              Sign Up
            </Button>
            <Grid container sx={{marginTop: "1rem"}}>
              <Grid item>
                <Link href="/signin" variant="body2" sx={{color: "#1f2833"}}>
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
