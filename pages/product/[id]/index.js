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
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
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
      color: '#2e2e2e',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#2e2e2e',
        },
    },
  },
  shipping: {
    width: '50%',
    fontSize: '.5rem',
    '& label.Mui-focused': {
      color: '#2e2e2e',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#2e2e2e',
        },
    },
  },
  variant: {
    width: '100%',
    fontSize: '.5rem',
    '& label.Mui-focused': {
      color: '#2e2e2e',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#2e2e2e',
        },
    },
  },
  textField1: {
    width: '100%',
    '& label.Mui-focused': {
      color: '#2e2e2e',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#2e2e2e',
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '30rem'
  },
  paper1: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ProductDetails = ({ product }) => {
  //quantity
  const [quantity, setQuantity] = useState(1);

  //lists
  const [productList, setProductList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [shiptoList, setShipToList] = useState([]);
  const [subcityList, setSubcityList] = useState([]);

  //pagination
  const [pageDetails, setPageDetails] = useState(null);
  const [pageDetailsReview, setPageDetailsReview] = useState(null);
  const [pageSize] = useState(5);

  //reviews
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [updatedComment, setUpdatedComment] = useState('');
  const [updatedRating, setUpdatedRating] = useState(1);
    const [selectedReview, setSelectedReview] = useState({});

  //alerts
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [openSnackBarForDeleteRev, setOpenSnackBarForDeleteRev] = useState(false);
  const [openSnackBarForUpdtRev, setOpenSnackBarForUpdtRev] = useState(false);
  const [openSnackBarDelRevWarning, setOpenSnackBarDelRevWarning] = useState(false);
  const [openModalForReviewUpdt, setOpenModalForReviewUpdt] = useState(false);

  //Shipping
  const [selectedShipTo, setSelectedShipTo] = useState('');

  const lowReso = useMediaQuery('(max-width: 519px)');

  const { loading, error } = useSelector(state => state.productDetails);
  const { loadingReviews, errorReviews  } = useSelector(state => state.reviewList);
  const { loadingAddRev, errorAddRev, success: recipeReviewSave } = useSelector((state) => state.reviewAdd);
  const { loadingDelRev, errorDelRev, successDelRev } = useSelector((state) => state.reviewDel);
  const { loadingUpdtRev, errorUpdtRev, successUpdtRev } = useSelector((state) => state.reviewUpdate);
  const { loadingShipto, errorShipto } = useSelector(state => state.shipList);
  const { loadingSubcities, errorSubcities } = useSelector(state => state.subcityList);
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

  const selectShipToHandler = (e) => {
    setSelectedShipTo(e.target.value);
    console.log('SHIP TO NAME', e.target.value);
    dispatch(ecom.shipto.getShippingPlace(selectedShipTo));
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
          }
        })
    },
    [dispatch, pageSize, product._id],
  );

  const handleSubcityList = useCallback(
    (pageIndex = 1) => {
      dispatch(ecom.shipto.listSubCities(selectedShipTo))
        .then((data) => {
          if (data) {
            setSubcityList(data.docs);
          }
        })
    },
    [dispatch, selectedShipTo],
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

  const handleShipToList = useCallback(
    () => {
      dispatch(ecom.shipto.listShipTo())
        .then((data) => {
          if (data) {
            setShipToList(data);
          }
        })
    },
    [dispatch],
  );

  const handleOpenModal = (review) => {
    setOpenSnackBarDelRevWarning(true);
    setSelectedReview(review);
  };

  const handleOpenModalForUpdtModal = (review) => {
    setOpenModalForReviewUpdt(true);
    setUpdatedComment(review.comment);
    setUpdatedRating(review.rating);
    console.log('REVIEW ID', review._id);
    setSelectedReview(review);
  };

  const handleDeleteReview = () => {
    dispatch(ecom.product.reviewDelete(product._id, selectedReview._id)).then((data) => {
      if (data) {
        handleReviewsList();
      }
    });
    setOpenSnackBarDelRevWarning(false);
    setOpenSnackBarForDeleteRev(true);
  }

  useEffect(() => {
    dispatch(ecom.product.detailsProduct(product._id));
    handleProductList();
    handleSubcityList();
    handleReviewsList();
    handleShipToList();
  }, [handleProductList, handleReviewsList, handleShipToList, handleSubcityList]);

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
        setComment('');
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
        setComment('');
      }
    });
  }
  setRating(1);
  console.log('COMMENT', comment)
  setOpenSnackBar(true);
};

const submitHandlerForUpdate = (e) => {
e.preventDefault();
setOpenSnackBarForUpdtRev(true);
if(user) {
  dispatch(ecom.product.updateReview(product._id, selectedReview._id, {
    comment: updatedComment,
    rating: updatedRating,
  })).then((data) => {
    if (data) {
      handleReviewsList();
      setUpdatedRating(1);
      setUpdatedComment('');
      setOpenModalForReviewUpdt(false);
    }
  });
} else {
  dispatch(ecom.product.updateReview(product._id, selectedReview._id, {
    comment: updatedComment,
    rating: updatedRating,
  })).then((data) => {
    if (data) {
      handleReviewsList();
      setUpdatedRating(1);
      setUpdatedComment('');
      setOpenModalForReviewUpdt(false);
    }
  });
 }
};

const handleChangePageIndex = (event, value) => {
  handleReviewsList(value);
};

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpenSnackBar(false);
  setOpenSnackBarForDeleteRev(false);
  setOpenSnackBarForUpdtRev(false);
};

const handleCloseModal = () => {
  setOpenSnackBarDelRevWarning(false);
  setOpenModalForReviewUpdt(false);
};

const showSuccess = () => (
  <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBar} autoHideDuration={3000} onClose={handleClose}>
    <Alert severity="success">Review successfully added</Alert>
  </Snackbar>
);

const showSuccessForDeleteRev = () => (
  <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBarForDeleteRev} autoHideDuration={3000} onClose={handleClose}>
    <Alert severity="success">Review deleted successfully</Alert>
  </Snackbar>
);

const showError = () => (
  <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBar} autoHideDuration={3000} onClose={handleClose}>
    <Alert severity="error">{errorAddRev}</Alert>
  </Snackbar>
);

const showSuccessForUpdtRev = () => (
  <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBarForUpdtRev} autoHideDuration={3000} onClose={handleClose}>
    <Alert severity="success">Review successfully updated</Alert>
  </Snackbar>
);

const showErrorForUpdtRev = () => (
  <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBarForUpdtRev} autoHideDuration={3000} onClose={handleClose}>
    <Alert severity="error">{errorUpdtRev}</Alert>
  </Snackbar>
);


  return (
    loading ? <center className='loading1' ><CircularProgress color = 'inherit' /></center> : error ? <div>{error}</div> :
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content={product.photo} key="ogimage" />
        <meta property="og:url" content="https://jempillora.vercel.app/" key="ogurl" />
        <meta property="og:site_name" content="Jem Pillora" key="ogsitename" />
        <meta property="og:title" content="Jem Pillora" key="ogtitle" />
      </Head>
      <div className={styles.container}>
        {recipeReviewSave && showSuccess()}
        {errorAddRev && showError()}
        {successDelRev && showSuccessForDeleteRev()}
        {successUpdtRev && showSuccessForUpdtRev()}
        {errorUpdtRev && showErrorForUpdtRev()}
        <div className={styles.containerLeft}>
          <div style={{margin: "1rem"}}>
            <CardMedia
              component="img"
              alt={product.name}
              height="550"
              image={product.photo}
              title={product.name}
            />
            <div style={{marginTop: "2rem"}}>
              <div style={{fontSize: "1.5rem"}}>Product Specifacations:</div>
              <p><b>Category:</b> {product.category.name}</p>
              <p><b>Brand:</b> {product.brand.name}</p>
              <p><b>Stock:</b> {product.quantity}</p>
              <p><b>Shipped From:</b> {product.shippedFrom}</p>
              <div style={{fontSize: "1.5rem"}}>Product Description:</div>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
        <div className={styles.containerRight}>
          <div style={{margin: "1rem"}}>
            <div className={styles.prodName}>{product.name}</div>
            <div className={styles.ratingsContainer}>
              <div style={{fontSize: "1.2rem"}}>{product.rating.toFixed(1)}</div>
              <Rating precision={.2} readOnly value={product.rating.toFixed(1)}/> <div style = {{fontSize: "1.5rem"}}/>
              <div style={{fontSize: "1rem", marginLeft: "1rem"}}><b>Ratings:</b> {product.numReviews}</div>
              <div style={{fontSize: "1rem", marginLeft: "1rem"}}><b>Sold:</b> {product.sold}</div>
            </div>
            <p className={styles.price}>
            {
              product.minPrice === product.maxPrice ? (
                <>₱{product.minPrice}</>
              ) : (
                <>₱{product.minPrice} - ₱{product.maxPrice}</>
              )
            }
            </p>
            <p><b>Variants:</b></p>
            {product.variants.length > 1 ? (
              <FormControl className={(classes.margin, classes.variant)}>
                <Select
                  native
                  required
                  variant="outlined"
                  inputProps={{
                    name: 'variant',
                    id: 'variant',
                  }}
                >
                  <option value = "">Select Variant</option>
                  {
                   product.variants.map((variant, index) => (
                     <option key={index} value={variant._id}>
                        {variant.variantName}
                     </option>
                  ))}
                </Select>
              </FormControl>
              ) : (
                null
              )
            }
            <p><b>Seller: </b>{product.seller.full_name}</p>
            <p><b>Shipping:</b></p>
            <div className={styles.actionContainer}>
              <FormControl className={(classes.margin, classes.shipping)}>
                <Select
                  native
                  required
                  onChange={selectShipToHandler}
                  variant="outlined"
                  value={selectedShipTo}
                  inputProps={{
                    name: 'shipTo',
                    id: 'shipTo',
                  }}
                >
                  <option value="">Ship To</option>
                  {
                   shiptoList.map((shipTo, index) => (
                     <option key={index} value={shipTo._id}>
                        {shipTo.name}
                     </option>
                  ))}
                </Select>
              </FormControl>
              { selectedShipTo === "" ? (
                <FormControl className={(classes.margin, classes.shipping)} disabled>
                  <Select
                    native
                    required
                    style={{marginLeft: "1rem"}}
                    variant="outlined"
                    inputProps={{
                      name: 'subCity',
                      id: 'subCity',
                    }}
                  >
                    <option value = "">Select City</option>
                    {
                     subcityList.map((subcity, index) => (
                       <option key={index} value={subcity._id}>
                          {subcity.name}
                       </option>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <FormControl className={(classes.margin, classes.shipping)}>
                  <Select
                    native
                    required
                    style={{marginLeft: "1rem"}}
                    variant="outlined"
                    inputProps={{
                      name: 'subCity',
                      id: 'subCity',
                    }}
                  >
                    <option value = "">Select City</option>
                    {
                     subcityList.map((subcity, index) => (
                       <option key={index} value={subcity._id}>
                          {subcity.name}
                       </option>
                    ))}
                  </Select>
                </FormControl>
              ) }
            </div>
            <p className={styles.actionContainer}>
              <div className={styles.quantityContainer}>
                <button className={styles.quantityBtn} onClick={decQuantity}>-</button>
                <input className={styles.quantityInput} value={quantity} readOnly/>
                <button className={styles.quantityBtn} onClick={incQuantity}>+</button>
              </div>
              <button className={styles.addToCartBtn}>Add to cart</button>
            </p>
          </div>
        </div>
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
                    value={comment}
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
     <div style={{fontSize: "1.5rem", marginLeft: "1rem"}} className = 'reviews1'>
       <Link href = "/signin"><span style={{color: "orange"}}>Please Sign-in to write a review.</span></Link>
     </div>
    )}
      <div>
      { loadingReviews && <CircularProgress color='inherit'/> }
      { loadingAddRev && <CircularProgress color='inherit'/> }
      { loadingDelRev && <CircularProgress color='inherit'/> }
      { loadingUpdtRev && <CircularProgress color='inherit'/> }
      { loadingShipto && <CircularProgress color='inherit'/> }
      {/* loadingSubcities && <CircularProgress color='inherit'/> */}
      { reviewList.length > 0 ? (
        <>
          {
           reviewList.map((review, idx) => {
             return (
               <>
                 <Card style = {{ display: loadingReviews || loadingAddRev || loadingDelRev || loadingUpdtRev || loadingShipto || loadingSubcities ? ('none') : (null) }} className={styles.reviewContainerCard} key={idx}>
                   <div className={styles.reviewContainer}>
                     {review.userId[0]._id === product.seller._id ? (
                       <div>{review.userId[0].full_name} (Seller)</div>
                     ) : (
                       <div>{review.userId[0].full_name}</div>
                     )}
                     <div style={{marginTop: ".5rem"}}><Rating size="small" precision={.1} readOnly value={review.rating}/></div>
                     <div style={{marginTop: ".5rem"}}>{review.comment}</div>
                     <div style={{marginTop: ".5rem"}}>Posted: <b>{moment(review.createdAt).fromNow()}</b></div>
                     { user ? (
                       <>
                         { review.userId[0]._id === user._id ? (
                           <div className={styles.reviewButtonsCont}>
                             <Button onClick={() => handleOpenModal(review)} variant="outlined" size="small" color="secondary">Delete</Button>
                             <Button onClick={() => handleOpenModalForUpdtModal(review)} variant="outlined" size="small" color="primary">Edit</Button>
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
                               <Button onClick={() => handleOpenModal(review)} variant="outlined" size="small" color="secondary">Delete</Button>
                               <Button onClick={() => handleOpenModalForUpdtModal(review)} variant="outlined" size="small" color="primary">Edit</Button>
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
            )
           }
         </>
      ) : (
      <div style={{fontSize: "1.5rem"}} className={styles.reviewContainer}>No reviews, right the first one</div>
      ) }
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openSnackBarDelRevWarning}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openSnackBarDelRevWarning}>
          <div className={classes.paper1}>
            <p id="transition-modal-description">Are you sure you want to delete this review?</p>
            <div className={styles.alertButtonCont}>
              <Button onClick={() => handleDeleteReview()} size="small" variant="contained">Yes</Button>
              <Button onClick={handleCloseModal} size="small" variant="contained" >No</Button>
            </div>
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModalForReviewUpdt}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalForReviewUpdt}>
          <div className={classes.paper}>
            <Rating
              name="updatedRating"
              id='updatedRating'
              value={updatedRating}
              onChange={(event, newValue) => {
                setUpdatedRating(newValue);
              }}
            />
            <form style={{marginTop: "1rem"}} className onSubmit = {submitHandlerForUpdate}>
              <div>
               <Box
                 boxShadow={0}
                 m={0}
                 p={0}
                 style={{ width: '100%', height: '100&' }}
               >
                 <FormControl className={(classes.margin, classes.textField1)}>
                   <TextField
                     id="updatedComment"
                     label="Write your comment here"
                     multiline
                     name="updatedComment"
                     required
                     value={updatedComment}
                     onChange={(e) => setUpdatedComment(e.target.value)}
                     variant="outlined"
                     rows={4}
                   />
                  <Button style={{ marginTop: '2%' }} variant="contained" type="submit">Comment</Button>
                  <Button color="secondary" style={{ marginTop: '2%' }} variant="contained" onClick={() =>setOpenModalForReviewUpdt(false)}>Cancel</Button>
                </FormControl>
             </Box>
             </div>
           </form>
          </div>
        </Fade>
      </Modal>
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
                        image={product.photo}
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
                          height="200"
                          image={`${productList.photo}`}
                          title={productList.name}
                        />
                      <CardContent>
                        <Typography style={{fontSize: '1.2rem'}} gutterBottom component="div">
                          {productList.name}
                        </Typography>
                        {
                          productList.minPrice === productList.maxPrice ? (
                            <Typography variant="body2" color="textSecondary" component="div">
                              <div style = {{fontSize: "1rem"}}>₱{productList.minPrice}</div>
                            </Typography>
                          ) : (
                            <Typography variant="body2" color="textSecondary" component="div">
                              <div style = {{fontSize: "1rem"}}>₱{productList.minPrice} - ₱{productList.maxPrice}</div>
                            </Typography>
                          )
                        }
                        <div variant="body2" className={styles.ratingsContainer} component="div">
                          <div style = {{fontSize: "1rem"}}>{productList.rating.toFixed(1)}</div><div style={{marginLeft: ".5rem"}}><Rating precision={.2} readOnly value={productList.rating.toFixed(1)}/></div>
                        </div>
                        <div className={styles.soldAndShippedFromCont}>
                          <Typography variant="body2" color="textSecondary" component="div">
                            <div style = {{fontSize: "1rem"}}>{productList.sold} sold</div>
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="div">
                            <div style = {{fontSize: "1rem"}}>{productList.shippedFrom}</div>
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
