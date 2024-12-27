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
  headerJson,
  toast,
} from "../shared/CommonImports";

const Header = () => {
  const navigate = useNavigate();

 const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/", { replace: true });
};


  return (
    <span className="grid space-x-2 grid-cols-12">
      <div className="col-span-10 flex justify-between items-center bg-white px-4 py-2.5 rounded-lg text-xl font-bold">
        <div className="space-x-1">
          <span>Book</span>
          <span className="bg-purple-taupe px-1 rounded text-white">
            Portal
          </span>
        </div>
        <div className="space-x-2">
          <button
            className="bg-purple-taupe text-white px-1.5 py-2 rounded-lg"
            onClick={() => navigate("/bookform")}
          >
            +Add Book
          </button>
        </div>
      </div>
      <TextButton className="col-span-2 text-lg" onClick={handleLogout}>
        Logout
      </TextButton>
    </span>
  );
};

export default Header;
