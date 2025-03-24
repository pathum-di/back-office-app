import {
  Box,
  Text,
  VStack,
  Badge,
  HStack,
  Stack,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { Product } from "../models";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Box
      p={4}
      boxShadow="md"
      borderRadius="md"
      bg={useColorModeValue("white", "gray.700")}
      _hover={{ boxShadow: "lg" }}
      transition="0.3s"
      w="100%"
      maxW="350px"
    >
      <VStack align="start" spacing={2}>
        <Heading size="md">{product.name}</Heading>
        <Text fontSize="sm" color="gray.500">
          Category ID: {product.category_id}
        </Text>

        <Stack spacing={1}>
          {product.attributes.map((attr, index) => (
            <HStack key={index}>
              <Badge colorScheme="blue">{attr.code}</Badge>
              <Text>{String(attr.value)}</Text>
            </HStack>
          ))}
        </Stack>
      </VStack>
    </Box>
  );
}
