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
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontWeight: "bold", fontSize: "24px" }}>
            Your Company Name
          </h1>
          <p style={{ color: "#6c757d" }}>
            What would you like to give your company name? You can change this
            later.
          </p>
        </div>

        <Label>Company Name</Label>
        <Input
          type="text"
          style={{
            margin: "10px 0",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "100%",
          }}
          placeholder="JobHunt, Microsoft etc."
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <Button
            style={{
              backgroundColor: "#f8f9fa",
              color: "#000",
              padding: "10px 20px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={registerNewCompany}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
