import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Flex
      h={"100vh"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Heading fontSize={"5xl"}>404 Not Found</Heading>
      <Box my={4}>
        <Text color="gray.600">요청하신 페이지를 찾을 수 없습니다.</Text>
      </Box>

      <Button href="/" as="a" bg="gray.400" color="white" borderRadius={"3xl"}>
        홈으로
      </Button>
    </Flex>
  );
}
