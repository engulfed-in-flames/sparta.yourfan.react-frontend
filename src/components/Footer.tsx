import {
  Button,
  HStack,
  Heading,
  Icon,
  SimpleGrid,
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
            <Button
              onClick={() => {
                window.open(
                  "https://github.com/engulfedInFlames?tab=repositories"
                );
              }}
              color={"white"}
              bgColor={"primary"}
              variant={"link"}
              pb={1}
            >
              김경수 <Icon as={BsArrowRight} ml={2} />
            </Button>
          </HStack>
          <HStack alignItems={"center"} color={"white"} cursor={"pointer"}>
            <Button
              onClick={() => {
                window.open("https://github.com/raoneli1013?tab=repositories");
              }}
              color={"white"}
              bgColor={"primary"}
              variant={"link"}
              pb={1}
            >
              윤준열 <Icon as={BsArrowRight} ml={2} />
            </Button>
          </HStack>
          <HStack alignItems={"center"} color={"white"} cursor={"pointer"}>
            <Button
              onClick={() => {
                window.open("https://github.com/scarlet0star?tab=repositories");
              }}
              color={"white"}
              bgColor={"primary"}
              variant={"link"}
              pb={1}
            >
              김성광 <Icon as={BsArrowRight} ml={2} />
            </Button>
          </HStack>
        </VStack>
      </VStack>
      <VStack alignItems={"flex-start"} pt={16} pl={12}>
        <HStack alignItems={"center"} color={"white"} cursor={"pointer"}>
          <Button
            onClick={() => {
              window.open(
                "https://github.com/engulfedInFlames/yourfan-react-frontend"
              );
            }}
            color={"white"}
            bgColor={"primary"}
            variant={"link"}
            pb={1}
          >
            프론트 <Icon as={BsArrowRight} ml={2} />
          </Button>
        </HStack>
        <HStack alignItems={"center"} color={"white"} cursor={"pointer"}>
          <Button
            onClick={() => {
              window.open(
                "https://github.com/engulfedInFlames/yourfan-backend"
              );
            }}
            color={"white"}
            bgColor={"primary"}
            variant={"link"}
            pb={1}
          >
            백&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Icon as={BsArrowRight} ml={2} />
          </Button>
        </HStack>
      </VStack>
    </SimpleGrid>
  );
}
