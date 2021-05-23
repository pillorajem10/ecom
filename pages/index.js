//next js
import Head from 'next/head'
import Image from 'next/image'

//react
import React, { useEffect } from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { ecom } from '../redux/combineActions';

//navigation
import Link from 'next/link';

//css
import styles from '../styles/Home.module.css'

//material-ui
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Rating from '@material-ui/lab/Rating';
import { useMediaQuery } from '@material-ui/core';

//logo
import logo from '../public/logo.png'

const useStyles = makeStyles({
  root: {
    maxHeight: "17rem",
    maxWidth: "8rem",
    marginLeft: '.7rem',
    whiteSpace: 'nowrap',
    marginTop: '1rem'
  },
  root1: {
    maxHeight: "26.5rem",
    maxWidth: "12rem",
    marginTop: '1rem',
    marginLeft: '.7rem',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  },
});

const Home = () => {
  const lowReso = useMediaQuery('(max-width: 519px)');

  const { products, loading, error } = useSelector(state => state.productList);

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(ecom.product.listProduct());
    return () => {
    //
    };
  }, []);

  return (
    loading? <center className='loading' ><CircularProgress color = 'inherit' /></center> : error? <div>{error}</div> :
    <>
      <Head>
        <title>Jem Pillora</title>
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
      <center style={{fontSize: "2rem"}}>Products for you</center>
      <div className={styles.container}>
        { products.length > 0 ? (
          <>
            {
             products.map( products =>
              <>
               { lowReso ?
                 <Link href = {`/product/${products._id}`}>
                   <Card key={products.name} className={classes.root}>
                      <CardMedia
                        component="img"
                        alt={products.name}
                        height="150"
                        image={`/api/product/photo/${products._id}`}
                        title={products.name}
                      />
                      <CardContent>
                        <Typography>
                        <Box
                          component="div"
                          my={0}
                          textOverflow="ellipsis"
                          overflow="hidden"
                        >
                          <b>{products.name}</b>
                        </Box>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                  :

                  <Link href = {`/product/${products._id}`}>
                    <Card key={products.name} className={classes.root1}>
                        <CardMedia
                          component="img"
                          alt={products.name}
                          height="250"
                          image={`/api/product/photo/${products._id}`}
                          title={products.name}
                        />
                      <CardContent>
                        <Typography gutterBottom variant="h6">
                          <Box
                            component="div"
                            my={2}
                            textOverflow="ellipsis"
                            overflow="hidden"
                          >
                            {products.name}
                          </Box>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          <Rating precision={.2} readOnly value={products.rating.toFixed(1)}/> <div style = {{fontSize: "1.5rem"}}>{products.rating.toFixed(1)}</div>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          <div style = {{fontSize: "1rem"}}>Number of reviews: {products.numReviews}</div>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
               }
               </>
              )
             }
           </>
        ) : (
          <div style = {{fontSize: '4rem'}} >No products found</div>
        ) }
      </div>
    </>
  )
}

export default Home
