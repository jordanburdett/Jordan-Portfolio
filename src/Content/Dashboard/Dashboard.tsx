import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      console.log("user effect ran in dashboard");
      navigate("/login");
    }
  });

  const infoCardEditClick = () => {
    navigate("/dashboard/infocardedit");
  };

  const projectsEditButton = () => {
    navigate("/dashboard/projectsedit");
  };

  return (
    <>
      <Button onClick={infoCardEditClick}>Info Card Edit</Button>
      <Button onClick={projectsEditButton}>Projects Edit</Button>
    </>
  );
};

export default Dashboard;
