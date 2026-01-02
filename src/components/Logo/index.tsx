import type React from "react";

interface LogoProps {
  size: { width: string; height: string };
}
const Logo: React.FC<LogoProps> = ({ size }) => {
  return (
    <>
      <img style={size} src={"./src/assets/header-title.svg"} />
    </>
  );
};

export default Logo;
