import React from 'react';
import Image from 'next/image';

//prop-types
import PropTypes from 'prop-types';

//navigation
import Link from 'next/link';

//material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';


//css
import styles from '../styles/Navbar.module.css';

import logo from '../public/images/jemp.png';


const HideOnScroll = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const HideAppBar = () => {

  return (
    <React.Fragment>
      <nav  className={styles.nav}>
      <HideOnScroll>
        <AppBar style={{ background: '#2E2E2E' }}>
          <Toolbar>
            <ul>
              <li>
                <Image
                  src={logo}
                  alt="Picture of a triangle"
                  width={500}
                  height={155}
                />
              </li>
              <li>
                <Link href="/">Home</Link>
              </li>
            </ul>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      </nav>
      <Toolbar />
    </React.Fragment>
  );
}

export default HideAppBar
