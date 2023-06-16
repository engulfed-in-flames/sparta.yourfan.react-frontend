import { useNavigate } from "react-router-dom";
import { Heading, Text, Button, VStack } from "@chakra-ui/react";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <VStack w={"100vw"} h={"100vh"} justifyContent={"center"} pb={"10%"}>
      <Heading
        display="inline-block"
        size="4xl"
        bgImage="linear-gradient(to left, #222529, #373c43, #4e555f, #66707c, #7f8b9b);"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={"gray.500"} mb={6}>
        The page you're looking for does not seem to exist
      </Text>

      <Button
        onClick={() => navigate("/")}
        colorScheme="blackAlpha"
        bgImage="linear-gradient(to left, #222529, #373c43, #4e555f, #66707c, #7f8b9b);"
        color="white"
        variant="solid"
      >
        Go to Home
      </Button>
    </VStack>
  );
}
