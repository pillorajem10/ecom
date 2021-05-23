import React from 'react';
import Head from 'next/head';

//css
import styles from '../styles/Error.module.css'

//router
import { useRouter } from 'next/router'

import ErrorPage from './404';


const About = () => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Couldn't find URL {router.asPath}</title>
      </Head>
      <ErrorPage/>
    </>
  )
}

export default About;
