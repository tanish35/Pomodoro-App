import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { styles } from "../style";
import { slideIn } from "../utils/motions";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditPage = () => {
  // const inputRef = useRef();
  // const [image, setImage] = useState("");
  const navigate = useNavigate();
  // const formRef = useRef();
  // const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState("");

  // const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      alert("Please Select an Image!");
      setLoading(false);
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "pomodoro-app");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      alert("Please Select an Image!");
      setLoading(false);
      return;
    }
  };

  // function addPhotoByLink() {

  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        "/api/user/update",
        { username, name, pic },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      alert("Profile updated successfully");
      navigate("/profile/dashboard");
      setLoading(false);
    } catch (error) {
      alert("Please fill fields");
      setLoading(false);
    }
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionHeadText}>Edit Profile</p>
        <p className="text-xl text-gray-400">Change username and name</p>
        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-6">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Name</span>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Username</span>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outline-none border-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">
              Upload Profile Pic
            </span>
            <input
              type="file"
              onChange={(e) => postDetails(e.target.files[0])}
              accepts="image/*"
              placeholder="Upload your pic"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outline-none border-none font-medium"
            />
          </label>

          <Button
            type="submit"
            variant="bordered"
            className={
              loading
                ? "bg-purple-900 cursor-not-allowed py-3 px-8 rounded-xl w-fit text-white font-bold shadow-md shadow-primary"
                : "bg-purple-600 hover:bg-purple-900 py-3 px-8 rounded-xl w-fit text-white font-bold shadow-md shadow-primary"
            }
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditPage;
