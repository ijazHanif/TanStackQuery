import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

// Get the token from localStorage and add it to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token after calling api", token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(
      "Token can not succesully send to backend Error:",
      error
    );
  }
);

const headerJson = {
  headers: {
    "Content-Type": "application/json",
  },
};

const headerMultipart = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export { axiosInstance, headerJson, headerMultipart };




// import axios from "axios";

// const axiosInstance = axios.create({
//     baseURL :'http://localhost:3000',
//     headers : {
//         'Content-Type' : 'application/json',
//     },
// })

// export default axiosInstance;

// import React, { useEffect, useState } from "react";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { axiosInstance, headerJson } from "./utils/constant";

// // Define a validation schema using Yup
// const validationSchema = Yup.object().shape({
//   email: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
// });

// const App = () => {
// const [data, setData] = useState([])

//   //post api example
//   const signUp = async (values) => {
//     const body = {
//       email: values.email,
//       password: values.password,
//     };
//     try {
//       const response = await axiosInstance.post("/posts/1", body, headerJson);
//       if (response.status == 200) {
//         toast.success("Successfully register");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong while register");
//     }
//   };

//   //get api example
//   const getData = async ()=>{
//     try {
//       const response = await axiosInstance.get("/posts");
//       if(response.status == 200){
//         setData(response.data)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(()=>{
//     getData()
//   }, [])

//   return (
//     <Formik
//       initialValues={{ email: "", password: "" }} // Initial form values
//       validationSchema={validationSchema} // Schema for validation
//       onSubmit={(values, { setSubmitting }) => {
//         signUp(values);
//         setSubmitting(false);
//       }}
//     >
//       {({ touched, errors, isSubmitting }) => (
//         <Form>
//           {/* Email Field */}
//           <div>
//             <label htmlFor="email">Email</label>
//             <Field name="email" type="email" />
//             {touched.email && errors.email ? (
//               <div style={{ color: "red" }}>{errors.email}</div>
//             ) : null}
//           </div>

//           {/* Password Field */}
//           <div>
//             <label htmlFor="password">Password</label>
//             <Field name="password" type="password" />
//             {touched.password && errors.password ? (
//               <div style={{ color: "red" }}>{errors.password}</div>
//             ) : null}
//           </div>

//           <button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? "Submitting..." : "Submit"}
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default App;
