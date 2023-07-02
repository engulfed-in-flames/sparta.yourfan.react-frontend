import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useUserAtom } from "../hooks/userHooks";

function Root() {
  const { isUserLoading, user } = useUserAtom();
  return (
    <>
      <Header isUserLoading={isUserLoading} me={user} />
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
