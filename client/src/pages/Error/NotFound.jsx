import React, { useEffect } from "react";
import Error from "../../components/ui/Error";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  const [count, setCount] = React.useState(5);

  useEffect(() => {
    setTimeout(() => {
      navigate("/login/club");
    }, 5000);
    return () => clearTimeout();
  }, [navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [count]);

  return (
    <>
      <div className="background bg-cover bg-center">
        <div className="container mx-auto h-screen w-screen flex items-center justify-center py-10 px-20">
          <div className="max-w-screen-lg">
            <Error
              number={"404"}
              title={"OOPS! PAGE NOT FOUND"}
              description={`Sorry, the page your’re looking doesen’t exist.If you think something is broken, report a problem.You will be redirected to the login page in ${count} seconds.`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
//
