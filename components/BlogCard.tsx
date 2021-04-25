import { Box, Image, useDisclosure } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import ModalBlogContent from './ModalContent';


const BlogCard = ({ title, image, content }) => {
    const { onOpen, isOpen, onClose } = useDisclosure();
    return (
        <Fragment>
            <Box mb="5" boxShadow="md" onClick={onOpen} _hover={{ cursor: 'pointer' }} title={title}>
                <Image src={image} alt={title} />
                <Box p="4">
                    <Box
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated
                    >
                        {title}
                    </Box>
                </Box>
            </Box>
            <ModalBlogContent isOpen={isOpen} onClose={onClose} content={content} title={title} />
        </Fragment>
    );
};

export default BlogCard;