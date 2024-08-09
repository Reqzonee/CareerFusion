import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch = useDispatch();
  const registerNewCompany = async () => {
    console.log("Inside company creation");
    // console.log("end point is ", companyName);
    console.log("create comapny api endpoint is ", `${COMPANY_API_END_POINT}/register`);
    try {
      const response = await fetch(`${COMPANY_API_END_POINT}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Similar to axios withCredentials: true
        body: JSON.stringify({ companyName }),
      });

      const data = await response.json();

      if (response.ok && data?.success) {
        console.log("Response data: ", data);
        dispatch(setSingleCompany(data.company));
        toast.success(data.message);
        const companyId = data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      } else {
        console.error("Request failed: ", data?.message || "Unknown error");
        toast.error(data?.message || "Registration failed");
      }
    } catch (error) {
      console.error("An error occurred: ", error);
      toast.error("An error occurred during registration");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? you can change this
            later.
          </p>
        </div>

        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="JobHunt, Microsoft etc."
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
