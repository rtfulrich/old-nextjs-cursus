import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { FaArrowCircleLeft, FaCheckSquare, FaPlus, FaSquare } from 'react-icons/fa';
import { toast } from 'react-toastify';
import InputLabel from '../../../../../_components/admin/posts/fields/InputLabel';
import ChaptersGroup from '../../../../../_components/admin/posts/manage-courses/ChaptersGroup';
import { ADMIN_API_URL, FRONT_URL } from '../../../../../_constants/URLs';
import sanctumRequest from '../../../../../_helpers/sanctumRequest';

export default function EditCourseStructure({ courseData }) {
  // console.log("CD", courseData);
  // S T A T E S
  const [groupErrors, setGroupErrors] = React.useState({ title: null, rank: null });

  // V A R I A B L E S
  const router = useRouter();
  const course = courseData;
  const groups = courseData.chapters_groups.sort((a, b) => {
    if (a.rank < b.rank) return -1;
    else if (a.rank > b.rank) return 1;
    return 0;
  });

  // R E F S
  const groupRankRef = React.useRef();
  const groupTitleRef = React.useRef();

  // M E T H O D S
  const addChaptersGroup = () => sanctumRequest(
    async () => {
      setGroupErrors({ title: null, rank: null });
      const title = groupTitleRef.current.value;
      const rank = groupRankRef.current.value;
      const courseID = course.id;
      const response = await axios.post(`${ADMIN_API_URL}/course/chapters-group/new`, { title, rank, courseID });
      groupTitleRef.current.value = "";
      groupRankRef.current.value = "";
      const { message, group } = response.data;
      toast.success(<span className="font-bold tracking-widest">{message}</span>);
      router.replace(`/admin/course/${courseData.slug}/${courseData.id}/edit-structure`);
    },
    e => {
      const { status, data } = e.response;
      if (status === 422) {
        const errors = { title: null, rank: null };
        if (data.errors.title) errors.title = data.errors.title[0];
        if (data.errors.rank) errors.rank = data.errors.rank[0];
        setGroupErrors({ ...errors });
        if (data.errors.courseID) toast.error(data.errors.courseID[0]);
      }
      else toast.error(data.message);
    }
  );

  const handlePublish = () => sanctumRequest(async () => {
    const response = await axios.put(`${ADMIN_API_URL}/course/${course.slug}/${course.id}/update`, { published: !course.published });
    const { message, published } = response.data;
    const notification = <span className={`font-bold tracking-widest ${published ? "" : "text-black"}`}>{message}</span>;
    if (published) toast.success(notification);
    else toast.warn(notification);
    router.replace(`/admin/course/${course.slug}/${course.id}/edit-structure`);
  });

  // J S X
  return (
    <div className="px-4 py-3">
      {/* Content header */}
      <div className="flex justify-between flex-col lg:flex-row items-center mb-4">
        <h1 className={`text-3xl tracking-widest font-bold mb-3 md:mb-0 ${course.published ? "success" : "text-yellow-300"}`}>
          {course.title}
        </h1>
        <div className="flex">
          <span
            className={`px-3 py-2 mr-2 md:text-sm rounded-lg border-2 flex items-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-30 font-bold tracking-widest transition-colors duration-150 ${course.published ? "border-success success" : "border-yellow-300 text-yellow-300"}`}
            onClick={handlePublish}
          >
            {course.published ? (<><FaCheckSquare className="mr-2" /> Unpublish</>) : (<><FaSquare className="mr-2" /> Publish</>)} it ?
          </span>
          <Link href={`/admin/course/${course.slug}/${course.id}`}>
            <a className={`px-3 py-2 md:text-sm rounded-lg border-2 flex items-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-30 font-bold tracking-widest transition-colors duration-150 border-blue-500 text-blue-500 hover:text-blue-500 mx-2`} style={{ textDecoration: "none" }}>
              <FaArrowCircleLeft className="mr-2" /> Edit the course
            </a>
          </Link>
          <span
            className={`px-3 py-2 md:text-sm rounded-lg border-2 flex items-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-30 font-bold tracking-widest transition-colors duration-150 border-blue-500 text-blue-500 text-center`}
          >
            Visits <br />{course.visits}
          </span>
        </div>
      </div>

      {/* All groups and their chapters */}
      {
        groups && groups.length === 0 && <div className="tracking-widest font-semibold mb-3 opacity-80">No Groups Yet</div>
      }
      {
        groups && groups.map((group, index) => <ChaptersGroup key={Math.random()} group={group} notFree={course.price > 0} />)
      }

      {/* Create a new group */}
      <div className={`grid grid-cols-12 gap-4 border-t-2 pt-4 ${course.published ? "border-success" : "border-yellow-300"}`}>
        <div className="col-span-12">
          <div className={`grid grid-cols-12 gap-4 pr-2 border-2 ${course.published ? "border-success" : "border-yellow-300"} rounded-xl items-start overflow-hidden`}>
            <h3 className={`col-span-2 ${course.published ? "success-bg" : "bg-yellow-300"} h-full flex items-center justify-center text-2xl font-semibold tracking-widest text-black`}>New Group</h3>
            <div className="col-span-2 py-2">
              <InputLabel id="group_rank" label="Rank" fieldRef={groupRankRef} errorNeeds={[groupErrors, setGroupErrors, "rank"]}>Rank of the group</InputLabel>
            </div>
            <div className="col-span-6 py-2">
              <InputLabel id="group_title" label="Title" fieldRef={groupTitleRef} errorNeeds={[groupErrors, setGroupErrors, "title"]}>Title of the group</InputLabel>
            </div>
            <div className="col-span-2 flex self-center">
              <button type="button" className={`py-2 rounded-xl ${course.published ? "success-bg success-bg-hover" : "bg-yellow-300 hover:bg-yellow-400"} w-full text-center font-bold tracking-widest text-lg text-black`} onClick={addChaptersGroup}>
                Create
              </button>
            </div>
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
    const { courseData } = response.data;
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
