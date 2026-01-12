import React from "react";
import { icons } from "./icons";
import "./loadIcon.module.scss";

interface LoadIconProps {
  icon: "home" | "library" | "scene";
  status?: "default" | "selected";
  className?: string;
}

export const SVGWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 128 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    {children}
  </svg>
);

const LoadIcon: React.FC<LoadIconProps> = ({
  icon,
  status = "default",
  className,
}) => {
  const Icon = icons[icon];

  const fillColor =
    status === "selected" ? "var(--color-selected)" : "var(--color-default)";

  return (
    <span className={className}>
      <Icon fillColor={fillColor} />
    </span>
  );
};

export default LoadIcon;
