import {v4 as uuidv4} from 'uuid';
import {Box, SimpleGrid, VStack, Kbd} from '@chakra-ui/react'

export const DogTile = ({ dogsList, onClick }) => {
    return <SimpleGrid columns={[1, 2, 3, 4]} spacing={[5, 10,15,20]}>
        {dogsList?.map((dog) =>
            <Box key={uuidv4()} maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='lg' onClick={onClick}>
                <Box p={6} fontSize={['sm', 'sm', 'md', 'lg']}>
                    <VStack>
                        <Kbd>{dog}</Kbd>
                    </VStack>
                </Box>
            </Box>)}
    </SimpleGrid>
}