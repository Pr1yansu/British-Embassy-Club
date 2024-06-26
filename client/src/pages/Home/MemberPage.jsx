// MemberPage.js
import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/ui/loader";
import { useGetMemberByIdQuery } from "../../store/api/memberAPI";

const MemberPage = () => {
  const { id } = useParams();

  const { data, isLoading, refetch } = useGetMemberByIdQuery({
    memberId: id,
  });

  if (isLoading) return <Loader />;
  if (!data.data) return <h1>Member not found</h1>;

  console.log(data);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-xl w-full p-6 md:p-8">
        <h1 className="text-2xl font-bold mb-4">Member Page</h1>
        <p className="text-lg mb-2">
          <p className="font-semibold">Member ID:</p> {id}
        </p>
        <p className="text-lg mb-2">
          <p className="font-semibold">First Name:</p>{" "}
          {data?.data?.firstname}
        </p>
        <p className="text-lg mb-2">
          <p className="font-semibold">Last Name:</p>{" "}
          {data?.data?.lastname}
        </p>
        <p className="text-lg mb-2">
          <p className="font-semibold">Full Name:</p> {data?.data?.name}
        </p>
        <p className="text-lg mb-2">
          <p className="font-semibold">Mobile Number:</p>{" "}
          {data?.data?.mobileNumber}
        </p>
        <p className="text-lg mb-2">
          <p className="font-semibold">Email:</p> {data?.data?.email}
        </p>
        <p className="text-lg mb-2">
          <p className="font-semibold">Address:</p> {data?.data?.address}
        </p>
        <p className="text-lg mb-2">
          <p className="font-semibold">ID Proof:</p>{" "}
          {data?.data?.idProof ? data.data.idProof.idNumber : "N/A"} 
        </p>
        <p className="text-lg mb-2">
          <p className="font-semibold">Blood Group:</p>{" "}
          {data?.data?.bloodGroup}
        </p>
        <p className="text-lg mb-2">
          <p className="font-semibold">Organization:</p>{" "}
          {data?.data?.organization}
        </p>
        <p className="text-lg mb-2">
          <p className="font-semibold">Expiry Time:</p>{" "}
          {new Date(data?.data?.expiryTime).toLocaleDateString()}
        </p>
        <p className="text-lg mb-2">
          <p className="font-semibold">Expired:</p>{" "}
          {data?.data?.expired ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
};

export default MemberPage;
