import { Navigate, useParams } from "react-router-dom";

export default function RedirectToConsortium() {
  const { channel } = useParams();
  return <Navigate to={`/${channel}/consortium`} />;
}
