import { assets } from "../../../assets/assets";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="Yum logo" />
      <img className="profile" src={assets.profile_image} alt="Admin profile" />
    </div>
  );
};

export default Navbar;
