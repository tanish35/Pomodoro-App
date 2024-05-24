import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { styles } from "../style";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "./hoc";
import { slideIn } from "../utils/motions";
import {Button} from "@nextui-org/react";
import { BACKEND_URL } from "../config";
import axios from "axios";

const Signup = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const res = await axios.post(`${BACKEND_URL}/api/user/login`, {
            withCredentials: true,
            email: email,
            password: password,
        });
        if (!res.data) {
            setLoading(false);
            alert("Server down. Please try again later.");
        }
        if (res.status === 200) {
            console.log("Logged in");
            setLoading(false);
            window.location.href = "/dashboard";
        }
        else if (res.status === 422) {
            setLoading(false);
            alert("Enter all the feilds");
        }
        else if (res.status === 409) {
            setLoading(false);
            alert("User already exists. Please login.");
        }
        else if (res.status === 406) {
            setLoading(false);
            alert("Username already exists. Please try with different username.");
        }
    }
    catch (err) {
        console.log(err);
        setLoading(false);
        alert("Could not login. Please try again.")
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
        <p className={styles.sectionHeadText}>Create Your Account.</p>
        <h3 className="text-2xl">SignUp</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Email</span>
            <input
              type="text"
              name="name"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Password</span>
            <input
              rows={7}
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="put down your secret here"
              className="bg-tertiary  py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <Link
          to='/signin'
          className='flex items-center gap-2 text-white'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}>
            Already have an account?
            <div className="text-cyan-200">Login</div>
          </Link>



          <Button
            type='submit'
            variant="bordered"
            className= {loading ? "bg-purple-900 cursor-not-allowed py-3 px-8 rounded-xl w-fit text-white font-bold shadow-md shadow-primary" : "bg-purple-600 hover:bg-purple-900 py-3 px-8 rounded-xl w-fit text-white font-bold shadow-md shadow-primary"}
          >
            
            {/* <Link
            to='/signin'
            className='flex items-center gap-2 text-white'
            onClick={() => {
                setActive("");
                window.scrollTo(0, 0);
            }}> */}
                {loading ? "Loading..." : "SignUp"}
            {/* </Link> */}
          </Button>
          
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Signup, "contact");