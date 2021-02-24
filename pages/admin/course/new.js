import React from 'react'
import ChooseLfmImage from '../../../_components/admin/posts/fields/ChooseLfmImage';
import InputLabel from '../../../_components/admin/posts/fields/InputLabel'
import SelectLabel from '../../../_components/admin/posts/fields/SelectLabel';
import TextareaLabel from '../../../_components/admin/posts/fields/TextareaLabel';
import OptionSelect from '../../../_components/admin/posts/fields/OptionSelect';
import axios from 'axios';
import { ADMIN_API_URL } from '../../../_constants/URLs';
import { CloseButton } from 'react-bootstrap';
import { useRouter } from "next/router";
import { toast } from 'react-toastify';

export default function CreateCourse() {

  // S T A T E S
  const [errors, setErrors] = React.useState({
    title: null, image_cover: null, level: null, price: null
  });

  // R E F S
  const titleRef = React.useRef();
  const imageCoverRef = React.useRef();
  const levelRef = React.useRef();
  const priceRef = React.useRef();
  const descriptionRef = React.useRef();

  // M E T H O D S
  const handleSubmit = () => {
    setErrors({ title: null, price: null, level: null, image_cover: null });

    const title = titleRef.current.value;
    const image_cover = imageCoverRef.current.value;
    const level = levelRef.current.value;
    const price = priceRef.current.value;
    const description = descriptionRef.current.value;

    const data = { title, image_cover, level, price, description };
    axios.post(`${ADMIN_API_URL}/course/store`, data)
      .then(response => {
        // console.log(response.data); return;
        const { message, course } = response.data;
        router.push(`/admin/course/${course.slug}/${course.id}`);
        toast.success(message);
      })
      .catch(e => {
        // console.log(e.response); return;
        const { errors } = e.response.data;
        if (errors.title) setErrors({ ...errors, title: errors.title[0] })
        if (errors.image_cover) setErrors({ ...errors, image_cover: errors.image_cover[0] })
        if (errors.level) setErrors({ ...errors, level: errors.level[0] })
        if (errors.price) setErrors({ ...errors, price: errors.price[0] })
      });
  }

  // V A R I A B L E S
  const router = useRouter();

  // J S X
  return (
    <div className="p-4">
      {/* <div className="flex justify-between items-center pb-4"> */}
      <h1 className="text-2xl md:text-4xl tracking-widest font-bold mb-4">Create a new course</h1>
      {/* </div> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Column 1 */}
        <div className="flex flex-col">
          <InputLabel fieldRef={titleRef} label="Title" id="course_title" errorNeeds={[errors, setErrors, "title"]} className="mb-3">
            Title of the course
          </InputLabel>
          <InputLabel fieldRef={priceRef} label="Price" id="course_price" errorNeeds={[errors, setErrors, "price"]} type="number" min="0" defaultValue={0} step={1000} className="mb-3">
            Price of the course (ar)
          </InputLabel>
          <SelectLabel fieldRef={levelRef} errorNeeds={[errors, setErrors, "level"]} label="Level" className="mb-24" id="course_level" text="Select a level">
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
          <TextareaLabel fieldRef={descriptionRef} id="course_description" rows="21" label="Description">
            Description of the course
          </TextareaLabel>
        </div>
        {/* Column 3 */}
        <div>
          <ChooseLfmImage fieldRef={imageCoverRef} id="course_image_cover" errorNeeds={[errors, setErrors, "image_cover"]} />
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      page: {
        title: "Create a new course"
      }
    }
  }
}
