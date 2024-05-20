import React from "react";
import Error from "../../components/ui/Error";
const NotFound = () => {
  return (
    <>
      <div className="background relative h-screen w-screen bg-cover bg-center flex items-center justify-center py-10 px-20">
        <div className="w-195 h-80 ">
          <Error
            number={"404"}
            title={"OOPS! PAGE NOT FOUND"}
            description={
              "Sorry, the page your’re looking doesen’t exist. If you think something is broken, report a problem."
            }
          />
        </div>
      </div>
    </>
  );
};

export default NotFound;
//
