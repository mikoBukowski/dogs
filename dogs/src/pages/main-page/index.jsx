import {commonObjectGet} from "../../api/apiRequest";
import {DogTile} from "../../components/dogTile";
import React, {useEffect, useState} from "react";
import {MoonIcon, SunIcon} from '@chakra-ui/icons';
import {
    Spinner,
    Button,
    Box,
    Flex,
    Center,
    useColorModeValue,
    Heading,
    Stack,
    useColorMode,
    VStack,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Image,
} from '@chakra-ui/react'

export const RandomDogsView = () => {
    const [dogsList, setDogsList] = useState([]);
    const [dogsImage, setDogsImage] = useState([]);
    const [dogsBreed, setDogsBreed] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [nextBatch, setNextBatch] = useState(false);
    const [error, setError] = useState(false);
    const {colorMode, toggleColorMode} = useColorMode();
    const { isOpen, onClose, onOpen } = useDisclosure();

    useEffect(() => {
        const getUsersList = async () => {
            setIsLoading(true);
            setError(false);
            try {
                // I'd normally place url's inside of env file, but i'll save you the hassle
                const { message } = await commonObjectGet("https://dog.ceo/api/breeds/list/all");
                setDogsList(Object.keys(message));
                console.log(message)
            } catch (e) {
                setError(true);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        }
        getUsersList()
    }, [nextBatch])

    const loadNextBatch = () => {
        setNextBatch(prevBatch => !prevBatch);
    }

    const loadNextImage = async () => {
        const { message } = await commonObjectGet(`https://dog.ceo/api/breed/${dogsBreed}/images/random`);
        setDogsImage(message);
    }

    const loadDogsRandomImage = async (e) => {
        const breed = e.target.textContent;
        try {
            const { message } = await commonObjectGet(`https://dog.ceo/api/breed/${breed}/images/random`);
            setDogsImage(message);
            console.log(message)
        } catch (e) {
            setError(true);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
            setDogsBreed(breed);
            onOpen();
        }
    }

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Heading size='md' mr='10px'>Dogs</Heading>
                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={6}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
                            </Button>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
            <Center p={10}>
                {error && <Center w='100vw' h='100vh'>
                    <VStack>
                        <Heading>Something went wrong</Heading>
                        <Button isLoading={isLoading} colorScheme='teal' onClick={loadNextBatch}>Retry</Button>
                    </VStack>
                </Center>}
                {isLoading && <Center w='100vw' h='100vh'><Spinner size='xl'/></Center>}
                {!isLoading && !error && <DogTile dogsList={dogsList} onClick={((e) => loadDogsRandomImage(e))} />}
            </Center>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center pt={10}>
                            <Image
                                borderRadius='6px'
                                boxSize='full'
                                objectFit='cover'
                                src={dogsImage}
                                alt='dog'
                            />
                        </Center>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={loadNextImage} variant='ghost' isLoading={isLoading}>Next</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
