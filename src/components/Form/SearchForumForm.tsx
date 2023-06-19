import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
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
            🔸 유튜브 채널 분석이 완료되어야지만 포럼에 입장할 수 있습니다.
          </FormHelperText>
          <FormHelperText>
            🔸 채널 핸들을 입력하면 더 정확한 검색 결과를 확인할 수 있습니다.
            <br />
            &ensp;&ensp;&nbsp; 예) @youtubekorea
          </FormHelperText>
          <FormHelperText>🔸 예상 소요 시간: 3~15분</FormHelperText>
        </Box>
      </FormControl>
    </>
  );
}
