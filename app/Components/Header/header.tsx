import Link from "next/link";
import React from "react";
import styles from "./header.module.css";
import Image from "next/image";
import Logo from "../../../public/logo.avif";
import ThemeToggle from "../ui/ThemeToogle";
import SignIn from "../SignIn/signin";

const Header = () => {
  return (
    <header
      className={`bg-red-300 text-black dark:bg-red-900 dark:text-white ${styles.headerContainer}`}
    >
      <div className={styles.headerLogo}>
        <div>
          <Image
            src={Logo}
            alt="Out story pic"
            placeholder="blur"
            quality={100}
            height="70"
            style={{ objectFit: "cover" }}
          />
        </div>

        <Link className="" href={"/"}>
          THEDOGGOCODY
        </Link>
      </div>
      <div className={styles.headerBreadcrums}>
        <div className={styles.headerLinks}>
          <h3>
            <Link className="" href="/alldogs">
              All Dogs
            </Link>
          </h3>
          <h3>
            <Link className="" href="/contactus">
              Contact Us
            </Link>
          </h3>
          <h3>
            <Link className="" href="/askquestion">
              Ask Us Question?
            </Link>
          </h3>
        </div>
        <SignIn />
      </div>
      <div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
