import Link from "next/link";
import React from "react";
import { FaGooglePlusG } from "react-icons/fa";
import { RiFacebookFill, RiGoogleLine, RiGooglePlayFill, RiLinkedinFill, RiYoutubeFill } from "react-icons/ri";

function Footer() {
  return (
    <footer id="main-footer" className="bg33">
      <div className="flex flex-col md:flex-row justify-between items-center py-2 sm:px-4 md:px-8">
        <div className="flex items-center mb-8 md:mb-0">
          <img src="/images/image-cv.jpg" alt="Tahirintsoa Ulrich" className="w-16 rounded-full" />
          <h1 className="flex flex-col mx-4 justify-center items-center">
            <span className="font-bold tracking-widest text-2xl">Tahirintsoa Ulrich</span>
            <span className="text-sm">( IanaTek's creator )</span>
          </h1>
        </div>
        <div className="flex items-center text-2xl">
          <Link href="https://web.facebook.com/rtfulrich/">
            <a target="_blank" className="mx-4 p-4 bg-black rounded-full">
              <RiFacebookFill className="text-blue-500" />
            </a>
          </Link>
          <Link href="https://www.youtube.com/channel/UCLTSmmsHyMQ9ArU5u_TJ52A">
            <a target="_blank" className="mx-4 p-4 bg-black rounded-full">
              <RiYoutubeFill className="text-red-500" />
            </a>
          </Link>
          <Link href="https://www.linkedin.com/in/tahirintsoa-ulrich-0018121a1/">
            <a target="_blank" className="mx-4 p-4 bg-black rounded-full">
              <RiLinkedinFill className="twitter" />
            </a>
          </Link>
          <Link href="mailto:rtfulrich@gmail.com">
            <a target="_blank" className="mx-4 p-4 bg-black rounded-full">
              <FaGooglePlusG className="text-yellow-300" />
            </a>
          </Link>
        </div>
      </div>

      <hr />

      <div className="py-2 px-4 md:px-8 flex flex-col jusfify-center items-center">
        {/* <h1 className="text-lg font-semibold tracking-widest mr-4">Ireo teknôlôjy nanaovana an IanaTek :</h1> */}
        <div className="flex items-center mt-2 mb-2">
          <Link href="https://laravel.com">
            <a className="mx-8"><img src="https://laravel.com/img/logomark.min.svg" className="w-8" alt="Laravel" /></a>
          </Link>
          <Link href="https://nextjs.org">
            <a className="mx-8" target="_blank">
              <img src="/images/tech-icons/nextjs-icon.png" className="w-8" alt="Next JS" />
            </a>
          </Link>
          <Link href="https://reactjs.org">
            <a className="mx-8" target="_blank">
              <img src="/images/tech-icons/react-icon.svg" className="w-8" alt="React JS" />
            </a>
          </Link>
          <Link href="https://sass-lang.com">
            <a className="mx-8" target="_blank">
              <img src="https://sass-lang.com/assets/img/logos/logo-b6e1ef6e.svg" className="w-8" alt="Sass" />
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
