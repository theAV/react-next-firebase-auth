import React, { useRef } from 'react';
import { Container, Box, FormControl, FormLabel, Input, Button, Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import Link from 'next/link';
import { useAuthContext } from 'hooks/authentication';
import { useToast, useBoolean } from "@chakra-ui/react";
import { useRouter } from 'next/router';

const Signup = () => {
    const { signup, loading, isAuthenticated } = useAuthContext();
    const [isSigningUp, setIsSigningUp] = useBoolean();
    const toast = useToast();
    const router = useRouter();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const nameRef = useRef(null);

    const submitHandler = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        setIsSigningUp.on();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        try {
            const { user } = await signup(email, password);
            setIsSigningUp.off();
            if (user) {
                router.push('/');
            }
        } catch (error) {
            setIsSigningUp.off();
            toast({
                title: `${error.message}`,
                status: "error",
                isClosable: true,
                position: "top-right"
            })
        }

    }
    if (isAuthenticated) router.push('/');
    return (
        <Container maxW="xl" centerContent>
            {!loading &&
                <Box boxShadow="md" p={{ base: 6, md: 10 }} mt="16" w="100%" borderWidth="1px" borderRadius="sm" overflow="hidden">
                    <Box borderBottom="1px" pb="4" mb="4" borderColor="gray.200">
                        <Text fontSize="3xl">Sign Up</Text>
                        <Text color="gray.500">Please fill out the form, it's totally free.</Text>
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
                        <Button isLoading={isSigningUp} disabled={isSigningUp} colorScheme="blue" type="submit" isFullWidth>
                            Submit
                    </Button>
                        <Flex justify="center">
                            <Text pt="4">Already have an account? <Link href="/signin" passHref><ChakraLink color="blue.500">Sign in here</ChakraLink></Link></Text>
                        </Flex>
                    </form>
                </Box>
            }
        </Container>
    );
};




export default Signup;