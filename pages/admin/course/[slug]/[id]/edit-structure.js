import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import { FaArrowCircleLeft, FaCheckSquare, FaSquare } from 'react-icons/fa';
import { ADMIN_API_URL, FRONT_URL } from '../../../../../_constants/URLs';
import NotFound from '../../../../../_layouts/components/errors/NotFound';

export default function EditCourseStructure({ courseData }) {

  // S T A T E S
  const [course, setCourse] = React.useState(courseData);

  // M E T H O D S
  const handlePublish = () => {
    setPublished({ ...course, published: !course.published });
  }

  return (
    <div className="px-4 py-3">
      <div className="flex justify-between flex-col lg:flex-row items-center mb-4">
        <h1 className={`text-3xl tracking-widest font-bold mb-3 md:mb-0 ${course.published ? "success" : "text-yellow-300"}`}>
          {course.title}
        </h1>
        <div className="flex">
          <span
            className={`px-3 py-2 mr-2 md:text-sm rounded-lg border-2 flex items-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-30 font-bold tracking-widest transition-colors duration-150 ${course.published ? "border-success success" : "border-yellow-300 text-yellow-300"}`}
            onClick={handlePublish}
          >
            {course.published ? <FaCheckSquare className="mr-2" /> : <FaSquare className="mr-2" />} Published ?
          </span>
          <Link href={`/admin/course/${course.slug}/${course.id}`}>
            <a className={`px-3 py-2 md:text-sm rounded-lg border-2 flex items-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-30 font-bold tracking-widest transition-colors duration-150 border-blue-500 text-blue-500 hover:text-blue-500 mx-2`} style={{ textDecoration: "none" }}>
              <FaArrowCircleLeft className="mr-2" /> Edit the course
            </a>
          </Link>
          <span
            className={`px-3 py-2 md:text-sm rounded-lg border-2 flex items-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-30 font-bold tracking-widest transition-colors duration-150 border-blue-500 text-blue-500`}
          >
            Visits : {course.visits}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-10">

        </div>
        <div className="col-span-2">
          <div className="pb-4 border-b-2 mb-4">
            <h2 className="font-bold tracking-widest text-2xl text-center underline">Groups</h2>
            <div className="my-3 border-2 border-pink-500 text-pink-500 py-2 text-center font-bold tracking-widest rounded-full">
              Show
            </div>
            <div className="my-3 border-2 border-purple-500 text-purple-500 py-2 text-center font-bold tracking-widest rounded-full">
              Not show
            </div>
          </div>
          <div className="">
            <h2 className="font-bold tracking-widest text-2xl text-center underline">Chapters</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params, req, res }) {
  try {
    const { slug, id } = params;
    const response = await axios.get(`${ADMIN_API_URL}/course/${slug}/${id}?with-chapters`, {
      headers: {
        credentials: "include",
        referer: FRONT_URL,
        cookie: req.headers.cookie
      }
    });
    const courseData = response.data;
    return {
      props: {
        page: {
          title: `${courseData.title} - Course structure`
        },
        courseData
      }
    }
  }
  catch (error) {
    return {
      props: {
        page: {
          title: "Page not found"
        },
        notFound: true
      }
    }
  }

}
