import axios from 'axios';
import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { FaCheckSquare, FaEdit, FaEye, FaImage, FaTrash, FaVideoSlash } from 'react-icons/fa';
import { RiFileTextLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { ADMIN_API_URL, DEFAULT_IMAGE_COVER } from '../../../../_constants/URLs';
import ChooseLfmImage from '../fields/ChooseLfmImage';
import InputLabel from '../fields/InputLabel';
import OptionSelect from '../fields/OptionSelect';
import SelectLabel from '../fields/SelectLabel';

function Chapter({ chapterData, setChapters, notFree }) {

  // S T A T E S
  const [chapter, setChapter] = React.useState({ title: "", rank: "", video: { url: "", duration: "" } });
  const [editChapter, setEditChapter] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [chapterErrors, setChapterErrors] = React.useState({ title: null, rank: null, image_cover: null, video_url: null, video_duration: null });

  // R E F S
  const titleRef = React.useRef();
  const rankRef = React.useRef();
  const videoUrlRef = React.useRef();
  const videoDurationRef = React.useRef();
  const imageCoverRef = React.useRef();
  const showAnywayRef = React.useRef();

  // M O U N T  E F F E C T
  React.useEffect(() => {
    setChapter(chapterData);
    setChapters({ type: "SORT" });

    return () => null;
  }, []);

  // M E T H O D S
  const updateChapterData = () => {
    const data = {
      title: titleRef.current.value,
      rank: rankRef.current.value,
      video_url: videoUrlRef.current.value,
      video_duration: videoDurationRef.current.value,
      image_cover: imageCoverRef.current.value,
      show_anyway: showAnywayRef.current.value,
    };
    axios.put(`${ADMIN_API_URL}/chapter/update/${chapter.id}`, data)
      .then(response => {
        const { message, newChapter } = response.data;
        setChapter(newChapter);
        setChapters({ type: "UPDATE", payload: newChapter });
        setEditChapter(false);
        toast.success(message);
      })
      .catch(e => {
        const { status } = e.response;
        if (status === 422) {
          const errors = e.response.data.errors;
          if (errors.title) errors.title = errors.title[0];
          if (errors.rank) errors.rank = errors.rank[0];
          if (errors.image_cover) errors.image_cover = errors.image_cover[0];
          if (errors.video_url) errors.video_url = errors.video_url[0];
          if (errors.video_duration) errors.video_duration = errors.video_duration[0];
          setChapterErrors({ ...chapterErrors, ...errors });
        } else toast.error(e.response.data.message);
      })
  }

  const deleteChapter = () => {
    axios.delete(`${ADMIN_API_URL}/chapter/delete/${chapter.id}`)
      .then(response => {
        const { message, theChapter } = response.data;
        setChapters({ type: "REMOVE", payload: theChapter });
        setConfirmDelete(false);
        toast.success(message);
      })
      .catch(e => {
        console.log("delete chapter", e.response);
        toast.error(e.response.data.message);
      })
  }

  // J S X
  let OK = true;
  if (chapter.image_cover === DEFAULT_IMAGE_COVER) OK = false;
  if (chapter.video?.url === null) OK = false;
  if (chapter.content === null) OK = false;
  return (
    <>
      <div className="ml-4 px-4 my-2 flex justify-between items-center hover:bg-gray-900 bg-opacity-40 py-2 cursor-pointer rounded-lg">
        <h4 className="font-bold tracking-widest">
          <span className="w-12 text-center mr-2">{chapter.rank}</span> {chapter.title}
        </h4>
        <div className="flex items-center cursor-pointer">
          {(notFree && chapter.show_anyway == true) ? <FaEye className="mr-4" title="Visible though paid course" /> : null}
          <div className={`${OK ? "success-bg" : "bg-red-300"} rounded-lg p-1 mr-4 flex items-center`}>
            {OK && <FaCheckSquare title="Everything is good" />}
            {chapter.image_cover === DEFAULT_IMAGE_COVER && <FaImage className="text-black mx-1" title="Image cover is still the default" />}
            {chapter.video?.url === null && <FaVideoSlash className="text-black mx-1" title="No video yet" />}
            {chapter.content === null && <RiFileTextLine className="text-black mx-1" title="No content yet" />}
          </div>
          <FaEdit
            className="text-lg hover:text-blue-500 mr-4"
            onClick={() => setEditChapter(true)}
          />
          <FaTrash
            className="text-red-400 hover:text-red-500 cursor-pointer mr-4"
            onClick={() => setConfirmDelete(true)}
          />
          <span className="-mr-4 font-bold twitter">{chapter.views}</span>
        </div>
      </div>

      {/* Modal for editing the chapter */}
      <Modal show={editChapter} onHide={() => setEditChapter(false)} size="lg" centered>
        <div className="bg24 rounded-lg border-2 border-yellow-300 overflow-hidden">
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Edit Chapter (id = {chapter.id})</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="grid grid-cols-12 gap-2">
              {/* column 1 */}
              <div className="col-span-9">
                <InputLabel id={`chapter_title_${chapter.id}`} errorNeeds={[chapterErrors, setChapterErrors, "title"]} label="Title" fieldRef={titleRef} defaultValue={chapter.title}>Title of the group</InputLabel>
                <InputLabel id={`chapter_video_url_${chapter.id}`} errorNeeds={[chapterErrors, setChapterErrors, "video_url"]} label="Video URL" fieldRef={videoUrlRef} defaultValue={chapter.video?.url} className="mt-3">Video URL of the chapter</InputLabel>
                <ChooseLfmImage fieldRef={imageCoverRef} errorNeeds={[chapterErrors, setChapterErrors, "image_cover"]} id={`chapter_image_cover_${chapter.id}`} defaultValue={chapter.image_cover} label="Image cover" className="mt-3">Image cover of the chapter</ChooseLfmImage>
              </div>

              {/* column 2 */}
              <div className="col-span-3">
                <InputLabel id={`chapter_rank_${chapter.id}`} errorNeeds={[chapterErrors, setChapterErrors, "rank"]} label="Rank" fieldRef={rankRef} defaultValue={chapter.rank}>Rank of the group</InputLabel>
                <InputLabel id={`chapter_video_duration_${chapter.id}`} errorNeeds={[chapterErrors, setChapterErrors, "video_duration"]} label="Video duration" fieldRef={videoDurationRef} defaultValue={chapter.video?.duration} className="mt-3">Video duration of the chapter</InputLabel>
                <SelectLabel fieldRef={showAnywayRef} errorNeeds={[chapterErrors, setChapterErrors, "show_anyway"]} label="Show anyway (even not free) ?" className="mt-3" id={`chapter_show_anyway_${chapter.id}`} text="Select one" value={chapter.show_anyway ? 1 : 0}>
                  <OptionSelect value={1}>Yes</OptionSelect>
                  <OptionSelect value={0}>No</OptionSelect>
                </SelectLabel>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant="secondary" onClick={() => setEditChapter(false)}>
              Close
          </Button>
            <Button type="submit" variant="primary" onClick={updateChapterData}>
              Save Changes
          </Button>
          </Modal.Footer>

        </div>
      </Modal>

      <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)} centered>
        <div className="bg24 rounded-lg border-2 border-yellow-300 overflow-hidden">
          <Modal.Header closeButton>
            <Modal.Title className="text-xl">
              Do you really want to delete the chapter : <br />
              <span className="mr-2 text-blue-500">{chapter.rank}.</span><span className="text-blue-500">{chapter.title}</span> ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button type="button" variant="secondary" onClick={() => setConfirmDelete(false)}>
              No, cancel
          </Button>
            <Button type="submit" variant="primary" onClick={deleteChapter}>
              Yes, I'm sure
          </Button>
          </Modal.Footer>

        </div>
      </Modal>
    </>
  )
}

export default Chapter
