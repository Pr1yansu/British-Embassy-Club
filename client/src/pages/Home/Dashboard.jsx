import React, { useEffect, useState } from "react";
import MainCard from "../../components/ui/MainCard";
import { cardData } from "../../constants";
import profile from "../../assets/icons/Snehashis.png";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/LOGO.png";
import Loader from "../../components/ui/loader";
const Dashboard = ({ profiledata: data, isLoading, error }) => {
  const navigate = useNavigate();
  const [profiledata, setProfiledata] = useState(null);
  useEffect(() => {
    if(data){
      console.log(data);
      setProfiledata(data);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  console.log(profiledata);
  if (error) {
    navigate("/login/club");
  }

  if (!profiledata) return <Loader />;

  return (
    <div className="background h-screen bg-cover bg-center">
      <div className="container px-20 grid grid-rows-12 grid-cols-12 gap-4">
        <div className="row-start-1 row-end-3 col-start-2 col-end-12 flex justify-end items-center">
          <img
            src={logo}
            alt="logo"
            className="font-bold absolute top-6 left-20"
          />
          <div
            className="flex gap-4 items-center justify-center"
          >
            <div className="flex flex-col items-end">
              <h4 className="text-xl font-roboto">
                { profiledata && profiledata.data && profiledata.data.username}
              </h4>
              <h6 className="text-text_primary">
                { profiledata && profiledata.data && profiledata.data.role}
              </h6>
            </div>
            {/* <img
              src={
                ( profiledata && profiledata.data && profiledata.data.profileImage) || profile
              }
              alt=""
              className="w-16 h-16"
            /> */}
          </div>
        </div>
        <div className="row-start-3 row-end-11 col-start-4 col-end-10 grid grid-rows-2 grid-cols-2 gap-6">
          {cardData.map((items, index) => {
            return (
              <MainCard
                img={items.img}
                title={items.title}
                subtitle={items.subtitle}
                position={items.position}
                shadow={items.shadow}
                posV={items.posV}
                background={items.background}
                page={items.page}
                profiledata={profiledata}
                key={index}
              />
            );
          })}
        </div>
        {/* <MainCard/> */}
      </div>
    </div>
  );
};

export default Dashboard;
