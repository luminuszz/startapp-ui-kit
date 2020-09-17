/* eslint-disable no-use-before-define */
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import React from 'react';

const CustomApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default CustomApp;
