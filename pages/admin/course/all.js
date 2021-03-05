import axios from 'axios';
import React from 'react'
import { ADMIN_API_URL } from '../../../_constants/URLs';

function All({ courses }) {
  console.log(courses);
  return (
    <div className="px-4 py-3">
      <div className="flex justify-between flex-col lg:flex-row items-center mb-4">
        <h1 className={`text-3xl tracking-widest font-bold mb-3 md:mb-0 twitter`}>
          All courses - IanaTek
        </h1>
        {/* <div className="flex">
          <Link href={`/admin/course/${course.slug}/${course.id}/edit-structure`}>
            <a className={`px-3 py-2 md:text-sm rounded-lg border-2 flex items-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-30 font-bold tracking-widest transition-colors duration-150 border-blue-500 text-blue-500 hover:text-blue-500 mr-2`} style={{ textDecoration: "none" }}>
              Edit structures <FaArrowCircleRight className="ml-2" />
            </a>
          </Link>
          <span
            className={`px-3 py-2 md:text-sm rounded-lg border-2 flex items-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-30 font-bold tracking-widest transition-colors duration-150 border-blue-500 text-blue-500 text-center`}
          >
            Visits <br />{course.visits}
          </span>
        </div> */}
      </div>
    </div>
  )
}

export default All

export async function getServerSideProps({ params, req }) {
  console.log(req);
  // try {
  //   const response = await axios.get(`${ADMIN_API_URL}/courses`)
  // } catch (error) {

  // }

  return {
    props: {
      page: {
        title: "All courses",
      },
      courses: ""
    }
  }
}