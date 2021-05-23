import React, { useEffect, useState } from 'react';

//next js
import Head from 'next/head'

//redux
import { useSelector, useDispatch } from 'react-redux';
import { ecom } from '../../../redux/combineActions';

//navigation
//import { Link } from 'react-router-dom';
import { useRouter } from 'next/router';

//css
import styles from '../../../styles/Details.module.css'

//material-ui
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import CreateIcon from '@material-ui/icons/Create';
import DescriptionIcon from '@material-ui/icons/Description';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

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
}));

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

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

  useEffect(() => {
    dispatch(ecom.product.detailsProduct(product._id));
    console.log('QUANTITY', quantity)
    return () => {
      //
    };
  }, []);

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
            height="100%"
            image={`/api/product/photo/${product._id}`}
            title={product.name}
          />
        </div>
        <Card>
          <div className={styles.containerRight}>
            <div className={styles.prodName}>{product.name}</div>
            <p className={styles.price}>₱{product.price}</p>
            <p className={styles.description}>{product.description}</p>
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
