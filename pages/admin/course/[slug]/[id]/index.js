import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { FaArrowCircleRight, FaCheckSquare, FaSave, FaSquare } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ChooseLfmImage from '../../../../../_components/admin/posts/fields/ChooseLfmImage';
import InputLabel from '../../../../../_components/admin/posts/fields/InputLabel';
import OptionSelect from '../../../../../_components/admin/posts/fields/OptionSelect';
import SelectLabel from '../../../../../_components/admin/posts/fields/SelectLabel';
import TextareaLabel from '../../../../../_components/admin/posts/fields/TextareaLabel';
import { ADMIN_API_URL, FRONT_ADMIN_URL, FRONT_URL } from '../../../../../_constants/URLs';
import getPageProps from '../../../../../_helpers/getPageProps';
import sanctumRequest from '../../../../../_helpers/sanctumRequest';
import NotFound from "../../../../../_layouts/components/errors/NotFound";

export default function ViewCourse({ courseData, tags }) {
  // console.log(tags, courseData);
  if (!courseData) return <NotFound />

  // V A R I A B L E S
  const router = useRouter();

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

  const tagRef = React.useRef();

  // M E T H O D S
  const handleSubmit = () => sanctumRequest(async () => {
    const allowRequest = canSubmit;
    if (allowRequest) {
      setCanSubmit(false);
      const title = titleRef.current.value;
      const image_cover = imageCoverRef.current.value;
      const level = levelRef.current.value;
      const price = priceRef.current.value;
      const description = descriptionRef.current.value;
      // console.log(title, image_cover, level, price, description); return;
      const response = await axios.put(`${ADMIN_API_URL}/course/${course.slug}/${course.id}/update`, {
        title, image_cover, level, price, description
      });
      const { message, newCourse } = response.data;

      // redirect to the new link
      if (router.query.slug !== newCourse.slug)
        router.push(`${FRONT_ADMIN_URL}/course/${newCourse.slug}/${newCourse.id}`);

      toast.success(<span className="font-bold tracking-widest">{message}</span>);
      setCourse(newCourse);
    }
  }, null, () => setCanSubmit(true));

  const handlePublish = () => sanctumRequest(async () => {
    const response = await axios.put(`${ADMIN_API_URL}/course/${course.slug}/${course.id}/update`, { published: !course.published })
    // .then(response => {
    const { message, published } = response.data;
    const notification = <span className="font-bold tracking-widest">{message}</span>;
    if (published) toast.success(notification);
    else toast.warn(notification);
    setCourse({ ...course, published });
    // });
  })

  const handleAttachTag = () => sanctumRequest(
    async () => {
      const tagID = parseInt(tagRef.current.value);
      if (isNaN(tagID)) return;
      const data = { tagID: tagRef.current.value };
      const response = await axios.put(`${ADMIN_API_URL}/course/${course.id}/attach-a-tag`, data);
      const { message } = response.data;
      tagRef.current.value = null;
      router.reload();
      toast.success(message);
    },
    (e) => {
      if (e.response?.status === 422) setErrors({ ...errors, tag: e.response.data.errors.tagID[0] });
    }
  );

  const handleDetachTag = (tag) => sanctumRequest(async () => {
    const confirmation = `Do you really want to detach the tag "${tag.name}" from this course ?`;
    if (!confirm(confirmation)) return;
    await axios.delete(`${ADMIN_API_URL}/course/${course.id}/detach-a-tag/${tag.id}`);
    router.reload();
  });

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
            className={`px-3 py-2 md:text-sm rounded-lg border-2 flex items-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-30 font-bold tracking-widest transition-colors duration-150 border-blue-500 text-blue-500 text-center`}
          >
            Visits <br />{course.visits}
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
          <SelectLabel value={course.level} fieldRef={levelRef} errorNeeds={[errors, setErrors, "level"]} label="Level" className="mb-4" id="course_level" text="Select a level">
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
          <div className="mt-4">
            <div className="rounded-2xl bg45 pt-1 px-1 font-semibold flex items-center flex-wrap">
              {course.tags.length === 0 && "NO TAGS YET"}
              {course.tags.map(tag => (
                <span key={tag.id} className="px-2 pt-1 pb-2 bg-black rounded-full text-xs mr-1 mb-1">
                  {tag.name} <span className="font-bold twitter">({tag.timesItsUsed})</span>
                  <span className="bg-red-500 hover:bg-red-600 px-2 pb-1 rounded-full cursor-pointer ml-2" onClick={() => handleDetachTag(tag)}>x</span>
                </span>
              ))}
            </div>
            {tags.length > 0 && <div className="mt-2">
              <SelectLabel fieldRef={tagRef} errorNeeds={[errors, setErrors, "tag"]} label="New tag for this course" className="mb-2" id="course_tag" text="Select a tag">
                {
                  tags.map(tag => <OptionSelect key={tag.id} value={tag.id}>{tag.name} ({tag.timesItsUsed})</OptionSelect>)
                }
              </SelectLabel>
              <button type="button" className="py-1 rounded-lg px-2 bg-blue-500 hover:bg-blue-600 font-bold tracking-widest float-right" onClick={handleAttachTag}>Add Tag</button>
            </div>}
          </div>
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

export async function getServerSideProps({ params, req }) {
  return await getPageProps(async () => {
    const { slug, id } = params;
    const response = await axios.get(`${ADMIN_API_URL}/course/${slug}/${id}`, {
      headers: {
        credentials: "include",
        referer: FRONT_URL,
        cookie: req.headers.cookie
      }
    });
    const { courseData, tags } = response.data;

    return {
      props: {
        page: {
          title: `Course - ${courseData.title}`
        },
        courseData,
        tags
      }
    }
  });
}
