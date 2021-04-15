import Link from "next/link";
import React from "react";
import { FaGooglePlusG, FaRegCopyright } from "react-icons/fa";
import { RiFacebookFill, RiLinkedinFill, RiYoutubeFill } from "react-icons/ri";
import IanaTekLogo from "../../../_components/front/IanaTekLogo";

const IANATEK_YEAR_DEBUT = 2021;

function Footer() {

  const year = (new Date).getFullYear();

  return (
    <footer id="main-footer" className="bg33">
      <div className="flex flex-col md:flex-row justify-between items-center py-2 sm:px-4 md:px-8">
        <div className="flex items-center mb-8 md:mb-0">
          <img src="/images/image-cv.jpg" alt="Tahirintsoa Ulrich" className="w-16 rounded-full" />
          <h1 className="flex flex-col mx-4 justify-center items-center">
            <span className="font-bold tracking-widest text-2xl">Tahirintsoa Ulrich</span>
            <span className="text-sm">( IanaTek's creator - Fullstack Web Developer )</span>
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

      <div className="py-2 px-4 md:px-8 flex flex-col lg:flex-row justify-center lg:justify-between items-center">
        {/* <h1 className="text-lg font-semibold tracking-widest mr-4">Ireo teknôlôjy nanaovana an IanaTek :</h1> */}
        <div className="flex items-center mt-2 mb-2">
          <Link href="https://php.net">
            <a className="mr-8">
              <img src="/images/tech-icons/php-icon.png" className="w-8" alt="PHP" />
            </a>
          </Link>
          <Link href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
            <a className="mr-8">
              <img src="/images/tech-icons/javascript-icon.png" className="w-8" alt="Javascript" />
            </a>
          </Link>
          <Link href="https://laravel.com">
            <a className="mr-8" target="_blank" title="Laravel">
              <img src="https://laravel.com/img/logomark.min.svg" className="w-8" alt="Laravel" />
            </a>
          </Link>
          <Link href="https://nextjs.org">
            <a className="mr-8" target="_blank" title="Next JS">
              <img src="/images/tech-icons/nextjs-icon.png" className="w-8" alt="Next JS" />
            </a>
          </Link>
          <Link href="https://reactjs.org">
            <a className="mr-8" target="_blank" title="React JS">
              <img src="/images/tech-icons/react-icon.svg" className="w-8" alt="React JS" />
            </a>
          </Link>
          <Link href="https://sass-lang.com">
            <a className="mr-8" target="_blank" title="Sass">
              <img src="https://sass-lang.com/assets/img/logos/logo-b6e1ef6e.svg" className="w-8" alt="Sass" />
            </a>
          </Link>
        </div>

        <div className="flex items-center text-2xl font-bold tracking-widest my-4 lg:my-0">
          <FaRegCopyright className="mr-4 text-base" />
          <div className="text-base mr-4">
            {year === IANATEK_YEAR_DEBUT ? year : `${IANATEK_YEAR_DEBUT} - ${year}`}
          </div>
          <IanaTekLogo />
          <div className="text-xs px-2 py-4 border-2 rounded-full mr-4">v1.0</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
