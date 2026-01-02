interface TeamLogoProps {
  size: { width: string; height: string };
}

const TeamLogo: React.FC<TeamLogoProps> = ({ size }) => {
  return <img style={size} src={"./src/assets/pixeldawn-logo.svg"} />;
};

export default TeamLogo;
