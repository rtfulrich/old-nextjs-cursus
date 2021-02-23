import React from 'react'
import ChooseLfmImage from '../../../_components/admin/posts/fields/ChooseLfmImage';
import InputLabel from '../../../_components/admin/posts/fields/InputLabel'
import SelectLabel from '../../../_components/admin/posts/fields/SelectLabel';
import TextareaLabel from '../../../_components/admin/posts/fields/TextareaLabel';
import OptionSelect from '../../../_components/admin/posts/fields/OptionSelect';

function NewCourse() {

  // R E F S
  const titleRef = React.useRef();
  const imageCoverRef = React.useRef();
  const levelRef = React.useRef();
  const priceRef = React.useRef();
  const descriptionRef = React.useRef();

  // M E T H O D S
  const handleSubmit = () => {
    const title = titleRef.current.value;
    const image_cover = imageCoverRef.current.value;
    const level = levelRef.current.value;
    const price = priceRef.current.value;
    const description = descriptionRef.current.value;
    console.log("title", title);
    console.log("image_cover", image_cover);
    console.log("level", level);
    console.log("price", price);
    console.log("description", description);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl md:text-4xl tracking-widest font-bold pb-4">Create a new course</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Column 1 */}
        <div className="flex flex-col">
          <InputLabel fieldRef={titleRef} label="Title" id="course_title" className="mb-3">
            Title of the course
          </InputLabel>
          <InputLabel fieldRef={priceRef} label="Price" id="course_price" type="number" min="0" step={1000} className="mb-3">
            Price of the course (ar)
          </InputLabel>
          <SelectLabel fieldRef={levelRef} label="Level" className="mb-24" id="course_level" text="Select a level">
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
          <ChooseLfmImage fieldRef={imageCoverRef} id="course_image_cover" />
        </div>
      </div>
    </div>
  )
}

export default NewCourse

export async function getStaticProps() {
  return {
    props: {
      page: {
        title: "Create a new course"
      }
    }
  }
}
