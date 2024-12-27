import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
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
} from '../components/shared/CommonImports';
import GoogleAuth from './GoogleAuth';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
});

const ForgetPassword = () => {
  const initialValues = {
    email: ''
  };

  const navigate = useNavigate();
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Send the email to the backend API to request a password reset
      const response = await axiosInstance.post(
        '/users/request-reset-password',
        { email: values.email },
        headerJson
      );
      console.log(response?.data?.resetToken, "users/request-reset-password");
      localStorage.setItem("token", response?.data?.resetToken);
      toast.success('Password reset link sent to your email!');
      navigate('/setpassword');
      resetForm();
    } 
    catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Failed to send password reset link. Please try again.';
      toast.error(errorMessage);
    } finally {
      // Stop submitting
      setSubmitting(false);
    }
  };

  return (
    <>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="bg-gray-300 min-h-screen">
          <Wraper className='py-[1.7rem] flex justify-center'>
            <div className="bg-white rounded-lg px-6 py-14 lg:w-1/3">
              <div className="space-y-5">
                <div className="space-y-5 pb-3">
                  <FormHeader>Forgot your password?</FormHeader>
                  <FormPara>Don’t worry, happens to all of us. Enter your email below to recover your password</FormPara>
                </div>
                <div className="mb-4">
                  <Field
                    as={Input}
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
                <TextButton type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </TextButton>

                <div className="flex items-center my-4">
                  <hr className="flex-grow border-t border-gray-300" />
                  <span className="mx-4 text-gray-700 font-medium">or Login with</span>
                  <hr className="flex-grow border-t border-gray-300" />
                </div>
                 
                 <GoogleAuth/>
              </div>
            </div>
          </Wraper>
        </Form>
      )}
    </Formik>
    {/* <ToastContainer /> */}
    </>
  );
};

export default ForgetPassword;
