import axios from 'axios';
import React from 'react'
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ADMIN_API_URL } from '../../../../_constants/URLs';
import InputLabel from '../fields/InputLabel';
import Chapter from './Chapter'

function ChaptersGroup({ chaptersGroup }) {

  // S T A T E S
  const [chapters, setChapters] = React.useState([]);
  const [chapterErrors, setChapterErrors] = React.useState({ title: null, rank: null });

  // M O U N T  E F F E C T
  React.useEffect(() => setChapters(sortChapters(chaptersGroup.chapters)), []);

  // R E F S
  const chapterTitleRef = React.useRef();
  const chapterRankRef = React.useRef();

  // M E T H O D S
  const handleAddChapter = () => {
    const title = chapterTitleRef.current.value;
    const rank = chapterRankRef.current.value;
    const chapterGroupID = chaptersGroup.id;
    axios.post(`${ADMIN_API_URL}/course/chapter/new`, { title, rank, chapterGroupID })
      .then(response => {
        chapterTitleRef.current.value = "";
        chapterRankRef.current.value = "";
        const { message, chapter } = response.data;
        setChapters(oldChapters => {
          const chapters = [...oldChapters, chapter];
          return sortChapters(chapters);
        });
        toast.success(<span className="font-bold tracking-widest">{message}</span>);
      })
      .catch(e => {
        const { status, data } = e.response;
        if (status === 422) {
          const errors = { title: null, rank: null };
          if (data.errors.title) errors.title = data.errors.title[0];
          if (data.errors.rank) errors.rank = data.errors.rank[0];
          setChapterErrors({ ...errors });
          if (data.errors.chapterGroupID) toast.error(data.errors.chapterGroupID[0]);
        }
        else toast.error(data.message);
      });
  };

  // J S X
  return (
    <div>
      <div className="mb-4 rounded-lg overflow-hidden">
        <div className="px-4 py-1 flex justify-between items-center bg-gray-400 hover:bg-gray-500 bg-opacity-50 hover:bg-opacity-50">
          <h3 className="text-xl font-bold tracking-widest">
            <span className="w-12 text-center mr-2">{chaptersGroup.rank}</span> {chaptersGroup.title}
          </h3>
        </div>
        <div className="ml-4">
          {/* All chapters */}
          {chapters.length === 0 && <div className="tracking-widest font-semibold mb-3 opacity-80 ml-4 mt-2 text-red-300">No Chapters Yet</div>}
          {chapters.map((chapter) => <Chapter chapter={chapter} key={chapter.id} />)}
          {/* Create a new chapter inside the parent group */}
          <div className="border-2 border-purple-500 grid grid-cols-12 gap-4 rounded-lg pr-2 overflow-hidden mt-2">
            <h3 className="col-span-2 bg-purple-500 h-full flex items-center justify-center text-2xl font-semibold tracking-widest text-center">New Chapter</h3>
            <div className="col-span-2 py-2">
              <InputLabel id={`chapter_rank_${chaptersGroup.id}`} label="Rank" fieldRef={chapterRankRef} errorNeeds={[chapterErrors, setChapterErrors, "rank"]}>Rank of the chapter</InputLabel>
            </div>
            <div className="col-span-7 py-2">
              <InputLabel id={`chapter_title_${chaptersGroup.id}`} label="Title" fieldRef={chapterTitleRef} errorNeeds={[chapterErrors, setChapterErrors, "title"]}>Title of the chapter</InputLabel>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <button type="button" className="py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-center font-bold tracking-widest text-lg px-2" onClick={handleAddChapter}>
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChaptersGroup

// Helper functions
function sortChapters(chapters = []) {
  return chapters !== null
    ? chapters.sort((a, b) => {
      if (a.rank < b.rank) return -1;
      else if (a.rank === b.rank) return 0;
      return 1;
    })
    : [];
}