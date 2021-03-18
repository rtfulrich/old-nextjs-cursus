import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { FaArrowCircleRight, FaCheckSquare, FaSave, FaSquare, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ChooseLfmImage from '../../../../_components/admin/posts/fields/ChooseLfmImage';
import InputLabel from '../../../../_components/admin/posts/fields/InputLabel';
import OptionSelect from '../../../../_components/admin/posts/fields/OptionSelect';
import SelectLabel from '../../../../_components/admin/posts/fields/SelectLabel';
import TextareaLabel from '../../../../_components/admin/posts/fields/TextareaLabel';
import { ADMIN_API_URL, FRONT_ADMIN_URL, FRONT_URL } from '../../../../_constants/URLs';
import getPageProps from '../../../../_helpers/getPageProps'
import sanctumRequest from '../../../../_helpers/sanctumRequest';

export default function EditChallengeData({ challengeData, tags }) {

  // V A R I A B L E S
  const router = useRouter();

  // S T A T E S
  const [errors, setErrors] = React.useState({ title: null, price: null, video_url: null, video_duration: null, image_cover: null, tag: null });
  const [canSubmit, setCanSubmit] = React.useState(true);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  // R E F S
  const titleRef = React.useRef();
  const priceRef = React.useRef();
  const videoUrlRef = React.useRef();
  const videoDurationRef = React.useRef();
  const descriptionRef = React.useRef();
  const imageCoverRef = React.useRef();
  const tagRef = React.useRef();

  // M E T H O D S
  const handlePublish = () => sanctumRequest(async () => {
    const response = await axios.put(`${ADMIN_API_URL}/challenge/${challengeData.slug}/update?only-published`, { published: !challengeData.published })
    // .then(response => {
    const { message, published } = response.data;
    const notification = <span className="font-bold tracking-widest">{message}</span>;
    if (published) toast.success(notification);
    else toast.warn(notification);
    router.push(`${FRONT_ADMIN_URL}/challenge/${challengeData.slug}`)
    // });
  });

  const handleDetachTag = tag => sanctumRequest(async () => {
    const confirmation = `Do you really want to detach the tag "${tag.name}" from this challenge ?`;
    if (!confirm(confirmation)) return;
    await axios.delete(`${ADMIN_API_URL}/challenge/${challengeData.slug}/detach-a-tag/${tag.id}`);
    router.push(`/admin/challenge/${challengeData.slug}`);
  });

  const handleAttachTag = () => sanctumRequest(async () => {
    const tagID = parseInt(tagRef.current.value);
    if (isNaN(tagID)) return;
    const data = { tagID };
    const response = await axios.put(`${ADMIN_API_URL}/challenge/${challengeData.slug}/attach-a-tag`, data);
    const { message } = response.data;
    router.push(`${FRONT_ADMIN_URL}/challenge/${challengeData.slug}`);
    toast.success(message);
  });

  const handleSubmit = () => sanctumRequest(
    async () => {
      const allowRequest = canSubmit;
      if (allowRequest) {
        setCanSubmit(false);
        const title = titleRef.current.value;
        const image_cover = imageCoverRef.current.value;
        const video_url = videoUrlRef.current.value;
        const video_duration = videoDurationRef.current.value;
        const price = priceRef.current.value;
        const description = descriptionRef.current.value;
        // console.log(title, image_cover, video_url, video_duration, price, description); return;
        const response = await axios.put(`${ADMIN_API_URL}/challenge/${challengeData.slug}/update`, {
          title, image_cover, video_url, video_duration, price, description
        });
        const { message, newChallenge } = response.data;
        toast.success(<span className="font-bold tracking-widest">{message}</span>);

        // redirect to the new link
        if (router.query.slug !== newChallenge.slug)
          router.push(`${FRONT_ADMIN_URL}/challenge/${newChallenge.slug}`);
      }
    },
    (e) => {
      toast.error(e.response.data.message);
    },
    () => setCanSubmit(true)
  );

  const handleDeleteChallenge = () => sanctumRequest(async () => {
    await axios.delete(`${ADMIN_API_URL}/challenge/delete/${challengeData.id}`);
    router.push(`/admin/challenge/all`);
    toast.info(`"${challengeData.title}" has just being deleted !`);
  });

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between flex-col lg:flex-row items-center mb-4">
          <h1 className={`text-3xl tracking-widest font-bold mb-3 md:mb-0 ${challengeData.published ? "success" : "text-yellow-300"} flex-1 flex justify-between items-end`}>
            <span className="flex-1">{challengeData.title}</span>
            <span className="mr-4 text-base text-red-400 hover:text-red-500 cursor-pointer">
              <FaTrash onClick={() => setConfirmDelete(true)} title="Delete this challenge ?" />
            </span>
          </h1>
          <div className="flex">
            <span
              className={`px-3 py-2 mr-2 md:text-sm rounded-lg border-2 flex items-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-30 font-bold tracking-widest transition-colors duration-150 ${challengeData.published ? "border-success success" : "border-yellow-300 text-yellow-300"}`}
              onClick={handlePublish}
            >
              {challengeData.published ? <FaCheckSquare className="mr-2" /> : <FaSquare className="mr-2" />} Published ?
          </span>
            <Link href={`/admin/challenge/${challengeData.slug}/edit-answers`}>
              <a className={`px-3 py-2 md:text-sm rounded-lg border-2 flex items-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-30 font-bold tracking-widest transition-colors duration-150 border-blue-500 text-blue-500 hover:text-blue-500 mr-2`} style={{ textDecoration: "none" }}>
                Edit answers <FaArrowCircleRight className="ml-2" />
              </a>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Column 1 */}
          <div className="flex flex-col">
            <InputLabel defaultValue={challengeData.title} fieldRef={titleRef} label="Title" id="challenge_title" errorNeeds={[errors, setErrors, "title"]} className="mb-3">
              Title of the challenge
          </InputLabel>
            <InputLabel defaultValue={challengeData.price} fieldRef={priceRef} label="Price" id="challenge_price" errorNeeds={[errors, setErrors, "price"]} type="number" min="0" step={1000} className="mb-3">
              Price of the challenge (ar)
          </InputLabel>
            <InputLabel defaultValue={challengeData.video.url} fieldRef={videoUrlRef} label="Video URL" id="challenge_video_url" errorNeeds={[errors, setErrors, "video_url"]} className="mb-3">
              Video URL for the challenge
          </InputLabel>
            <InputLabel defaultValue={challengeData.video.duration} fieldRef={videoDurationRef} label="Video duration" id="challenge_video_duration" errorNeeds={[errors, setErrors, "video_duration"]} className="mb-3">
              Duration of the video
          </InputLabel>
            <div className="mt-">
              <div className="rounded-2xl bg45 pt-1 px-1 font-semibold flex items-center flex-wrap">
                {challengeData.tags.length === 0 && "NO TAGS YET"}
                {challengeData.tags.map(tag => (
                  <span key={tag.id} className="px-2 pt-1 pb-2 bg-black rounded-full text-xs mr-1 mb-1">
                    {tag.name} <span className="font-bold twitter">({tag.timesItsUsed})</span>
                    <span className="bg-red-500 hover:bg-red-600 px-2 pb-1 rounded-full cursor-pointer ml-2" onClick={() => handleDetachTag(tag)}>x</span>
                  </span>
                ))}
              </div>
              {tags.length > 0 && <div className="mt-2">
                <SelectLabel fieldRef={tagRef} errorNeeds={[errors, setErrors, "tag"]} label="New tag for this challenge" className="mb-2" id="challenge_tag" text="Select a tag">
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
            <TextareaLabel defaultValue={challengeData.description} fieldRef={descriptionRef} id="course_description" rows="21" label="Description">
              Description of the challenge
          </TextareaLabel>
          </div>
          {/* Column 3 */}
          <div className="flex flex-col justify-between">
            <ChooseLfmImage defaultValue={challengeData.image_cover} fieldRef={imageCoverRef} id="course_image_cover" errorNeeds={[errors, setErrors, "image_cover"]} />
            <button className={`py-2 flex justify-center items-center font-bold text-2xl ${canSubmit ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 hover:bg-gray-500"} transition-colors duration-150 w-full rounded-lg tracking-widest`} type="button" onClick={handleSubmit}>
              <FaSave className="mr-2" /> Update the challenge
          </button>
          </div>
        </div>
      </div>

      <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)} centered>
        <div className="bg24 rounded-lg border-2 border-yellow-300 overflow-hidden">
          <Modal.Header closeButton>
            <Modal.Title>Do you really want to delete this challenge ?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button type="button" variant="secondary" onClick={() => setConfirmDelete(false)}>
              No, it was an error
          </Button>
            <Button type="submit" variant="primary" onClick={handleDeleteChallenge}>
              Yes, I'm sure
          </Button>
          </Modal.Footer>

        </div>
      </Modal>
    </>
  )
}

export async function getServerSideProps({ params, req }) {
  return await getPageProps(async () => {
    const { slug } = params;
    const response = await axios.get(`${ADMIN_API_URL}/challenge/${slug}`, {
      headers: {
        credentials: "include",
        referer: FRONT_URL,
        cookie: req.headers.cookie
      }
    });
    const { challengeData, tags } = response.data;

    return {
      props: {
        page: {
          title: `Challenge - ${challengeData.title}`
        },
        challengeData,
        tags
      }
    }
  });
}
