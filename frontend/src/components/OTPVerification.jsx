import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { styles } from "../style";
import { SectionWrapper } from "./hoc";
import { slideIn } from "../utils/motions";
import { Button } from "@nextui-org/react";
import axios from "axios";

const OTPVerification = () => {
  const navigate = useNavigate(); // Correct placement of useNavigate hook
  const formRef = useRef();
  const [form, setForm] = useState({
    email: "",
    OTP: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .post("/api/user/resetpassword", form, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          alert("Password reset successfully");
          navigate("/signin");
        });
    } catch (error) {
      console.error("Error occurred while verifying OTP:", error);
      setLoading(false);
    }
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionHeadText}>OTP Verification</p>
        <h3 className="text-2xl">Enter OTP and New Password</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your registered email"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">OTP</span>
            <input
              type="text"
              name="OTP"
              value={form.OTP}
              onChange={handleChange}
              placeholder="Enter the OTP sent to your email"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">New Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your new password"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <Button
            type="submit"
            variant="bordered"
            className="bg-purple-950 py-3 px-8 rounded-xl w-fit text-white font-bold shadow-md shadow-primary"
          >
            {loading ? "Please Wait..." : "Verify"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(OTPVerification, "contact");
