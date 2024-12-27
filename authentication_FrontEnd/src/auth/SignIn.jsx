import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  React,
  Wraper,
  Input,
  FormHeader,
  FormPara,
  TextButton,
  Link,
  useNavigate,
  axiosInstance,
  toast,
} from "../components/shared/CommonImports";
import "react-toastify/dist/ReactToastify.css";
import GoogleAuth from "./GoogleAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const SignIn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Manage query cache globally

  const initialValues = {
    email: "ijaz123@gmail.com",
    password: "Pa$$w0rd!",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(7, "Password must be at least 7 characters")
      .required("Password is required"),
  });

  
  const mutation = useMutation(
    {
    mutationFn:(values) =>
      axiosInstance.post("/users/login", values, {
        headers: { "Content-Type": "application/json" },
      },
    ),
    refetchInactive: false,    
      onSuccess: (response) => {
        if (response.status === 200) {
          toast.success("Login successful!");
          localStorage.setItem("token", response?.data?.token);
          console.log("Login response token:", response?.data?.token);
          navigate("/getallbooks");

          // Optionally clear affected queries
          queryClient.invalidateQueries("user"); 
        }
      },
      onError: (error) => {
        let errorMessage;

        if (error.response) {
          const { status, data } = error.response;

          if (status === 400) {
            errorMessage = "Invalid email or password. Please try again.";
          } else if (status === 403) {
            errorMessage =
              "Your account is not activated. Please check your email for activation.";
          } else if (status === 429) {
            errorMessage =
              "Too many login attempts. Please wait a few minutes and try again.";
          } else if (status === 500) {
            errorMessage = "Server error. Please try again later.";
          } else if (data && data.message) {
            errorMessage = data.message;
          }
        }

        toast.error(errorMessage || "An error occurred during login.");
        console.error("Error message:", errorMessage || error.message);
      },
}

);
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    mutation.mutate(values);
    resetForm();
    setSubmitting(false); 
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="bg-gray-300 min-h-screen">
            <Wraper className="py-[1.7rem] flex justify-center">
              <div className="bg-white rounded-lg px-6 py-14 lg:w-1/3">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <FormHeader>Hi, Welcome Back</FormHeader>
                    <FormPara>Enter your credentials to continue</FormPara>
                  </div>
                  <div className="mb-4">
                    <Field
                      as={Input}
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className={
                        touched.email && errors.email ? "border-red-500" : ""
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      as={Input}
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className={
                        touched.password && errors.password
                          ? "border-red-500"
                          : ""
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center text-sm font-medium">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <Field
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        className="mr-2"
                      />
                      <label htmlFor="rememberMe" className="text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <Link to="forgetpassword">
                      <h1 className="text-red-400 cursor-pointer mt-2 sm:mt-0">
                        Forgot Password
                      </h1>
                    </Link>
                  </div>
                  <TextButton
                    type="submit"
                    className="w-full"
                    loading={mutation.isLoading}
                  >
                    {mutation.isLoading ? "Logging in..." : "Login"}
                  </TextButton>
                  <div className="sm:flex justify-center gap-1 font-medium">
                    <h1 className="text-center">Don't have an account?</h1>
                    <Link to="signup">
                      <p className="text-red-400 text-center">Sign up</p>
                    </Link>
                  </div>
                  <div className="flex items-center my-4">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="mx-4 text-gray-700 font-medium">
                      Login with
                    </span>
                    <hr className="flex-grow border-t border-gray-300" />
                  </div>
                  <GoogleAuth />
                </div>
              </div>
            </Wraper>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignIn;
