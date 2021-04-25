import React, { useRef } from 'react';
import { Container, Box, FormControl, FormLabel, Input, Button, Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import Link from 'next/link';
import { useAuthContext } from 'hooks/authentication';
import { useToast, useBoolean } from "@chakra-ui/react";
import { useRouter } from 'next/router';

const Signin = () => {
    const { signin, loading, isAuthenticated } = useAuthContext();
    const [isLoading, setIsLoading] = useBoolean();
    const toast = useToast();
    const router = useRouter();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const submitHandler = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        setIsLoading.on();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        try {
            const { user } = await signin(email, password);
            setIsLoading.off();
            if (user) {
                router.push('/');
            }
        } catch (error) {
            setIsLoading.off();
            toast({
                title: `${error.message}`,
                status: "error",
                isClosable: true,
                position: "top-right"
            })
        }
    }
    if(isAuthenticated)  router.push('/');
    return (
        <Container maxW="xl" centerContent>
            {!loading &&
            <Box boxShadow="md" p={{ base: 6, md: 10 }} mt="16" w="100%" borderWidth="1px" borderRadius="sm" overflow="hidden">
                <Box borderBottom="1px" pb="4" mb="4" borderColor="gray.200">
                    <Text fontSize="3xl">Sign In</Text>
                </Box>
                <form autoComplete="off" onSubmit={submitHandler}>
                    <FormControl mb={4} id="email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input ref={emailRef} placeholder="Enter your email" />
                    </FormControl>
                    <FormControl mb={6} id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input ref={passwordRef} placeholder="Enter your password" type="password" />
                    </FormControl>
                    <Button isLoading={isLoading} disabled={isLoading} colorScheme="blue" type="submit" isFullWidth>
                        Sign in
                    </Button>
                    <Flex justify="center">
                        <Text pt="4">Don't have an account? <Link href="/signup" passHref><ChakraLink color="blue.500">Sign up here</ChakraLink></Link></Text>
                    </Flex>
                </form>
            </Box>
            }
        </Container>
    );
};

export default Signin;