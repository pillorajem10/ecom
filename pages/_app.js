//main layout
import Layout from '../components/Layout';

//components
import Navbar from '../components/Navbar';
import NavbarLowReso from '../components/NavbarLowReso';

//material-ui
import { useMediaQuery } from '@material-ui/core';

//css
import '../styles/globals.css';

//redux
import { Provider } from 'react-redux';
import store from '../redux/store'

function MyApp({ Component, pageProps }) {
  const showNavbarLow = useMediaQuery("(max-width: 635px)");

  return (
    <>
      <Provider store={store}>
        { showNavbarLow ? <NavbarLowReso/> : <Navbar/> }
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  )
}

export default MyApp
