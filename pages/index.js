import axios from "axios";
import Link from "next/link";
import { technologies } from "../_constants/techs";
import { API_URL } from "../_constants/URLs";
import getPageProps from "../_helpers/getPageProps";
import { REVALIDATE } from "../_constants/nextConstants";
import PostGridItem from "../_components/front/PostGridItem";

export default function Home({ courses, challenges, tutorials, blogs }) {

  const techs = technologies;
  return (
    <div>
      <div className="relative">
        <img src="/images/ianatek_cover.jpg" alt="Ianatek Cover" className="h-full w-full" />
      </div>

      {/* Technologies */}
      <header className="px-2 md:px-16 py-4">
        <div className="grid grid-cols-5 gap-2 md:gap-8">
          {techs.map((tech, index) => (
            <div className="rounded-xl  overflow-hidden transition-colors duration-300 ease-in-out border-2 border-black hover:border-blue-500 -mt-12 z-10" key={index}>
              <Link href={`/tag/${tech.tag}`}>
                {/* <Link href="#"> */}
                <a>
                  <img src={`/images/tech-covers/${tech.image}`} alt={tech.tag} className="w-full h-full transition-all duration-300 transform hover:scale-110" />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </header>

      {/* Courses */}
      {courses && courses.length > 0 && (
        <section className="px-2 md:px-4 lg:px-8 my-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold tracking-widest">Ireo fampianarana farany</h3>
            {
              courses.length > 4 && <Link href="/fampianarana">
                <a className="px-2 py-1 text-xs font-bold tracking-widest rounded-lg bg45 hover:bg33 transition-colors duration-300 ease-in-out" style={{ textDecoration: "none" }}>Izy rehetra</a>
              </Link>
            }
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
            {courses.map((course, index) => (
              <PostGridItem post={course} url={`/fampianarana/${course.id}/${course.slug}`} key={index} />
            ))}
          </div>
        </section>
      )}

      {/* Challenges */}
      {challenges && challenges.length > 0 && (
        <section className="px-2 md:px-4 lg:px-8 my-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold tracking-widest">Ireo challenges farany</h3>
            {
              challenges.length > 4 && <Link href="/challenges">
                <a className="px-2 py-1 text-xs font-bold tracking-widest rounded-lg bg45 hover:bg33 transition-colors duration-300 ease-in-out" style={{ textDecoration: "none" }}>Izy rehetra</a>
              </Link>
            }
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
            {challenges.map((challenge, index) => (
              <PostGridItem post={challenge} url={`/challenge/${challenge.id}/${challenge.slug}`} key={index} />
            ))}
          </div>
        </section>
      )}

      {/* Tutorials */}
      {tutorials && tutorials.length > 0 && (
        <section className="px-2 md:px-4 lg:px-8 my-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold tracking-widest">Ireo tutorials farany</h3>
            {
              tutorials.length > 4 && <Link href="/tutorials">
                <a className="px-2 py-1 text-xs font-bold tracking-widest rounded-lg bg45 hover:bg33 transition-colors duration-300 ease-in-out" style={{ textDecoration: "none" }}>Izy rehetra</a>
              </Link>
            }
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
            {tutorials.map((tutorial, index) => (
              <PostGridItem post={tutorial} url={`/tutorial/${tutorial.id}/${tutorial.slug}`} key={index} showDate={true} />
            ))}
          </div>
        </section>
      )}

      {/* Blogs */}
      {blogs && blogs.length > 0 && (
        <section className="px-2 md:px-4 lg:px-8 my-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold tracking-widest">Ireo blogs farany</h3>
            {
              blogs.length > 4 && <Link href="/blogs">
                <a className="px-2 py-1 text-xs font-bold tracking-widest rounded-lg bg45 hover:bg33 transition-colors duration-300 ease-in-out" style={{ textDecoration: "none" }}>Izy rehetra</a>
              </Link>
            }
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
            {blogs.map(blog => <PostGridItem key={blog.id} post={blog} url={`/blog/${blog.id}/${blog.slug}`} showDate={true} />)}
          </div>
        </section>
      )}

    </div>
  )
}

export async function getStaticProps() {
  return await getPageProps(async () => {

    const response = await axios.get(`${API_URL}`);

    const { courses, challenges, tutorials, blogs } = response.data;

    return {
      props: {
        page: {
          title: "Pejitrano",
          // noFooter: true,
        },
        courses, challenges, tutorials, blogs
      },
      revalidate: REVALIDATE,
    }
  });
}