import React, { useRef, useEffect } from "react";
import Head from "next/head";
import styles from "styles/Home.module.css";
import DynamicText from "components/DynamicText";
import { Input, Box, Container } from "@chakra-ui/react";
import withAuthentication from "hoc/withAuthentication";
import Layout from 'components/Layout';

interface DynamicTextInterface {
  changeValue: (arg0: string) => void,
  value: string
}

const Home = () => {

  const dynamicTextRef = useRef<DynamicTextInterface>();
  // const inputRef = useRef(null);

  // useEffect(() => {
  //   inputRef.current.value = dynamicTextRef.current.value;
  // })
  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dynamicTextRef.current.changeValue(e.target.value);
  // };

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container maxW="container.sm" mt="10">
          <main className={styles.main}>
            <Box mb={5}>
              <DynamicText ref={dynamicTextRef} />
            </Box>
            {/* <Input onChange={onChange} ref={inputRef} /> */}
          </main>
        </Container>
      </div>
    </Layout>
  );
};

export default withAuthentication(Home);
