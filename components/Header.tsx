import React from 'react';
import { Container, Box, Flex, Spacer, Button, Text } from "@chakra-ui/react";
import { useAuthContext } from 'hooks/authentication';
import Link from 'next/link';



const Header = () => {
    const { userData, signout } = useAuthContext();
    return (
        <Box bg="tomato" w="100%" p={4} color="white" position="sticky">
            <Container maxW="container.xl" >
                <Flex alignItems="center">
                    <Box fontWeight="bold" mr="3">App Logo</Box>
                    <Box mr="3">
                        <Link href="/">
                            Home
                        </Link>
                    </Box>
                    <Box mr="3">
                        <Link href="/blog">
                            Blog
                        </Link>
                    </Box>
                    <Spacer />
                    <Box> <Text display={{ base: "none", sm: "inline-flex" }} as="span" mr="5" >Wellcome {userData?.email}</Text>
                        <Button onClick={signout} colorScheme="white" variant="outline" size="sm">Sign Out</Button></Box>
                </Flex>
            </Container>
        </Box>
    );
};

export default Header;