import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <form onSubmit={submitHandler}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
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
              <ArrowLeft style={{ marginRight: "5px" }} />
              Back
            </Button>
            <h1 style={{ fontWeight: "bold", fontSize: "20px" }}>
              Company Setup
            </h1>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                style={{
                  margin: "10px 0",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "100%",
                }}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                style={{
                  margin: "10px 0",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "100%",
                }}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                style={{
                  margin: "10px 0",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "100%",
                }}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                style={{
                  margin: "10px 0",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "100%",
                }}
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                style={{
                  margin: "10px 0",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "100%",
                }}
              />
            </div>
          </div>
          {loading ? (
            <Button
              style={{
                width: "100%",
                marginTop: "20px",
                backgroundColor: "#f8f9fa",
                color: "#000",
                padding: "10px 20px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "not-allowed",
              }}
            >
              <Loader2
                style={{
                  marginRight: "5px",
                  animation: "spin 1s linear infinite",
                }}
              />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              style={{
                width: "100%",
                marginTop: "20px",
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
