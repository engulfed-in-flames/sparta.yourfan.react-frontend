import {
  AspectRatio,
  FormControl,
  HStack,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { IChannel } from "../../type";

interface IProps {
  channels: IChannel[];
  setChannel: React.Dispatch<React.SetStateAction<string>>;
}

export default function CreateForumForm({ channels, setChannel }: IProps) {
  return (
    <>
      <FormControl isRequired>
        <RadioGroup onChange={setChannel}>
          <VStack>
            {channels ? (
              channels.map((channel, index) => (
                <Radio key={index} value={channel.channel_id} w={"full"}>
                  <HStack alignItems={"flex-start"} gap={4}>
                    <AspectRatio w={"80px"} ratio={1 / 1}>
                      <Image
                        src={channel.thumbnail}
                        alt={channel.channel_name}
                        w={"80px"}
                        objectFit={"cover"}
                      />
                    </AspectRatio>
                    <VStack
                      justifyContent={"flex-start"}
                      alignItems={"flex-start"}
                      pt={0}
                    >
                      <Text
                        fontSize={"xl"}
                        as="h4"
                        sx={{ wordWrap: "" }}
                        noOfLines={1}
                      >
                        {channel.channel_name}
                      </Text>
                      <Text>
                        {" "}
                        구독자 수 :{" "}
                        {Number(channel.subscriber).toLocaleString()}
                      </Text>
                    </VStack>
                  </HStack>
                </Radio>
              ))
            ) : (
              <Heading>조건에 부합하는 채널이 존재하지 않습니다.</Heading>
            )}
          </VStack>
        </RadioGroup>
      </FormControl>
    </>
  );
}
