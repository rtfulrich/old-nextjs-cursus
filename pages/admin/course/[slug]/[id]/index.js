import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import { FaArrowCircleRight, FaCheckSquare, FaSave, FaSquare } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ChooseLfmImage from '../../../../../_components/admin/posts/fields/ChooseLfmImage';
import InputLabel from '../../../../../_components/admin/posts/fields/InputLabel';
import OptionSelect from '../../../../../_components/admin/posts/fields/OptionSelect';
import SelectLabel from '../../../../../_components/admin/posts/fields/SelectLabel';
import TextareaLabel from '../../../../../_components/admin/posts/fields/TextareaLabel';
import { ADMIN_API_URL, FRONT_URL } from '../../../../../_constants/URLs';
import NotFound from "../../../../../_layouts/components/errors/NotFound";

export default function ViewCourse({ courseData }) {
  if (!courseData) return <NotFound />

  // S T A T E S
  const [errors, setErrors] = React.useState({
    title: null, image_cover: null, level: null, price: null
  });
  const [course, setCourse] = React.useState(courseData);
  const [canSubmit, setCanSubmit] = React.useState(true)

  // R E F S
  const titleRef = React.useRef();
  const imageCoverRef = React.useRef();
  const levelRef = React.useRef();
  const priceRef = React.useRef();
  const descriptionRef = React.useRef();

  // M E T H O D S
  const handleSubmit = () => {
    const allowRequest = canSubmit;
    if (allowRequest) {
      setCanSubmit(false);
      const title = titleRef.current.value;
      const image_cover = imageCoverRef.current.value;
      const level = levelRef.current.value;
      const price = priceRef.current.value;
      const description = descriptionRef.current.value;
      // console.log(title, image_cover, level, price, description); return;
      axios.put(`${ADMIN_API_URL}/course/${course.slug}/${course.id}/update`, {
        title, image_cover, level, price, description
      })
        .then(response => {
          const { message, course } = response.data;
          toast.success(<span className="font-bold tracking-widest">{message}</span>);
          setCourse(course);
        })
        .finally(() => setCanSubmit(true));
    }
  }

  const handlePublish = () => {
    axios.put(`${ADMIN_API_URL}/course/${course.slug}/${course.id}/update`, { published: !course.published })
      .then(response => {
        const { message, published } = response.data;
        const notification = <span className="font-bold tracking-widest">{message}</span>;
        if (published) toast.success(notification);
        else toast.warn(notification);
        setCourse({ ...course, published });
      })
  }

  // J S X
  return (
    <div className="px-4 py-3">
      <div className="flex justify-between flex-col lg:flex-row items-center mb-4">
        <h1 className={`text-3xl tracking-widest font-bold mb-3 md:mb-0 ${course.published ? "success" : "text-yellow-300"}`}>
          {course.title}
        </h1>
        <div className="flex">
          <Link href={`/admin/course/${course.slug}/${course.id}/edit-structure`}>
            <a className={`px-3 py-2 md:text-sm rounded-lg border-2 flex items-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-30 font-bold tracking-widest transition-colors duration-150 border-blue-500 text-blue-500 hover:text-blue-500 mr-2`} style={{ textDecoration: "none" }}>
              Edit structures <FaArrowCircleRight className="ml-2" />
            </a>
          </Link>
          <span
            className={`px-3 py-2 md:text-sm rounded-lg border-2 flex items-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-30 font-bold tracking-widest transition-colors duration-150 border-blue-500 text-blue-500`}
          >
            Visits : {course.visits}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Column 1 */}
        <div className="flex flex-col">
          <InputLabel defaultValue={course.title} fieldRef={titleRef} label="Title" id="course_title" errorNeeds={[errors, setErrors, "title"]} className="mb-3">
            Title of the course
          </InputLabel>
          <InputLabel defaultValue={course.price} fieldRef={priceRef} label="Price" id="course_price" errorNeeds={[errors, setErrors, "price"]} type="number" min="0" defaultValue={0} step={1000} className="mb-3">
            Price of the course (ar)
          </InputLabel>
          <SelectLabel value={course.level} fieldRef={levelRef} errorNeeds={[errors, setErrors, "level"]} label="Level" className="mb-24" id="course_level" text="Select a level">
            <OptionSelect selected={course.level === "BEGINNER"} value="BEGINNER">Beginner</OptionSelect>
            <OptionSelect selected={course.level === "INTERMEDIATE"} value="INTERMEDIATE">Intermediate</OptionSelect>
            <OptionSelect selected={course.level === "ADVANCED"} value="ADVANCED">Advanced</OptionSelect>
          </SelectLabel>
          <span
            className={`px-3 py-2 md:text-sm rounded-lg border-2 flex items-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-30 font-bold tracking-widest transition-colors duration-150 ${course.published ? "border-success success" : "border-yellow-300 text-yellow-300"}`}
            onClick={handlePublish}
          >
            {course.published ? <FaCheckSquare className="mr-2" /> : <FaSquare className="mr-2" />} Published ?
          </span>
        </div>
        {/* Column 2 */}
        <div>
          <TextareaLabel defaultValue={course.description} fieldRef={descriptionRef} id="course_description" rows="21" label="Description">
            Description of the course
          </TextareaLabel>
        </div>
        {/* Column 3 */}
        <div className="flex flex-col justify-between">
          <ChooseLfmImage defaultValue={course.image_cover} fieldRef={imageCoverRef} id="course_image_cover" errorNeeds={[errors, setErrors, "image_cover"]} />
          <button className={`py-2 flex justify-center items-center font-bold text-2xl ${canSubmit ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 hover:bg-gray-500"} transition-colors duration-150 w-full rounded-lg tracking-widest`} type="button" onClick={handleSubmit}>
            <FaSave className="mr-2" /> Update the course
          </button>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params, req, res }) {
  try {
    const { slug, id } = params;
    const response = await axios.get(`${ADMIN_API_URL}/course/${slug}/${id}`, {
      headers: {
        credentials: "include",
        referer: FRONT_URL,
        cookie: req.headers.cookie
      }
    });
    const courseData = response.status === 404 ? null : response.data;
    return {
      props: {
        page: {
          title: `Course - ${courseData.title}`
        },
        courseData
      }
    }
  } catch (e) {
    return {
      props: {
        page: {
          title: "Page not found - IanaTek"
        },
        notFound: true
      }
    }
  }
}
