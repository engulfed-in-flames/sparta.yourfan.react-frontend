import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BsSearch } from "react-icons/bs";

interface IProps {
  channelHandle: string;
  setChannelHandle: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchForumForm({
  channelHandle,
  setChannelHandle,
}: IProps) {
  return (
    <>
      <FormControl isRequired my={8}>
        <InputGroup mb={4}>
          <InputLeftElement
            pointerEvents={"none"}
            children={<BsSearch color={"gray"} size={18} />}
            pt={2}
          />
          <Input
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setChannelHandle(event.currentTarget.value);
            }}
            type={"text"}
            value={channelHandle}
            placeholder="채널 핸들을 입력하세요"
            required
            variant={"flushed"}
            size={"lg"}
            errorBorderColor="crimson"
          />
        </InputGroup>
        <Box>
          <FormHelperText>
            <Text display={"flex"} pb={1}>
              <Text>🔸</Text>유튜브 채널 분석이 완료되어야지만 포럼에 입장할 수
              있습니다.
            </Text>
            <Text display={"flex"} pb={1}>
              <Text>🔸</Text>현재 구독자 수 만 명 이상의 채널에 대해서만 검색을
              허용하고 있습니다.
            </Text>
            <Text display={"flex"} pb={1}>
              <Text>🔸</Text>채널 핸들을 입력하면 더 정확한 검색 결과를 확인할
              수 있습니다. <br /> 예) @youtubekorea
            </Text>
            <Text display={"flex"} pb={1}>
              <Text>🔸</Text>예상 소요 시간: 10초~3분
            </Text>
          </FormHelperText>
        </Box>
      </FormControl>
    </>
  );
}
