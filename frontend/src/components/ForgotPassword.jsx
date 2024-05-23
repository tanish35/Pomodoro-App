import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { styles } from "../style";
import { SectionWrapper } from "./hoc";
import { slideIn } from "../utils/motions";
import {Button} from "@nextui-org/react";

const ForgotPassword = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
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
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your registered mail"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">New Password</span>
            <input
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Enter new password"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <Link
          to='/signin'
          className='flex items-center gap-2 text-cyan-300'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}>
            SignIn
          </Link>


          <Button
            type='submit'
            variant="bordered"
            className='bg-purple-950 py-3 px-8 rounded-xl w-fit text-white font-bold shadow-md shadow-primary'
          >
            {loading ? "Please Wait..." : "Verify"}
          </Button>   
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(ForgotPassword, "contact");
