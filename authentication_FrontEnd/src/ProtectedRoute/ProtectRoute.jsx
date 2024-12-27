
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenicated", isAuthenticated)

  if (isAuthenticated && !isAuthenticated) {
    return <Navigate to="/" replace/>;
  }

  return children;
};

export default ProtectedRoute;




// import { Navigate } from 'react-router-dom';

// const ProtectRoute = ({ children, isAuth }) => {
//   const token = localStorage.getItem("token");

//   // If the user is authenticated and trying to access the SignIn page, redirect to a protected route
//   if (token && isAuth) {
//     return <Navigate to="/getallbooks" />; // Redirect to the main page after sign-in
//   }

//   // If there's no token and user tries to access protected routes, redirect to SignIn
//   if (!token && !isAuth) {
//     return <Navigate to="/" />;
//   }

//   // Render the children (protected components)
//   return children;
// };

// export default ProtectRoute;
