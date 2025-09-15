import { useEffect } from "react";
import useGlobal from "../../hooks/useGlobal";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useGlobal();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  if (user) {
    return <></>;
  }
}
