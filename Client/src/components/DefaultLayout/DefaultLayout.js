// Import library
import classNames from "classnames/bind";

// Import component
import Header from "../Header";

// Import css
import styles from "./DefaultLayout.module.scss";
//components
import Footer from "../Footer"

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx("container")}>
      <header className="header">
        <Header />
      </header>
      <div className="main" style={{marginTop:200, marginBottom: -200}}>{children}</div>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}

export default DefaultLayout;
