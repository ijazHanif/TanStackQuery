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
  toast,
} from '../components/shared/CommonImports';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const validationSchema = Yup.object({
  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .required('Password is required')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .matches(/[0-9]/, 'Password must contain at least one number'),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm your password'),
});

const SetPassword = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // For cache management

  const initialValues = {
    token: '',
    password: '',
    confirmpassword: '',
  };

  // Define the mutation for resetting the password
  const mutation = useMutation(
    async ({ token, password }) => {
      const resetBody = {
        token: localStorage.getItem('token'),
        password,
        confirmpassword: password, // Ensure confirm password matches in body
      };

      const response = await axiosInstance.post('/users/reset-password', resetBody);
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success('Password has been reset successfully!');
        navigate('/'); // Navigate to the login page or desired route
      },
      onError: (error) => {
        let errorMessage = 'An error occurred. Please try again.';
        if (error.response) {
          errorMessage = error.response.data || errorMessage;
        }
        toast.error(errorMessage);
      },
    }
  );

  const handleSubmit = (values, { setSubmitting }) => {
    mutation.mutate(
      { token: values.token, password: values.password },
      {
        onSettled: () => setSubmitting(false), // Ensure submit button is re-enabled
      }
    );
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-gray-300 min-h-screen">
            <Wraper className="py-[1.7rem] flex justify-center">
              <div className="bg-white rounded-lg px-6 py-14 lg:w-1/3">
                <div className="space-y-5">
                  <div className="space-y-5 pb-3">
                    <FormHeader>Set a Password</FormHeader>
                    <FormPara>Your previous password has been reset. Please set a new password for your account.</FormPara>
                  </div>

                  <div className="mb-4">
                    <Field
                      as={Input}
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="mb-4">
                    <Field
                      as={Input}
                      name="confirmpassword"
                      type="password"
                      placeholder="Confirm your password"
                    />
                    <ErrorMessage name="confirmpassword" component="div" className="text-red-500 text-sm" />
                  </div>

                  <TextButton type="submit" className="w-full" disabled={isSubmitting || mutation.isLoading}>
                    {isSubmitting || mutation.isLoading ? 'Setting Password...' : 'Set Password'}
                  </TextButton>
                </div>
              </div>
            </Wraper>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SetPassword;




// useQueryData    //for get api
// setQueryData   // set api data in Cache
// getQueryData   // get data from Cache