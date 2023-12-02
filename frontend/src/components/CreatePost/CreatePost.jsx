import React, { useEffect, useState } from "react";
import createPostCSS from "./createPost.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { BsFillImageFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { ThreeDots } from "react-loader-spinner";
import { postActions } from "../../Actions/postActios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NameInitials from "../utils/NameInitials";
// import {BsCardImage}
const CreatePost = () => {
  // redux states
  const user = useSelector((state) => state.userReducer.user);
  const postSubmitted = useSelector((state) => state.postReducer.postSubmitted);
  // constatnts
  const dispatch = useDispatch();
  const nameInitials = user?.data?.userName.split("")[0];
  let shouldClick = true;

  //useStates
  const [photo, setPhoto] = useState("");
  const [post, setPost] = useState({
    text: "",
    image: null,
  });
  // useEffects
  useEffect(() => {
    if (postSubmitted.data) {
      if (postSubmitted?.data?.statusCode === 201) {
        toast.success(postSubmitted?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        resetPost();
      } else {
        toast.error(postSubmitted?.data?.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      dispatch(postActions.clearPostUploaded());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postSubmitted]);
  //functions
  const handleTextEditor = (e) => {
    setPost({ ...post, text: e.target.value});
  };

  const handlePhotoUploader = (e) => {
    if (e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
      setPost({ ...post, image: e.target.files[0] });
    } else setPhoto(null);
    e.target.value = null;
  };

  const removeImageHandler = () => {
    setPhoto(null);
    setPost({...post,image:null})
  };

  const submitPost = () => {
    if (shouldClick) {
      dispatch(postActions.addPost({text:post.text,image:post.image,token:user?.data?.userToken}));
      shouldClick = false;
      setTimeout(() => {
        shouldClick = true;
      }, 5000);
    } else {
      return;
    }
  };

  const resetPost = () => {
    setPost({
      text: "",
      image: null,
    });
    setPhoto(null)
  }

  return (
    <>
      <div
        className={`border mx-4 my-2 d-flex flex-wrap p-2 ${createPostCSS.mainDiv} rounded`}
      >
        <ToastContainer />
        {photo && (
          <div className={`text-center w-100 `}>
            <div
              className={`text-center position-relative ${createPostCSS.imageOuterDiv}`}
            >
              <img
                src={photo}
                alt="uploaded"
                className={`${createPostCSS.uploadedImage}`}
              />
              <AiFillCloseCircle
                className={`${createPostCSS.ImageCloseButton}`}
                onClick={removeImageHandler}
              />
            </div>
          </div>
        )}
        <div className={`d-flex ${createPostCSS.textBar}`}>
          {/* <span
            className={`rounded-circle mx-1 ${createPostCSS.userNameInitials}`}
          >
            {nameInitials}
          </span> */}
          <NameInitials nameInitials = {nameInitials}/>
          <input
            type="text"
            placeholder="What's Happening?"
            className={`font-weight-bold px-3 ${createPostCSS.inputField}`}
            onChange={handleTextEditor}
            value={post.text}
          />
        </div>
        <div className={`d-flex ${createPostCSS.buttonRow}`}>
          <input
            type="file"
            className={`${createPostCSS.fileUpload}`}
            id="image"
            onChange={handlePhotoUploader}
            accept="image/*"
          />
          <label className={`${createPostCSS.fileLabel} mx-5`} htmlFor="image">
            <BsFillImageFill className={`${createPostCSS.imageIcon} mx-1`} />{" "}
            Photo
          </label>
          <button
            disabled={!post.text}
            className={`btn ${createPostCSS.createButton}`}
            onClick={submitPost}
          >
            {postSubmitted.isSubmitting ? (
              <ThreeDots
                height="24px"
                width="80"
                radius="100%"
                color="#f2f2bc"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            ) : (
              "Create Post"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
