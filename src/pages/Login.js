import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link as RLink} from 'react-router-dom'
import Axios from 'axios';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();

  const [user, setUser] = useState({
    userEmail : '',
    userPassword : '',
  })

  const onChangeUser = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  const onSubmitForm = (e) => {
    e.preventDefault()
    Axios.post('http://localhost:4000/api/login',{
      ...user
    })
    .then( res => {
      alert(res.data.result);
    })
    .catch( err => {
      console.log(err);
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmitForm}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="이메일"
            name="userEmail"
            autoComplete="email"
            autoFocus
            onChange={onChangeUser}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="userPassword"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChangeUser}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            로그인
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                비밀번호 찾기
              </Link>
            </Grid>
            <Grid item>
              <Link component={RLink} to="/join" variant="body2">
                {"회원가입"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <br/>
      </div>
    </Container>
  );
}