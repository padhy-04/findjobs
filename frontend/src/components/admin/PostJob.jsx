import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <form
          onSubmit={submitHandler}
          style={{
            padding: "20px",
            maxWidth: "800px",
            border: "1px solid #ccc",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
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
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
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
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
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
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
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
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
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
              <Label>No of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
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
            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger style={{ width: "100%", margin: "10px 0" }}>
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem
                        key={company._id}
                        value={company?.name?.toLowerCase()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
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
              Post New Job
            </Button>
          )}
          {companies.length === 0 && (
            <p
              style={{
                fontSize: "12px",
                color: "#dc3545",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              *Please register a company first, before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
