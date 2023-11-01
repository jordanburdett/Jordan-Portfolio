import { Button } from "@chakra-ui/react"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
      if (localStorage.getItem("token") === null) {
        console.log("user effect ran in dashboard");
        navigate("/login");
      }
    })
    
    
    const logStorage = () => {
        console.log(localStorage.getItem("token"));
    }

    const buttonOneClick = () => {
        localStorage.setItem("token", "test");
        logStorage();
    }

    const buttonTwoClick = () => {
        console.log("Button Two Clicked")
        localStorage.removeItem("token");
        logStorage();
    }

  return (
    <>
        <Button onClick={buttonOneClick}>ButtonOne</Button>
        <Button onClick={buttonTwoClick}>ButtonTwo</Button>
    </>
  )
}

export default Dashboard