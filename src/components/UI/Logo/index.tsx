import logo from "@/assets/images/brand/logo.png";
import styles from "./index.module.scss";

const Logo = () => {
  return (
    <div className={styles.Logo}>
      <img src={logo} alt="logo" />
    </div>
  );
};

export default Logo;
