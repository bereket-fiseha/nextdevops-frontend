import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";
import "../i18next";
import Amplify from "aws-amplify";
import React from "react";
import config from "../src/aws-exports";
import App from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import store from "../redux/store";
import ProtectedRoute from "../components/ProtectedRoute";
import Head from "next/head";
import '../components/BOL/assets/style.css';

Amplify.configure({
  ...config,
  ssr: true,
});

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const appProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    console.log(appProps);
    return { appProps: appProps };
  }

  render() {
    const { Component, appProps } = this.props;

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
        </Head>
        <ProtectedRoute>
          <Provider store={store}>
            <Layout>
              <Component {...appProps} />
            </Layout>
          </Provider>
        </ProtectedRoute>
      </>
    );
  }
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
