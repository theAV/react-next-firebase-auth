import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useBoolean, useDisclosure } from '@chakra-ui/react';
import React from 'react';

const ModalBlogContent = ({ isOpen, onClose, content, title }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader borderBottom="1px" borderBottomColor="gray.200">{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {content}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalBlogContent;