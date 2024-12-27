import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const TextButton = ({
  children,
  variant = "primary",
  type = "button",
  className = "",
  href,
  loading = false, // Add loading prop
  ...props
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (href) {
      navigate(href);
    }
  };

  const baseStyles = "px-8 py-2.5 leading-6 focus:outline-none ";
  let variantStyles = "";

  switch (variant) {
    case "primary":
      variantStyles = "bg-purple-taupe text-white hover:bg-opacity-80 ";
      break;
    case "secondary":
      variantStyles = "bg-black text-white hover:bg-opacity-80";
      break;
    case "outlined":
      variantStyles =
        "border border-purple-taupe text-purple-taupe hover:text-white hover:bg-purple-taupe hover:bg-opacity-80";
      break;
    default:
      variantStyles = "";
  }

  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-lg ${baseStyles} ${variantStyles} ${className}`}
      onClick={handleClick}
      type={type}
      disabled={loading} // Disable button if loading
      {...props}
    >
      {loading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18px"
          fill="#fff"
          className="mr-2 animate-spin"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
            data-original="#000000"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default memo(TextButton);
