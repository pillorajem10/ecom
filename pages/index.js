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
    whiteSpace: 'nowrap',
    marginTop: '1rem'
  },
  root1: {
    maxHeight: "26.5rem",
    maxWidth: "12rem",
    marginTop: '1rem',
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
             products.map((products, idx) =>
              <>
               { lowReso ?
                 <Link href = {`/product/${products._id}`} key={idx}>
                   <Card key={products.name} className={classes.root}>
                      <CardMedia
                        component="img"
                        alt={products.name}
                        height="150"
                        image={products.photo}
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
                  <Link href = {`/product/${products._id}`} key={idx}>
                    <Card key={products.name} className={classes.root1}>
                        <CardMedia
                          component="img"
                          alt={products.name}
                          height="200"
                          image={`${products.photo}`}
                          title={products.name}
                        />
                      <CardContent>
                        <Typography gutterBottom component="div">
                          {products.name}
                        </Typography>
                        {
                          products.minPrice === products.maxPrice ? (
                            <Typography variant="body2" color="textSecondary" component="div">
                              <div style = {{fontSize: "1rem"}}>₱{products.minPrice}</div>
                            </Typography>
                          ) : (
                            <Typography variant="body2" color="textSecondary" component="div">
                              <div style = {{fontSize: "1rem"}}>₱{products.minPrice} - ₱{products.maxPrice}</div>
                            </Typography>
                          )
                        }
                        <div variant="body2" className={styles.ratingsContainer} component="div">
                          <div style = {{fontSize: "1rem"}}>{products.rating.toFixed(1)}</div><div style={{marginLeft: ".5rem"}}><Rating precision={.2} readOnly value={products.rating.toFixed(1)}/></div>
                        </div>
                        <div className={styles.soldAndShippedFromCont}>
                          <Typography variant="body2" color="textSecondary" component="div">
                            <div style = {{fontSize: "1rem"}}>{products.sold} sold</div>
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="div">
                            <div style = {{fontSize: "1rem"}}>{products.shippedFrom}</div>
                          </Typography>
                        </div>
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
