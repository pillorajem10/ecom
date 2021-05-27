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
import styles from '../styles/Signup.module.css'

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
    fname: '',
    mname: '',
    lname: '',
    email: '',
    uname: '',
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  });
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const { fname, mname, lname, email, uname, password, password2 } = values;
  const { loading, userInfo, error } = useSelector(state => state.userRegister);
  const { user } = useSelector(state => state.userSignin);

  useEffect(() => {
    if (userInfo || user) {
     router.push('/');
    }
    return () => {
      //
    };
  }, [userInfo, user]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(ecom.user.register(fname, mname, lname, email, uname, password, password2));
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

  const signUpForm = () => (
    <>
      <div className={styles.mainContainer}>
        {error && showError()}
        <form onSubmit = {submitHandler} className={styles.formContainer}>
          <center style={{fontSize: "1.5rem"}}>Sign Up here</center>
          <FormControl className={(classes.margin, classes.textField)}>
            <InputLabel color="primary">First Name</InputLabel>
            <Input
              color="primary"
              id="fname"
              type='text'
              name='fname'
              required
              value={values.fname}
              onChange={handleChange('fname')}
            />
          </FormControl>
          <FormControl className={(classes.margin, classes.textField)}>
            <InputLabel color="primary">Middle Name</InputLabel>
            <Input
              color="primary"
              id="mname"
              type='text'
              name='mname'
              value={values.mname}
              onChange={handleChange('mname')}
            />
          </FormControl>
          <FormControl className={(classes.margin, classes.textField)}>
            <InputLabel color="primary">Last Name</InputLabel>
            <Input
              color="primary"
              id="lname"
              type='text'
              name='lname'
              required
              value={values.lname}
              onChange={handleChange('lname')}
            />
          </FormControl>
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
            <InputLabel color="primary">Username</InputLabel>
            <Input
              color="primary"
              id="uname"
              type='text'
              name='uname'
              required
              value={values.uname}
              onChange={handleChange('uname')}
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
          <FormControl className={(classes.margin, classes.textField)}>
            <InputLabel color="primary">Confirm Password</InputLabel>
              <Input
                color="primary"
                id="password2"
                name="password2"
                required
                type={values.showPassword2 ? 'text' : 'password'}
                value={values.password2}
                onChange={handleChange('password2')}
                endAdornment={
                  <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword2 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                  </InputAdornment>
                }
              />
          </FormControl>
          <Button style = {{marginTop: '5%'}} variant="contained" type="submit">Sign Up</Button>
          <div style = {{marginTop: '5%', fontSize:20}}>Have an account? <Link href = '/signin'><a style = {{color: 'orange', textDecoration:'none'}} >Sign In</a></Link></div>
        </form>
      </div>
    </>
  )

  return (
    loading? <center className='loading1' ><CircularProgress color = 'inherit' /></center> :
    <>
      <Head>
        <title>Jem Pillora | Sign-Up</title>
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
        signUpForm()
      ) }
    </>
  )
}

export default Signup
