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
  toast,
  axiosInstance
} from "../components/shared/CommonImports";
import { useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Yup validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  code: Yup.string()
    .matches(/^[0-9]{6}$/, "Code must be exactly 6 digits")
    .required("Verification code is required"),
});

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient(); // Access TanStack Query Cache
  const emailFromSignUp = location.state?.email || "";

  const initialValues = {
    email: emailFromSignUp || "", // Prefill if available from location
    code: "",
  };

  // Mutation for verifying the OTP
  const mutation = useMutation({
    mutationFn: async ({ email, code }) => {
      const response = await axiosInstance.post(
        "/users/verify-otp",
        { email, otp: code },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    },
    onSuccess: () => {
      // Update cache or handle successful verification
      toast.success("OTP verified successfully. You can now log in.");
      navigate("/");
    },
    onError: (error) => {
      let errorMessage = "An error occurred. Please try again.";
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          errorMessage = data.error || "Invalid OTP or OTP expired.";
        } else if (status === 403) {
          errorMessage = "Access forbidden. Please check your credentials.";
        } else if (status === 500) {
          errorMessage = "Server error. Please try again later.";
        }
      }
      toast.error(errorMessage);
    },
  });

  // Formik submit handler
  const handleSubmit = (values, { setSubmitting }) => {
    mutation.mutate(values, {
      onSettled: () => setSubmitting(false),
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, dirty, isValid }) => (
        <Form className="bg-gray-300 min-h-screen">
          <Wraper className="py-[5rem] flex justify-center">
            <div className="bg-white rounded-lg px-6 py-14 lg:w-1/3">
              <div className="mb-6">
                <Link to="/">
                  <div className="flex items-center space-x-2 text-sm cursor-pointer font-medium">
                    <span className="text-3xl font-light">&lt;</span>
                    <span>Back to login</span>
                  </div>
                </Link>
              </div>
              <div className="space-y-5">
                <div className="space-y-5 pb-3">
                  <FormHeader>Verify Code</FormHeader>
                  <FormPara>
                    An authentication code has been sent to your email.
                  </FormPara>
                </div>

                {/* Email Field */}
                <div className="mb-4">
                  <Field
                    as={Input}
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="mb-4"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Verification Code Field */}
                <div className="mb-4">
                  <Field
                    as={Input}
                    name="code"
                    type="text"
                    placeholder="Enter the verification code"
                    className="mb-4"
                  />
                  <ErrorMessage
                    name="code"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Submit Button */}
                <TextButton
                  type="submit"
                  className="w-full"
                  loading={mutation.isLoading} // Use mutation's loading state
                  disabled={!dirty || !isValid || mutation.isLoading || isSubmitting}
                >
                  Verify
                </TextButton>
              </div>
            </div>
          </Wraper>
        </Form>
      )}
    </Formik>
  );
};

export default VerifyCode;
