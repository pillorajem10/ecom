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
import Rating from '@material-ui/lab/Rating';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Pagination from "@material-ui/lab/Pagination";
import { useMediaQuery } from '@material-ui/core';

//moment
import moment from 'moment';

//styling for material-ui
const useStyles = makeStyles((theme) => ({
  /*
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '30rem'
  },
 */
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '50%',
    '& label.Mui-focused': {
      color: '#FF3F16',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#FF3F16',
        },
    },
  },
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
  const [reviewList, setReviewList] = useState([]);
  const [pageDetails, setPageDetails] = useState(null);
  const [pageDetailsReview, setPageDetailsReview] = useState(null);
  const [pageSize] = useState(5);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const lowReso = useMediaQuery('(max-width: 519px)');

  const { loading, error } = useSelector(state => state.productDetails);
  const { loadingReviews, errorReviews  } = useSelector(state => state.reviewList);
  const { loadingAddRev, errorAddRev, success: recipeReviewSave } = useSelector((state) => state.reviewAdd);
  const { user } = useSelector(state => state.userSignin);
  const { userInfo } = useSelector(state => state.userRegister);

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

  const handleReviewsList = useCallback(
    (pageIndex = 1) => {
      dispatch(ecom.product.listReviews(product._id, pageIndex, pageSize))
        .then((data) => {
          if (data) {
            setReviewList(data.docs);
            setPageDetailsReview({
              pageIndex: data.page,
              pageSize: data.limit,
              totalPages: data.totalPages,
              totalDocs: data.totalDocs
            });
            console.log('[[PAGE DETAILS]]', pageDetailsReview)
          }
        })
    },
    [dispatch, pageSize, product._id],
  );

  const handleProductList = useCallback(
    (pageIndex = 1) => {
      dispatch(ecom.product.relatedProducts(pageIndex, pageSize, product.category._id))
        .then((data) => {
          if (data) {
            setProductList(data.docs);
            setPageDetails({
              pageIndex: data.page,
              pageSize: data.limit,
              totalPages: data.totalPages,
              totalDocs: data.totalDocs
            });
          }
        })
    },
    [dispatch, pageSize, product.category._id],
  );


  useEffect(() => {
    dispatch(ecom.product.detailsProduct(product._id));
    return () => {
      //
    };
  }, []);

  useEffect(() => {
    handleProductList();
  }, [handleProductList]);

  useEffect(() => {
    console.log('REBYUUUUUUU EPEK LOL')
    handleReviewsList();
  }, [handleReviewsList]);

  const submitHandler = (e) => {
  e.preventDefault();
  if(user) {
    dispatch(ecom.product.saveRecipeReview(product._id, {
      userId: user._id,
      product: product._id,
      comment: comment,
      rating: rating,
    })).then((data) => {
      if (data) {
        handleReviewsList();
      }
    });
  } else {
    dispatch(ecom.product.saveRecipeReview(product._id, {
      userId: userInfo._id,
      product: product._id,
      comment: comment,
      rating: rating,
    })).then((data) => {
      if (data) {
        handleReviewsList();
      }
    });
  }
  setRating(1);
  setComment('');
  setOpenSnackBar(true);
};

const handleChangePageIndex = (event, value) => {
  handleReviewsList(value);
};

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
    setOpenSnackBar(false);
};

const showSuccess = () => (
  <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBar} autoHideDuration={3000} onClose={handleClose}>
    <Alert severity="success">Comment added</Alert>
  </Snackbar>
);
const showError = () => (
  <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBar} autoHideDuration={3000} onClose={handleClose}>
    <Alert severity="error">{errorAddRev}</Alert>
  </Snackbar>
);

  return (
    loading || loadingAddRev  ? <center className='loading1' ><CircularProgress color = 'inherit' /></center> : error ? <div>{error}</div> :
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
        {recipeReviewSave && showSuccess()}
        {errorAddRev && showError()}
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

      {/*reviews section*/}
      <center style={{fontSize: "2rem", marginTop: "4rem"}}>Reviews</center>
      {userInfo || user ? (
       <>
         <div className={styles.reviewContainer}>
         <div>Rate this product</div>
           <Rating
             name="rating"
             id='rating'
             value={rating}
             onChange={(event, newValue) => {
               setRating(newValue);
             }}
           />
           <form className onSubmit = {submitHandler}>
             <div>
              <Box
                boxShadow={0}
                bgcolor="background.paper"
                m={0}
                p={0}
                style={{ width: '100%', height: '100&' }}
              >
                <FormControl className={(classes.margin, classes.textField)}>
                  <TextField
                    id="comment"
                    label="Write your comment here"
                    multiline
                    name="comment"
                    required
                    onChange={(e) => setComment(e.target.value)}
                    variant="outlined"
                    rows={4}
                  />
                 <Button style={{ marginTop: '2%' }} variant="contained" type="submit">Comment</Button>
               </FormControl>
            </Box>
          </div>
        </form>
      </div>
    </>
    ) : (
     <div style={{fontSize: "1.5rem"}} className = 'reviews1'>
       <Link href = "/signin">Please Sign-in to write a review.</Link>
     </div>
    )}
      <div>
      { loadingReviews && <CircularProgress color='inherit'/> }
      { reviewList.length > 0 ? (
        <>
          {
           reviewList.map((review, idx) =>
            <>
              <Card className={styles.reviewContainerCard} key={idx}>
                <div className={styles.reviewContainer}>
                  {review.userId[0]._id === product.seller._id ? (
                    <div>{review.userId[0].full_name} (Seller)</div>
                  ) : (
                    <div>{review.userId[0].full_name}</div>
                  )}
                  <div><Rating precision={.1} readOnly value={review.rating}/></div>
                  <div>{review.comment}</div>
                  <div>Posted: <b>{moment(review.createdAt).fromNow()}</b></div>
                  { user ? (
                    <>
                      { review.userId[0]._id === user._id ? (
                        <div className={styles.reviewButtonsCont}>
                          <Button variant="outlined" size="small" color="secondary">Delete</Button>
                          <Button variant="outlined" size="small" color="primary">Edit</Button>
                        </div>
                      ) : (
                        null
                      ) }
                    </>
                  ) : (
                    null
                  ) }
                  {
                    userInfo ? (
                      <>
                        { review.userId[0]._id === userInfo._id ? (
                          <div className={styles.reviewButtonsCont}>
                            <Button variant="outlined" size="small" color="secondary">Delete</Button>
                            <Button variant="outlined" size="small" color="primary">Edit</Button>
                          </div>
                        ) : (
                          null
                        ) }
                      </>
                    ) : (
                      null
                    )
                  }
                </div>
              </Card>
            </>
            )
           }
         </>
      ) : (
      <div style={{fontSize: "1.5rem"}} className={styles.reviewContainer}>No reviews, right the first one</div>
      ) }
      </div>
      <Pagination
        style = {{ display: loading && 'none' }}
        count={pageDetailsReview && pageDetailsReview.totalPages}
        page={pageDetailsReview && pageDetailsReview.pageIndex}
        defaultPage={1}
        color="primary"
        size="large"
        onChange={handleChangePageIndex}
        classes={{ ul: classes.paginator }}
      />

      {/*other products*/}
      <center style={{fontSize: "2rem", marginTop: "4rem"}}>Related products</center>
      <div className={styles.containerProductList}>
        { productList.length > 0 ? (
          <>
            {
             productList.map((productList, idx) =>
              <>
               { lowReso ?
                 <Link href = {`/product/${productList._id}`} key={idx}>
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

                  <Link href = {`/product/${productList._id}`} key={idx}>
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
          <div style = {{fontSize: '4rem'}} >No product found</div>
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
