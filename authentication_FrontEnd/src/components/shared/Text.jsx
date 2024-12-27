import React from "react";

const Text = ({ children, className, variant = "p" }) => {
  switch (variant) {
    case "h1":
      return <h1 className={className}>{children}</h1>;
    case "h2":
      return <h2 className={`text-[2.5rem] leading-[3.8rem] font-semibold text-purple-taupe ${className}`}>{children}</h2>;
    case "h3":
      return <h3 className={className}>{children}</h3>;
    case "h4":
      return <h4 className={className}>{children}</h4>;
    case "h5":
      return <h5 className={className}>{children}</h5>;
    case "h6":
      return <h6 className={className}>{children}</h6>;
    case "p":
      return <p className={className}>{children}</p>;
    default:
      return <p className={className}>{children}</p>;
  }
};

export default Text;
