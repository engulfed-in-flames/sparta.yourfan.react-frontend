import React from "react";
import {
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

interface IProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
export default function PageNav({ page, setPage }: IProps) {
  const toast = useToast();
  const handlePageBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPage(Number(event.currentTarget["id"]));
    toast({
      title: "현재 구현 중입니다 😭",
      status: "info",
      position: "top",
      duration: 3000,
    });
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
          {Array.from({ length: 5 }, (v, i) => i + 1).map((v, i) => (
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
