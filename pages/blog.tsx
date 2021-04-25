
import React, { useEffect, useState } from 'react';
import withAuthentication from "hoc/withAuthentication";
import Layout from 'components/Layout';
import Head from 'next/head';
import { Container } from '@chakra-ui/layout';
import BlogCard from 'components/BlogCard';
import { Box, SimpleGrid, Stack } from '@chakra-ui/react';
import { Skeleton, SkeletonText } from "@chakra-ui/react"
import fireBaseAuth from 'firebase';


const Loader = () => {
    return <Box boxShadow="md" mb="5">
        <Stack>
            <Skeleton height="178px" />
            <Box p="4">
                <SkeletonText noOfLines={2} spacing="4" />
            </Box>
        </Stack>
    </Box>
}


const Blog = () => {
    const [blogList, setBlogList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const getBlogs = React.useCallback(() => {
        try {
            const db = fireBaseAuth.firestore();
            db.collection('blogs').onSnapshot((snapshot) => {
                setLoading(true);
                const changes = snapshot.docChanges();
                changes.forEach(change => {
                    if (change.type === 'added') {
                        setBlogTOState(change.doc);
                    } else if (change.type === 'removed') {
                        removeBlogFromState(change.doc.id);
                    } else if (change.type === 'modified') {
                        updateBLogState(change.doc);
                    }
                });
                setLoading(false);

            })
        } catch (error) {
            throw error;
        }
    }, []);

    const setBlogTOState = (doc) => {
        const newDoc = { id: doc.id, ...doc.data() };
        setBlogList((oldValue) => [newDoc, ...oldValue]);
    }

    const removeBlogFromState = (id: string) => {
        setBlogList((oldValue) => {
            const filteredData = oldValue.filter(row => { return row.id !== id });
            return [...filteredData]
        });
    }

    const updateBLogState = (doc) => {
        setBlogList((oldValue) => {
            oldValue.forEach((row, i) => {
                if (row.id === doc.id) {
                    oldValue[i] = { id: doc.id, ...doc.data() };
                }
            });
            return [...oldValue]
        });
    }

    useEffect(() => {
        getBlogs();
    }, [])
    return (
        <Layout>
            <Head>
                <title>Blogs</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container maxW="container.xl" mt="10">
                <SimpleGrid columns={[1, 4]} spacing="20px">

                    {isLoading && [1, 2, 3, 4].map(i => { return <Loader key={i} /> })}
                    {
                        !isLoading && blogList && blogList.map((doc: any) => {
                            return <BlogCard key={doc.id} {...doc} />
                        })
                    }
                </SimpleGrid>
            </Container>
        </Layout>
    );
};

export default withAuthentication(Blog);
