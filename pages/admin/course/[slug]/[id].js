import axios from 'axios';
import React from 'react'
import { FaCheckSquare, FaSquare, FaSquarespace } from 'react-icons/fa';
import ChooseLfmImage from '../../../../_components/admin/posts/fields/ChooseLfmImage';
import InputLabel from '../../../../_components/admin/posts/fields/InputLabel';
import OptionSelect from '../../../../_components/admin/posts/fields/OptionSelect';
import SelectLabel from '../../../../_components/admin/posts/fields/SelectLabel';
import TextareaLabel from '../../../../_components/admin/posts/fields/TextareaLabel';
import { ADMIN_API_URL, FRONT_URL } from '../../../../_constants/URLs';
import NotFound from "../../../../_layouts/components/errors/NotFound";

export default function ViewCourse({ course }) {
  if (!course) return <NotFound />

  // S T A T E S
  const [errors, setErrors] = React.useState({
    title: null, image_cover: null, level: null, price: null
  });
  const [published, setPublished] = React.useState(course.published);

  // R E F S
  const titleRef = React.useRef();
  const imageCoverRef = React.useRef();
  const levelRef = React.useRef();
  const priceRef = React.useRef();
  const descriptionRef = React.useRef();

  // M E T H O D S
  const handleSubmit = () => {

  }

  const handlePublish = () => {
    setPublished(!published);
  }

  return (
    <div className="p-4">
      <div className="flex justify-between flex-col lg:flex-row items-center mb-4">
        <h1 className={`text-2xl md:text-xl tracking-widest font-bold mb-3 md:mb-0 ${published ? "success" : ""}`}>
          {course.title}
        </h1>
        <div className="flex">
          <span
            className={`px-3 py-2 mr-4 md:text-sm rounded-lg border-2 flex items-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-30 font-bold tracking-widest transition-colors duration-150 ${published ? "border-success success" : "border-white text-white"}`}
            onClick={handlePublish}
          >
            {published ? <FaCheckSquare className="mr-2" /> : <FaSquare className="mr-2" />} Published ?
          </span>
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
          <SelectLabel defaultValue={course.level} fieldRef={levelRef} errorNeeds={[errors, setErrors, "level"]} label="Level" className="mb-24" id="course_level" text="Select a level">
            <OptionSelect value="BEGINNER">Beginner</OptionSelect>
            <OptionSelect value="INTERMEDIATE">Intermediate</OptionSelect>
            <OptionSelect value="ADVANCED">Advanced</OptionSelect>
          </SelectLabel>
          <button className="py-2 flex-1 text-center font-bold text-3xl bg-blue-500 hover:bg-blue-600 transition-colors duration-150 w-full rounded-lg tracking-widest" type="button" onClick={handleSubmit}>
            Create the course
          </button>
        </div>
        {/* Column 2 */}
        <div>
          <TextareaLabel defaultValue={course.description} fieldRef={descriptionRef} id="course_description" rows="21" label="Description">
            Description of the course
          </TextareaLabel>
        </div>
        {/* Column 3 */}
        <div>
          <ChooseLfmImage defaultValue={course.image_cover} fieldRef={imageCoverRef} id="course_image_cover" errorNeeds={[errors, setErrors, "image_cover"]} />
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params, req, res }) {
  const { slug, id } = params;
  const response = await axios.get(`${ADMIN_API_URL}/course/${slug}/${id}`, {
    headers: {
      credentials: "include",
      referer: FRONT_URL,
      cookie: req.headers.cookie
    }
  });
  const course = response.status === 404 ? null : response.data;
  return {
    props: {
      page: {
        title: "View a course"
      },
      course
    }
  }
}
