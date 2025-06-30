import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./header.module.css";
import Logo from "../../../public/logo.avif";

const SignIn = dynamic(() => import("../SignIn/signin"), { ssr: false });
const ThemeToggle = dynamic(() => import("../ui/ThemeToogle"), { ssr: false });

const Header = () => {
  return (
    <header
      className={`bg-red-300 text-black dark:bg-red-900 dark:text-white ${styles.headerContainer}`}
    >
      <div className={styles.headerLogo}>
        <Image
          src={Logo}
          alt="Out story pic"
          width={70}
          height={70}
          priority
          style={{ objectFit: "cover" }}
        />
        <Link href="/">THEDOGGOCODY</Link>
      </div>

      <nav className={styles.headerBreadcrums}>
        <div className={styles.headerLinks}>
          <h3>
            <Link href="/alldogs" prefetch>
              All Dogs
            </Link>
          </h3>
          <h3>
            <Link href="/adoption">Dogs for Adoption</Link>
          </h3>
          <h3>
            <Link href="/addforadoption">Add Dogs For Adoption</Link>
          </h3>
          <h3>
            <Link href="/dog-classifier">Dog Classifier</Link>
          </h3>
          <h3>
            <Link href="/contactus">Contact Us</Link>
          </h3>
          <h3>
            <Link href="/askquestion">Ask Us Question?</Link>
          </h3>
        </div>
      </nav>

      <div className={styles.clientControls}>
        <SignIn />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
