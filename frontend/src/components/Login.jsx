import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { styles } from "../style";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "./hoc";
import { slideIn } from "../utils/motions";
import { Button } from "@nextui-org/react";

import axios from "axios";

const Login = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`/api/user/login`, {
        withCredentials: true,
        email: email,
        password: password,
      });
      if (res.status === 200) {
        console.log("Logged in");
        setLoading(false);
        window.location.href = "/dashboard";
      } else if (res.status === 401) {
        setLoading(false);
        alert("You have logged in with Google. Please login with Google.");
      } else if (res.status === 404) {
        setLoading(false);
        alert(
          "User not found. Please sign up or enter your details correctly."
        );
      } else if (res.status === 402) {
        setLoading(false);
        alert("Incorrect Password. Please try again.");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Could not login. Please try again.");
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
        <p className={styles.sectionHeadText}>Welcome</p>
        <h3 className="text-2xl">Login</h3>

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
              value={form.name}
              onChange={handleChange}
              placeholder="yes type it here"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Password</span>
            <input
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="put down your secret here"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <div className="flex">
            <Link
              to="/forgot"
              className="flex items-center gap-2 text-white"
              onClick={() => {
                setActive("");
                window.scrollTo(0, 0);
              }}
            >
              Forgot Password?
            </Link>
            &nbsp;
            <Link
              to="/SignUp"
              className="flex items-center gap-2 text-white"
              onClick={() => {
                setActive("");
                window.scrollTo(0, 0);
              }}
            >
              New User?
            </Link>
          </div>

          <Button
            type="submit"
            variant="bordered"
            // className="bg-purple-700 hover:bg-purple-900 py-3 px-8 rounded-xl w-fit text-white font-bold shadow-md shadow-primary"
            className={
              loading
                ? "bg-purple-900 cursor-not-allowed py-3 px-8 rounded-xl w-fit text-white font-bold shadow-md shadow-primary"
                : "bg-purple-600 hover:bg-purple-900 py-3 px-8 rounded-xl w-fit text-white font-bold shadow-md shadow-primary"
            }
          >
            {loading ? "Loggin you in..." : "Login"}
          </Button>

          <Button className="bg-slate-950 py-3 px-8 rounded-xl w-fit text-white font-bold shadow-md shadow-primary">
            <div className="flex">
              <img
                className="h-6 w-6"
                src="https://e1.pxfuel.com/desktop-wallpaper/297/673/desktop-wallpaper-google-g-logo-google-logo-black-background.jpg"
                alt="google"
              />
              <Link
                to="https://pomodoro-app-1.onrender.com/auth/google"
                className="flex items-center gap-2 text-gray-500"
                onClick={() => {
                  setActive("");
                  window.scrollTo(0, 0);
                }}
              >
                {loading ? "Loading..." : "Login with Google"}
              </Link>
            </div>
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

export default SectionWrapper(Login, "contact");
