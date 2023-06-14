import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

interface IForumTabs {
  channel: string;
}

export default function ForumTabs({ channel }: IForumTabs) {
  const { pathname } = useLocation();
  const [tabIndex, setTabIndex] = useState(1);

  useEffect(() => {
    const splited = pathname.split("/").filter(Boolean);
    const curLocation = splited.pop();
    if (curLocation === "insight") setTabIndex(0);
    else if (curLocation === "consortium") setTabIndex(1);
    else setTabIndex(2);
  }, []);

  return (
    <Tabs index={tabIndex}>
      <TabList>
        <Link to={`/${channel}/insight`}>
          <Tab color={"primary"} borderTopRadius={"lg"}>
            인사이트
          </Tab>
        </Link>
        <Link to={`/${channel}/consortium`}>
          <Tab color={"primary"} borderTopRadius={"lg"}>
            컨소시움
          </Tab>
        </Link>
        <Link to={`/${channel}/colloquium`}>
          <Tab color={"primary"} borderTopRadius={"lg"}>
            콜로키움
          </Tab>
        </Link>
      </TabList>
    </Tabs>
  );
}
