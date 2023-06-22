import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useMe } from "../hooks/userHooks";
import { useEffect, useState } from "react";
import { IMe } from "../type";

function Root() {
  const { isUserLoading, user } = useMe();
  const [me, setMe] = useState<IMe | null>(null);
  useEffect(() => {
    setMe(user);
  }, [user]);
  return (
    <>
      <Header isUserLoading={isUserLoading} me={me} setMe={setMe}></Header>
      <Outlet context={{ isUserLoading, me, setMe }} />
      <Footer></Footer>
    </>
  );
}

export default Root;
