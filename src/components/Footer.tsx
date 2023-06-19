import {
  HStack,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

export default function Footer() {
  return (
    <SimpleGrid
      w={"full"}
      columns={3}
      bgColor={"primary"}
      py={10}
      userSelect={"none"}
    >
      <VStack>
        <Heading color={"white"} size={"xl"} fontWeight={"medium"} mt={4}>
          YouRfan
        </Heading>
      </VStack>
      <VStack px={12} pt={4}>
        <HStack w={"full"} mt={4} alignItems={"center"}>
          <Icon as={FaGithub} color={"white"} fontSize={"xl"} />
          <Heading color={"white"} size={"md"} fontWeight={"normal"}>
            Github
          </Heading>
        </HStack>
        <VStack w={"full"} alignItems={"flex-start"}>
          <HStack alignItems={"center"} color={"white"} cursor={"pointer"}>
            <Text>김경수</Text> <Icon as={BsArrowRight} />
          </HStack>
          <HStack alignItems={"center"} color={"white"} cursor={"pointer"}>
            <Text>윤준열</Text> <Icon as={BsArrowRight} />
          </HStack>
          <HStack alignItems={"center"} color={"white"} cursor={"pointer"}>
            <Text>김성광</Text> <Icon as={BsArrowRight} />
          </HStack>
          <HStack alignItems={"center"} color={"white"} cursor={"pointer"}>
            <Text>최재영</Text> <Icon as={BsArrowRight} />
          </HStack>
        </VStack>
      </VStack>
      <VStack alignItems={"flex-start"} pt={16} pl={12}>
        <HStack alignItems={"center"} color={"white"} cursor={"pointer"}>
          <Text>프론트</Text> <Icon as={BsArrowRight} />
        </HStack>
        <HStack alignItems={"center"} color={"white"} cursor={"pointer"}>
          <Text>백&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>{" "}
          <Icon as={BsArrowRight} />
        </HStack>
      </VStack>
    </SimpleGrid>
  );
}
