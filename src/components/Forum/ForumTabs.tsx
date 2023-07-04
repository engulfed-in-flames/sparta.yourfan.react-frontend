import React from "react";
import { Tabs, TabList, Tab, useToast } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../hooks/userHooks";

interface IForumTabs {
  channel: string;
}

export default function ForumTabs({ channel }: IForumTabs) {
  const { isUserLoading, user } = useUser();
  const { pathname } = useLocation();
  const [tabIndex, setTabIndex] = React.useState(1);
  const toast = useToast();
  const onClickColloquiumTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toast({
      title: "로그인이 필요합니다.",
      status: "info",
      position: "top",
      duration: 3000,
    });
  };

  React.useEffect(() => {
    const splited = pathname.split("/").filter(Boolean);
    const curLocation = splited.pop();
    if (curLocation === "insight") setTabIndex(0);
    else if (curLocation === "consortium") setTabIndex(1);
    else setTabIndex(2);
  }, [pathname]);

  return (
    <Tabs index={tabIndex} mb={8} userSelect={"none"}>
      <TabList>
        <Link to={`/${channel}/insight`}>
          <Tab fontSize={"xl"} color={"primary"} borderTopRadius={"lg"}>
            인사이트
          </Tab>
        </Link>
        <Link to={`/${channel}/consortium`}>
          <Tab fontSize={"xl"} color={"primary"} borderTopRadius={"lg"}>
            컨소시움
          </Tab>
        </Link>
        {!isUserLoading && user ? (
          <Link to={`/${channel}/colloquium`}>
            <Tab fontSize={"xl"} color={"primary"} borderTopRadius={"lg"}>
              콜로키움
            </Tab>
          </Link>
        ) : (
          <Tab
            onClick={onClickColloquiumTab}
            fontSize={"xl"}
            color={"primary"}
            borderTopRadius={"lg"}
          >
            콜로키움
          </Tab>
        )}
      </TabList>
    </Tabs>
  );
}
