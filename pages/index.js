import axios from "axios";
import Link from "next/link";
import { FaMoneyBill } from "react-icons/fa";
import { technologies } from "../_constants/techs";
import { API_URL } from "../_constants/URLs";
import getPageProps from "../_helpers/getPageProps";
import { REVALIDATE } from "../_constants/nextConstants";

export default function Home({ courses, challenges }) {
  // console.log(props.withFooter);

  const techs = technologies;
  return (
    <div>
      <div className="relative">
        <img src="/images/ianatek_cover.jpg" alt="Ianatek Cover" className="h-full w-full" />
        <div className="absolute top-0 w-full flex justify-center">
          <h1 className="text-3xl md:text-5xl xl:text-6xl text-black font-bold tracking-widest">Tongasoa eto amy IanaTek</h1>
        </div>
      </div>

      {/* Technologies */}
      <div className="px-2 md:px-16 py-4">
        <div className="grid grid-cols-5 gap-2 md:gap-8">
          {techs.map(tech => (
            <div className="rounded-xl  overflow-hidden transition-colors duration-300 ease-in-out border-2 border-black hover:border-blue-500 -mt-12 z-10" key={tech.tag}>
              {/* <Link href={`/${tech.tag}`}> */}
              <Link href="#">
                <a onClick={e => e.preventDefault()}>
                  <img src={`/images/tech-covers/${tech.image}`} alt={tech.tag} className="w-full h-full transition-all duration-300 transform hover:scale-110" />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Courses */}
      {courses.length > 0 && (
        <div className="px-2 md:px-4 lg:px-8 my-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-bold tracking-widest">Ireo fampianarana farany</h1>
            {
              courses.length > 4 && <Link href="/fampianarana">
                <a className="px-2 py-1 text-xs font-bold tracking-widest rounded-lg bg45 hover:bg33 transition-colors duration-300 ease-in-out" style={{ textDecoration: "none" }}>Izy rehetra</a>
              </Link>
            }
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            {courses.map(course => {
              // const tag = course.tags.length > 0 ? `/${course.tags[0].name}` : "/";
              return (
                <div key={course.id} className="bg45 bg-opacity-10 rounded-xl overflow-hidden relative border-2 border-black hover:border-blue-500 flex flex-col transition-colors duration-300 ease-in-out">
                  <div className="flex justify-center items-center overflow-hidden relative">
                    <img src={course.image_cover} className="min-h-full min-w-full w-auto" />
                    <div className="absolute bottom-1 right-1 font-bold tracking-widest text-xs text-black">{course.level}</div>
                  </div>
                  <div className="my-2 px-2 flex-1 flex flex-col justify-between">
                    <h1 className="font-bold mb-2">
                      {/* <Link href={`/fampianarana${tag}/${course.slug}`}> */}
                      <Link href={`/fampianarana/${course.id}/${course.slug}`}>
                        <a className="hover:text-blue-500 text-sm sm:text-base lg:text-sm xl:text-base" style={{ textDecoration: "none" }}>{course.title}</a>
                      </Link>
                    </h1>
                    <div className={`flex items-center ${course.price > 0 && course.tags.length > 0 ? "justify-between" : "justify-end"}`}>
                      {course.price > 0 && <div className="px-2 text-xs bg-yellow-300 text-black rounded-full font-bold">
                        {course.price} ar
                  </div>}
                      <div>
                        {course.tags.map(tag => (
                          <span className="mr-1 px-2 text-xs font-semibold py-1 bg-black mb-1 tracking-widest rounded-full" key={tag.id}>{tag.name}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* if course is not free */}
                  {
                    course.price > 0 && (<>
                      <span className="absolute top-1 left-2 transform -rotate-45 z-10"><FaMoneyBill /></span>
                      <div className="absolute -top-2 -left-6 transform -rotate-45 success-bg w-16 h-9"></div>
                    </>)
                  }
                </div>
              );
            }
            )}
          </div>
        </div>
      )}

      {/* Challenges */}
      {challenges.length > 0 && (
        <div className="px-2 md:px-4 lg:px-8 my-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-bold tracking-widest">Ireo challenges farany</h1>
            {
              challenges.length > 4 && <Link href="/challenges">
                <a className="px-2 py-1 text-xs font-bold tracking-widest rounded-lg bg45 hover:bg33 transition-colors duration-300 ease-in-out" style={{ textDecoration: "none" }}>Izy rehetra</a>
              </Link>
            }
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            {challenges.map(challenge => {
              // const tag = challenge.tags.length > 0 ? `/${challenge.tags[0].name}` : "/";
              return (
                <div key={challenge.id} className="bg45 bg-opacity-10 rounded-xl overflow-hidden relative border-2 border-black hover:border-blue-500 flex flex-col transition-colors duration-300 ease-in-out">
                  <div className="flex justify-center items-center overflow-hidden">
                    <img src={challenge.image_cover} className="min-h-full min-w-full w-auto" />
                  </div>
                  <div className="my-2 px-2 flex-1 flex flex-col justify-between">
                    <h1 className="font-bold mb-2">
                      {/* <Link href={`/challenges${tag}/${challenge.slug}`}> */}
                      <Link href={`/challenge/${challenge.id}/${challenge.slug}`}>
                        <a className="hover:text-blue-500 text-sm sm:text-base lg:text-sm xl:text-base" style={{ textDecoration: "none" }}>{challenge.title}</a>
                      </Link>
                    </h1>
                    <div className={`flex items-center ${challenge.price > 0 && challenge.tags.length > 0 ? "justify-between" : "justify-end"}`}>
                      {challenge.price > 0 && <div className="px-2 text-xs bg-yellow-300 text-black rounded-full font-bold">
                        {challenge.price} ar
                  </div>}
                      <div>
                        {challenge.tags.map(tag => (
                          <span className="mr-1 px-2 text-xs font-semibold py-1 bg-black mb-1 tracking-widest rounded-full" key={tag.id}>{tag.name}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* if course is not free */}
                  {
                    challenge.price > 0 && (<>
                      <span className="absolute top-1 left-2 transform -rotate-45 z-10"><FaMoneyBill /></span>
                      <div className="absolute -top-2 -left-6 transform -rotate-45 success-bg w-16 h-9"></div>
                    </>)
                  }
                </div>
              );
            }
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export async function getStaticProps() {
  return await getPageProps(async () => {

    const response = await axios.get(`${API_URL}`);

    const { courses, challenges } = response.data;

    return {
      props: {
        page: {
          title: "IanaTek",
          // noFooter: true,
        },
        courses, challenges
      },
      revalidate: REVALIDATE,
    }
  });
}