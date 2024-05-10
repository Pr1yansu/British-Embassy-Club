import React from 'react'
import MainCard from '../../components/ui/MainCard';

const Dashboard = () => {
  return (
    <div className="grid grid-rows-12 grid-cols-12 h-screen w-full">
      <div className="row-start-4 row-end-10 col-start-4 col-end-10 grid-rows-2 grid-cols-2 border border-red-800 ">
        <MainCard />
        <MainCard />
        <MainCard />
      </div>
      {/* <MainCard/> */}
    </div>
  );
}

export default Dashboard
