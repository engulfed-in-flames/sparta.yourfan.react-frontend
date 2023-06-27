import {
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

interface IProps {
  channel: string;
  page: number;
  count: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
export default function PageNav({ channel, page, count, setPage }: IProps) {
  // const navigate = useNavigate();
  const toast = useToast();
  const handlePageBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toast({
      title: "현재 구현 중입니다 😭",
      status: "info",
      duration: 3000,
      position: "top",
    });
    // const targetPage = Number(event.currentTarget["id"]);
    // setPage(targetPage);
    // navigate(`/${channel}/consortium?page=${targetPage}`);
  };
  return (
    <>
      <HStack justifyContent={"center"}>
        <ButtonGroup>
          <IconButton
            icon={<HiChevronDoubleLeft />}
            aria-label=""
            variant={"ghost"}
          />
          <IconButton
            icon={<HiChevronLeft />}
            aria-label="이전 페이지 버튼"
            variant={"ghost"}
          />
        </ButtonGroup>
        <ButtonGroup>
          {Array.from({ length: count }, (v, i) => i + 1).map((v, i) => (
            <Button
              isActive={v === page ? true : false}
              onClick={handlePageBtn}
              key={i}
              id={String(v)}
              bgColor={"white"}
              shadow={"lg"}
            >
              {v}
            </Button>
          ))}
        </ButtonGroup>
        <ButtonGroup>
          <IconButton
            icon={<HiChevronRight />}
            aria-label="다음 페이지 버튼"
            variant={"ghost"}
          />
          <IconButton
            icon={<HiChevronDoubleRight />}
            aria-label=""
            variant={"ghost"}
          />
        </ButtonGroup>
      </HStack>
    </>
  );
}
