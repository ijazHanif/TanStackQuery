// src/common/commonImports.js

// Import all the common components, hooks, utilities, etc.
import React from "react";
import Wraper from "../shared/Wraper";
import Input from "../shared/Form/Input";
import FormHeader from "../shared/Form/FormHeader";
import FormPara from "../shared/Form/FormPara";
import TextButton from "../shared/Button/TextButton";
import IconButton from "../shared/Button/IconButton";
import google from "../../assets/google.svg";
import github from "../../assets/github.svg";
import { useNavigate, Link } from "react-router-dom";
import { axiosInstance, headerJson } from "../../utils/constant";
import { toast, ToastContainer } from "react-toastify";

// Re-export everything
export {
  React,
  Wraper,
  Input,
  FormHeader,
  FormPara,
  TextButton,
  IconButton,
  google,
  github,
  useNavigate,
  Link,
  axiosInstance,
  headerJson,
  toast,
  ToastContainer,
};
