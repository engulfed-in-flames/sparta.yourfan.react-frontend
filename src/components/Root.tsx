import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useMe } from "../hooks/useMe";

function Root() {
  const { isUserLoading, user } = useMe();
  return (
    <>
      <Header isUserLoading={isUserLoading} user={user}></Header>
      <Outlet context={{ isUserLoading, user }} />
      <Footer></Footer>
    </>
  );
}

export default Root;
