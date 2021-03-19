import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { FaEdit, FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ADMIN_API_URL, BACK_URL } from '../../../../_constants/URLs';
import sanctumRequest from '../../../../_helpers/sanctumRequest';
import ChooseLfmImage from '../fields/ChooseLfmImage';
import InputLabel from '../fields/InputLabel';

function ChallengeAnswer({ answer }) {

  // V A R I A B L E S
  const router = useRouter();

  // S T A T E S
  const [editAnswer, setEditAnswer] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [answerErrors, setAnswerErrors] = React.useState({ title: null, rank: null, image_cover: null, video_url: null, video_duration: null });

  // R E F S
  const titleRef = React.useRef();
  const rankRef = React.useRef();
  const imageCoverRef = React.useRef();
  const videoUrlRef = React.useRef();
  const videoDurationRef = React.useRef();

  // M E T H O D S
  const updateAnswerData = () => sanctumRequest(
    async () => {
      const data = {
        title: titleRef.current.value,
        rank: rankRef.current.value,
        video_url: videoUrlRef.current.value,
        video_duration: videoDurationRef.current.value,
        image_cover: imageCoverRef.current.value,
      };
      const response = await axios.put(`${ADMIN_API_URL}/challenge-answer/update/${answer.id}`, data);
      const { message, newAnswer } = response.data;
      toast.success(message);
      const { slug } = router.query;
      router.push(`/admin/challenge/${slug}/edit-answers`);
    },
    e => {
      const { status } = e.response;
      if (status === 422) {
        const errors = e.response.data.errors;
        if (errors.title) errors.title = errors.title[0];
        if (errors.rank) errors.rank = errors.rank[0];
        if (errors.image_cover) errors.image_cover = errors.image_cover[0];
        if (errors.video_url) errors.video_url = errors.video_url[0];
        if (errors.video_duration) errors.video_duration = errors.video_duration[0];
        setAnswerErrors({ ...answerErrors, ...errors });
      }
    }

  );

  const handlePublish = () => sanctumRequest(async () => {
    const response = await axios.put(`${ADMIN_API_URL}/challenge-answer/update/${answer.id}?only-published`, { published: !answer.published });
    const { message, newAnswer } = response.data;
    router.replace(`/admin/challenge/${router.query.slug}/edit-answers`);
    toast.success(message);
  });

  const deleteAnswer = () => sanctumRequest(async () => {
    const response = await axios.delete(`${ADMIN_API_URL}/challenge-answer/delete/${answer.id}`);
    const { message, newAnswer } = response.data;
    const { slug } = router.query;
    router.push(`/admin/challenge/${slug}/edit-answers`);
    toast.success(message);
  });

  return (
    <>
      <div className="ml-4 px-4 my-2 flex justify-between items-center hover:bg-gray-900 bg-opacity-40 py-2 cursor-pointer rounded-lg">
        <h4 className="font-bold tracking-widest flex items-center">
          <Link href={`${BACK_URL}/admin/challenge/${router.query.slug}/answer/${answer.slug}/edit-content`}>
            <a target="_blank" className="hover:text-yellow-300"><span className="w-12 text-center mr-2">{answer.rank}</span> {answer.title} </a>
          </Link>
          <Link href={`/admin/challenge/${router.query.slug}/answer/${answer.slug}/preview-content`}>
            <a className="ml-4"><FaEye className="text-yellow-300 hover:text-yellow-400" title="Preview the content" /></a>
          </Link>
        </h4>
        <div className="flex items-center cursor-pointer">
          {answer.published
            ? <FaEye className="success mr-4" onClick={handlePublish} title="Is published ?" />
            : <FaEyeSlash className="text-red-300 mr-4" onClick={handlePublish} title="Is published ?" />
          }
          <FaEdit
            className="text-lg hover:text-blue-500 mr-4"
            onClick={() => setEditAnswer(true)}
          />
          <FaTrash
            className="text-red-400 hover:text-red-500 cursor-pointer mr-4"
            onClick={() => setConfirmDelete(true)}
          />
        </div>
      </div>

      {/* Modal for editing the answer */}
      <Modal show={editAnswer} onHide={() => setEditAnswer(false)} size="lg" centered>
        <div className="bg24 rounded-lg border-2 border-yellow-300 overflow-hidden">
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Edit Answer (id = {answer.id})</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="grid grid-cols-12 gap-2">
              {/* column 1 */}
              <div className="col-span-9">
                <InputLabel id={`answer_title_${answer.id}`} errorNeeds={[answerErrors, setAnswerErrors, "title"]} label="Title" fieldRef={titleRef} defaultValue={answer.title}>Title of the answer</InputLabel>
                <InputLabel id={`answer_video_url_${answer.id}`} errorNeeds={[answerErrors, setAnswerErrors, "video_url"]} label="Video URL" fieldRef={videoUrlRef} defaultValue={answer.video?.url} className="mt-3">Video URL of the answer</InputLabel>
                <ChooseLfmImage fieldRef={imageCoverRef} errorNeeds={[answerErrors, setAnswerErrors, "image_cover"]} id={`answer_image_cover_${answer.id}`} defaultValue={answer.image_cover} label="Image cover" className="mt-3">Image cover of the answer</ChooseLfmImage>
              </div>

              {/* column 2 */}
              <div className="col-span-3">
                <InputLabel id={`answer_rank_${answer.id}`} errorNeeds={[answerErrors, setAnswerErrors, "rank"]} label="Rank" fieldRef={rankRef} defaultValue={answer.rank}>Rank of the group</InputLabel>
                <InputLabel id={`answer_video_duration_${answer.id}`} errorNeeds={[answerErrors, setAnswerErrors, "video_duration"]} label="Video duration" fieldRef={videoDurationRef} defaultValue={answer.video?.duration} className="mt-3">Video duration of the answer</InputLabel>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant="secondary" onClick={() => setEditAnswer(false)}>
              Close
          </Button>
            <Button type="submit" variant="primary" onClick={updateAnswerData}>
              Save Changes
          </Button>
          </Modal.Footer>

        </div>
      </Modal>

      <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)} centered>
        <div className="bg24 rounded-lg border-2 border-yellow-300 overflow-hidden">
          <Modal.Header closeButton>
            <Modal.Title className="text-xl">
              Do you really want to delete the answer : <br />
              <span className="mr-2 text-blue-500">{answer.rank}.</span><span className="text-blue-500">{answer.title}</span> ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button type="button" variant="secondary" onClick={() => setConfirmDelete(false)}>
              No, cancel
            </Button>
            <Button type="submit" variant="primary" onClick={deleteAnswer}>
              Yes, I'm sure
            </Button>
          </Modal.Footer>

        </div>
      </Modal>
    </>
  )
}

export default ChallengeAnswer
