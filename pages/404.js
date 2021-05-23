import React from 'react';
import Head from 'next/head';

//css
import styles from '../styles/Error.module.css'

//router
import { useRouter } from 'next/router'


const About = () => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Couldn't find URL {router.asPath}</title>
      </Head>
      <div>
        <div className={styles.container}>
          <div style={{padding: "1rem"}}>
            <p className={styles.header}>404</p>
            <p className={styles.header}>Couldn't find URL <span style={{color:"#D52D2D"}}>{router.asPath}</span></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default About;
