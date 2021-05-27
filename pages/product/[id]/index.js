import React, { useEffect, useState, useCallback } from 'react';

//next js
import Head from 'next/head'

//redux
import { useSelector, useDispatch } from 'react-redux';
import { ecom } from '../../../redux/combineActions';

//navigation
import Link from 'next/link';
import { useRouter } from 'next/router';

//css
import styles from '../../../styles/Details.module.css'

//material-ui
//import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import CircularProgress from '@material-ui/core/CircularProgress';
//import Alert from '@material-ui/lab/Alert';
//import Snackbar from '@material-ui/core/Snackbar';
//import FormControl from '@material-ui/core/FormControl';
//import TextField from '@material-ui/core/TextField';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

//styling for material-ui
const useStyles = makeStyles((theme) => ({
  /*
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '30rem'
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100%',
    '& label.Mui-focused': {
      color: '#FF3F16',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#FF3F16',
        },
    },
  },
  */
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
}));

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [productList, setProductList] = useState([]);

  const lowReso = useMediaQuery('(max-width: 519px)');

  const { loading, error} = useSelector(state => state.productDetails);

  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();

  const incQuantity = () => {
    if(quantity >= 10) {
      setQuantity(10)
    } else {
      setQuantity(quantity + 1)
    }
  }

  const decQuantity = (event) => {
    if(quantity <= 1) {
      setQuantity(1)
    } else {
      setQuantity(quantity - 1)
    }
  }

  const handleProductList = useCallback(
    () => {
      dispatch(ecom.product.listProduct())
        .then((data) => {
          if (data) {
            setProductList(data);
          }
        })
    },
    [dispatch],
  );


  useEffect(() => {
    dispatch(ecom.product.detailsProduct(product._id));
    console.log('QUANTITY', quantity)
    return () => {
      //
    };
  }, []);

  useEffect(() => {
    handleProductList();
  }, [handleProductList]);

  return (
    loading? <center className='loading1' ><CircularProgress color = 'inherit' /></center> : error ? <div>{error}</div> :
    <>
      <Head>
        <title>{product.name}</title>
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
        <meta property="og:image" content={`/api/product/photo/${product._id}`} key="ogimage" />
        <meta property="og:url" content="https://jempillora.vercel.app/" key="ogurl" />
        <meta property="og:site_name" content="Jem Pillora" key="ogsitename" />
        <meta property="og:title" content="Jem Pillora" key="ogtitle" />
      </Head>
      <div className={styles.container}>
        <div className={styles.containerLeft}>
          <CardMedia
            component="img"
            alt={product.name}
            height="500"
            image={`/api/product/photo/${product._id}`}
            title={product.name}
          />
        </div>
        <Card>
          <div className={styles.containerRight}>
            <div className={styles.prodName}>{product.name}</div>
            <p className={styles.price}>₱{product.price}</p>
            <p className={styles.description}>{product.description}</p>
            <p><b>Seller: </b>{product.seller.full_name}</p>
            <p><b>Category: </b>{product.category.name}</p>
            <p><b>Brand: </b>{product.brand.name}</p>
            <div className={styles.actionContainer}>
              <div className={styles.quantityContainer}>
                <button className={styles.quantityBtn} onClick={decQuantity}>-</button>
                <input className={styles.quantityInput} value={quantity}/>
                <button className={styles.quantityBtn} onClick={incQuantity}>+</button>
              </div>
              <button className={styles.addToCartBtn}>Add to cart</button>
            </div>
          </div>
        </Card>
      </div>
      <center style={{fontSize: "2rem", marginTop: "4rem"}}>Other products</center>
      <div className={styles.containerProductList}>
        { productList.length > 0 ? (
          <>
            {
             productList.map( productList =>
              <>
               { lowReso ?
                 <Link href = {`/product/${productList._id}`}>
                   <Card key={productList.name} className={classes.root}>
                      <CardMedia
                        component="img"
                        alt={productList.name}
                        height="150"
                        image={`/api/product/photo/${productList._id}`}
                        title={productList.name}
                      />
                      <CardContent>
                        <Typography>
                        <Box
                          component="div"
                          my={0}
                          textOverflow="ellipsis"
                          overflow="hidden"
                        >
                          <b>{productList.name}</b>
                        </Box>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                  :

                  <Link href = {`/product/${productList._id}`}>
                    <Card key={productList.name} className={classes.root1}>
                        <CardMedia
                          component="img"
                          alt={productList.name}
                          height="250"
                          image={`/api/product/photo/${productList._id}`}
                          title={productList.name}
                        />
                      <CardContent>
                        <Typography gutterBottom variant="h6">
                          <Box
                            component="div"
                            my={2}
                            textOverflow="ellipsis"
                            overflow="hidden"
                          >
                            {productList.name}
                          </Box>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          <Rating precision={.2} readOnly value={productList.rating.toFixed(1)}/> <div style = {{fontSize: "1.5rem"}}>{productList.rating.toFixed(1)}</div>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          <div style = {{fontSize: "1rem"}}>Number of reviews: {productList.numReviews}</div>
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
          <div style = {{fontSize: '4rem'}} >No productList found</div>
        ) }
      </div>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const res = await fetch(`http://127.0.0.1:3001/api/product/get/${context.params.id}`);
  const product = await res.json();
  return {
    props: { product }
  }
}

export default ProductDetails;
