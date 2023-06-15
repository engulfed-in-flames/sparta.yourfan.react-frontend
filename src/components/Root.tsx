import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useMe } from "../hooks/userHooks";

function Root() {
  const { isUserLoading, user } = useMe();
  return (
    <>
      <Header isUserLoading={isUserLoading} me={user}></Header>
      <Outlet context={{ isUserLoading, user }} />
      <Footer></Footer>
    </>
  );
}

export default Root;
