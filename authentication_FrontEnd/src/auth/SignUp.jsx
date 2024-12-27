import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  React,
  Wraper,
  Input,
  FormHeader,
  FormPara,
  TextButton,
  useNavigate,
  Link,
  axiosInstance,
  headerJson,
  toast,
} from "../components/shared/CommonImports";
import "react-toastify/dist/ReactToastify.css";
import GoogleAuth from "./GoogleAuth";

import { useMutation, useQueryClient } from "@tanstack/react-query";
const signUpApi = async (values) => {
  const response = await axiosInstance.post(
    "/users/signup",
    values,
    headerJson
  );
  return response;
};

const SignUp = () => {
  const [loading, setLoading] = React.useState(false); 
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    {
    mutationFn: signUpApi, 
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (response) => {
      toast.success("Sign up successful!");
      queryClient.invalidateQueries("user"); // invalidate the cache if needed (optional)
      navigate("/verifycode", { state: { email: response.data.email } });
      setLoading(false);
    },
    onError: (error) => {
      let errorMessage = "An unknown error occurred";
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) errorMessage = data.message || "Invalid input.";
        if (status === 403) errorMessage = data.message || "Access forbidden.";
        if (status === 429) errorMessage = data.message || "Too many requests.";
        if (status === 500) errorMessage = data.message || "Server error.";
      }
      toast.error(errorMessage);
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    cellno: "",
    password: "",
    confirmpassword: "",
    terms: false,
  };

  const validationSchema = Yup.object({
    firstname: Yup.string()
      .required("First name is required")
      .matches(/[a-zA-Z]/, "Must be alphabetic")
      .max(10, "Name must be less than 10 characters"),
    lastname: Yup.string()
      .required("Last name is required")
      .matches(/[a-zA-Z]/, "Must be alphabetic")
      .max(10, "Last name must be less than 10 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    cellno: Yup.string()
      .matches(/^[0-9]+$/, "Must be a valid number")
      .matches(/^03/, "Must start from 03")
      .length(11, "Phone number must be exactly 11 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(7, "Password must be at least 7 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
      .required("Password is required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm your password"),
    terms: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("Terms must be accepted"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    mutation.mutate(values); // Trigger the mutation
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={true} 
      validateOnBlur={true} 
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isValid, dirty }) => (
        <div className="bg-gray-300 min-h-screen">
          <Wraper className="py-[1.7rem] flex justify-center">
            <div className="bg-white rounded-lg px-6 py-14 lg:w-1/3">
              <div className="space-y-6">
                <div className="space-y-2">
                  <FormHeader>Sign Up</FormHeader>
                  <FormPara>Enter your credentials to continue</FormPara>
                </div>
                <Form>
                  <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 gap-x-6">
                    <div className="mb-4">
                      <Field
                        as={Input}
                        type="text"
                        name="firstname"
                        placeholder="First name"
                        className={touched.firstname && errors.firstname ? "border border-red-500 rounded-md" : ""}
                      />
                      <ErrorMessage name="firstname" component="div" className="border text-red-500 text-sm rounded-md" />
                    </div>
                    <div className="mb-4">
                      <Field
                        as={Input}
                        type="text"
                        name="lastname"
                        placeholder="Last name"
                        className={touched.lastname && errors.lastname ? "border border-red-500 rounded-md" : ""}
                      />
                      <ErrorMessage name="lastname" component="div" className="border text-red-500 text-sm rounded-md" />
                    </div>
                    <div className="mb-4">
                      <Field
                        as={Input}
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className={touched.email && errors.email ? "border border-red-500 rounded-md" : ""}
                      />
                      <ErrorMessage name="email" component="div" className="border text-red-500 text-sm rounded-md" />
                    </div>
                    <div className="mb-4">
                      <Field
                        as={Input}
                        type="text"
                        name="cellno"
                        placeholder="Enter your number"
                        className={touched.cellno && errors.cellno ? "border border-red-500 rounded-md" : ""}
                      />
                      <ErrorMessage name="cellno" component="div" className="border text-red-500 text-sm" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-4">
                      <Field
                        as={Input}
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className={touched.password && errors.password ? "border border-red-500 rounded-md" : ""}
                      />
                      <ErrorMessage name="password" component="div" className="border text-red-500 text-sm rounded-md" />
                    </div>
                    <div className="mb-4">
                      <Field
                        as={Input}
                        type="password"
                        name="confirmpassword"
                        placeholder="Confirm your password"
                        className={touched.confirmpassword && errors.confirmpassword ? "border border-red-500 rounded-md" : ""}
                      />
                      <ErrorMessage name="confirmpassword" component="div" className="border text-red-500 text-sm rounded-md" />
                    </div>
                    <div className="mb-4">
                      <label className="inline-flex items-center">
                        <Field
                          type="checkbox"
                          name="terms"
                          className="form-checkbox"
                        />
                        <span className="ml-2 text-sm">
                          I agree to the{" "}
                          <Link href="#" className="text-blue-600">
                            Terms and Conditions
                          </Link>
                        </span>
                      </label>
                      <ErrorMessage name="terms" component="div" className="border text-red-500 text-sm rounded-md" />
                    </div>
                  </div>
                  <div className="mb-6 flex items-center justify-between">
                    <TextButton
                      variant="primary"
                      type="submit"
                      loading={loading} // Pass loading state
                      className="w-full"
                      disabled={!isValid || !dirty || loading}
                    >
                      Create Account
                    </TextButton>
                  </div>
                </Form>
                <GoogleAuth />
              </div>
            </div>
          </Wraper>
        </div>
      )}
    </Formik>
  );
};

export default SignUp;
