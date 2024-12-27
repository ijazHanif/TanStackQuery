
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/layout/Header";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import ForgetPassword from "./auth/ForgetPassword";
import VerifyCode from "./auth/VerifyCode";
import SetPassword from "./auth/SetPassword";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

// importing TanStack Query
import { QueryClient, useQuery, QueryClientProvider } from "@tanstack/react-query";  
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Book management imports
import BookForm from "./components/widgets/BookForm";
import GetAllBooks from "./components/widgets/GetAllBooks";
import ClickOpenBook from "./components/widgets/ClickOpenBook";

import ProtectRoute from "./ProtectedRoute/ProtectRoute";
import AuthContext from "./ProtectedRoute/AuthContext";

const queryclient = new QueryClient()

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Auth routing */}
      <Route path="/" element={<Header />}>
        <Route 
          index 
          element={
            <ProtectRoute isAuth={false}>
              <SignIn />
            </ProtectRoute>
          } 
        />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgetpassword" element={<ForgetPassword />} />
        <Route path="verifycode" element={<VerifyCode />} />
        <Route path="setpassword" element={<SetPassword />} />
      </Route>

      <Route
        path="/*"
        element={
          <h1 className="flex justify-center text-xl pt-20">Invalid route is applying</h1>
        }
      />

      {/* Book Management Routing, Protected */}
      <Route
        path="getallbooks"
        element={
          <ProtectRoute isAuth={true}>
            <GetAllBooks />
          </ProtectRoute>
        }
      />
      <Route
        path="bookform"
        element={
          <ProtectRoute isAuth={true}>
            <BookForm isEditMode={false} />
          </ProtectRoute>
        }
      />
      <Route
        path="editbook/:bookId"
        element={
          <ProtectRoute isAuth={true}>
            <BookForm isEditMode={true} />
          </ProtectRoute>
        }
      />
      <Route
        path="openbook/:openBookId"
        element={
          <ProtectRoute isAuth={true}>
            <ClickOpenBook />
          </ProtectRoute>
        }
      />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryclient}>
     <AuthContext>
       <RouterProvider router={router} />
       <ToastContainer />
     </AuthContext>
     <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  </StrictMode>
);







// const isLogin = localStorage.getItem("token");

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     isLogin ? (
//       // Protected Routes for Book Management (after login)
//       <>
         
//     <Route path="/" element={<Header />}>
//           <Route
//             path="getallbooks"
//             element={
//               // <ProtectRoute>
//                 <GetAllBooks />
//               // </ProtectRoute>
//             }
//           />
//           <Route
//             path="bookform"
//             element={
//               // <ProtectRoute>
//                 <BookForm isEditMode={false} />
//               // {/* </ProtectRoute> */}
//             }
//           />
//           <Route
//             path="editbook/:bookId"
//             element={
//               // <ProtectRoute>
//                 <BookForm isEditMode={true} />
//               // {/* </ProtectRoute> */}
//             }
//           />
//           <Route
//             path="openbook/:openBookId"
//             element={
//               // <ProtectRoute>
//                 <ClickOpenBook />
//               // {/* </ProtectRoute> */}
//             }
//           />
//         </Route>
//         <Route
//           path="/*"
//           element={
//             <h1 className="flex justify-center text-xl pt-20">
//               Invalid route is applying in Book Route
//             </h1>
//           }
//         />
//       </>
//     ) : (
//       <>
    
//      <Route path="/" element={<Header />}>
//        <Route index element={<SignIn />} />
//        <Route path="signup" element={<SignUp />} />
//        <Route path="forgetpassword" element={<ForgetPassword />} />
//        <Route path="verifycode" element={<VerifyCode />} />
//        <Route path="setpassword" element={<SetPassword />} />
//      </Route>
//         <Route
//           path="/*"
//           element={
//             <h1 className="flex justify-center text-xl pt-20">
//               Invalid route is applying in Auth
//             </h1>
//           }
//         />

//       </>
//     )
//   )
// );

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     {/* <AuthContext> */}
//       <RouterProvider router={router} />
//       <ToastContainer />
//     {/* </AuthContext> */}
//   </StrictMode>
// );





