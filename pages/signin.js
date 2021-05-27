import React, { useEffect, useState } from 'react';

//nextjs
import Head from 'next/head'

//redux
import { useSelector, useDispatch } from 'react-redux';
import { ecom } from '../redux/combineActions';

//navigation
import  Link  from 'next/link';
import { useRouter } from 'next/router'

//css
import styles from '../styles/Signin.module.css'

//material-UI
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

//logo
import logo from '../public/logo.png'

//styling for material ui
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    marginTop: '3%',
    width: '100%',
    '& label.Mui-focused': {
      color: '#FF3F16',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#FF3F16',
    },
  },
}));

const Signup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter()

  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const { email, password } = values;
  const { loading, user, error } = useSelector(state => state.userSignin);
  const { userInfo } = useSelector(state => state.userRegister);

  useEffect(() => {
    if (user || userInfo) {
     router.push('/');
    }
    return () => {
      //
    };
  }, [user, userInfo]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(ecom.user.login(email, password));
    setOpenSnackBar(true);
  }

  const handleChange = name => event => {
      setValues({...values, [name]: event.target.value});
  };

  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword});
  };

  const handleClickShowPassword2 = () => {
    setValues({...values, showPassword2: !values.showPassword2});
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

  const showError = () => (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBar} autoHideDuration={3000} onClose={handleClose}>
      <Alert severity="error">{error}</Alert>
    </Snackbar>
  );

  const signInForm = () => (
    <>
      <div className={styles.mainContainer}>
        {error && showError()}
        <form onSubmit = {submitHandler} className={styles.formContainer}>
          <center style={{fontSize: "1.5rem"}}>Sign In</center>
          <FormControl className={(classes.margin, classes.textField)}>
            <InputLabel color="primary">Email</InputLabel>
            <Input
              color="primary"
              id="email"
              type='email'
              name='email'
              required
              value={values.email}
              onChange={handleChange('email')}
            />
          </FormControl>
          <FormControl className={(classes.margin, classes.textField)}>
            <InputLabel color="primary">Password</InputLabel>
              <Input
                color="primary"
                id="password"
                name="password"
                required
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                  </InputAdornment>
                }
            /  >
          </FormControl>
          <Button style = {{marginTop: '5%'}} variant="contained" type="submit">Sign Up</Button>
          <div style = {{marginTop: '5%', fontSize:20}}>Have an account? <Link style = {{color: 'gray', textDecoration:'none'}} href = '/signin'>Sign In</Link></div>
        </form>
      </div>
    </>
  )

  return (
    loading? <center className='loading1' ><CircularProgress color = 'inherit' /></center> :
    <>
      <Head>
        <title>Jem Pillora | Sign-In</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/*
          <meta name="description" content="Full-stack developer" />
          <meta name="keywords" content="full-stack developer, MERN stack developer, freelance developer" />
          <meta
            property="og:title"
            content="JemPillora"
            key="title"
          />
          <meta
            property="og:description"
            content="Full-stack developer that can create your website for your business"
            key="description"
          />
          <meta
            property="og:image"
            content="%PUBLIC_URL%/favicon.jpeg"
            key="image"
          />
          <meta
            property="og:site_name"
            content="JemPillora"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://jempillora.vercel.app/" key="og:url"/>
        */}
        <meta property="og:image" content={logo} key="ogimage" />
        <meta property="og:url" content="https://jempillora.vercel.app/" key="ogurl" />
        <meta property="og:site_name" content="Jem Pillora" key="ogsitename" />
        <meta property="og:title" content="Jem Pillora" key="ogtitle" />
      </Head>
      { user || userInfo ? (
        null
      ) : (
        signInForm()
      ) }
    </>
  )
}

export default Signup
