import Image from "next/image";
import Logo from "../../../public/logo.avif";

const Footer = () => {
  return (
    <footer className="bg-red-300 py-16">
      <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-0">
          <Image
            src={Logo}
            alt="Out Logo pic"
            placeholder="blur"
            quality={100}
            height="70"
            style={{ objectFit: "cover" }}
          />
          <p className="my-5">
            Lorem vitae ut augue auctor faucibus eget eget ut libero. Elementum
            purus et arcu massa dictum condimentum. Augue scelerisque iaculis
            orci ut habitant laoreet. Iaculis tristique.
          </p>
          <p>All Rights Reserved.</p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <p className="text-lg font-bold">Links</p>
          <p className="my-5">See open issues</p>
          <p className="my-5">File a bug</p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <p className="text-lg font-bold">Contact Us</p>
          <p className="my-5">E-mail: natalija@gmail.com</p>
          <p>(333)425-6825</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
