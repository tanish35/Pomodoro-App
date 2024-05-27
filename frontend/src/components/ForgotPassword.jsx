import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { styles } from "../style";
import { SectionWrapper } from "./hoc";
import { slideIn } from "../utils/motions";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios
        .post("/api/user/forgotpassword", {
          email: email,
        })
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          alert("Password reset link has been sent to your mail");
          navigate("/verify");
        });
    } catch (error) {
      console.error("Error occurred while sending password reset link:", error);
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
        <p className={styles.sectionHeadText}>Forgot Password?</p>
        <h3 className="text-2xl">Create New Password</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Email</span>
            <input
              type="text"
              value={email}
              onChange={handleChange}
              placeholder="Enter your registered mail"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outline-none border-none font-medium"
            />
          </label>

          <Link
            to="/signin"
            className="flex items-center gap-2 text-cyan-300"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            SignIn
          </Link>

          <Button
            type="submit"
            variant="bordered"
            className={
              loading
                ? "bg-purple-900 cursor-not-allowed py-3 px-8 rounded-xl w-fit text-white font-bold shadow-md shadow-primary"
                : "bg-purple-600 hover:bg-purple-900 py-3 px-8 rounded-xl w-fit text-white font-bold shadow-md shadow-primary"
            }            >
            {loading ? "Please Wait..." : "Verify"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(ForgotPassword, "contact");
