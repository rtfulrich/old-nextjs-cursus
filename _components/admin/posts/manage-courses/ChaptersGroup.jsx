import React from 'react'
import { FaPlus } from 'react-icons/fa';
import InputLabel from '../fields/InputLabel';
import Chapter from './Chapter'

function ChaptersGroup({ chaptersGroup }) {

  // S T A T E S
  const [chapters, setChapters] = React.useState([]);
  const [chapterErrors, setChapterErrors] = React.useState({ title: null, rank: null });

  // M O U N T  E F F E C T
  React.useEffect(() => setChapters(sortChapters(chaptersGroup.chapters)), []);

  // R E F S
  const chapterRankRef = React.useRef();
  const chapterTitleRef = React.useRef();

  // M E T H O D S
  const handleAddChapter = () => {

  };

  // J S X
  return (
    <div>
      <div className="mb-4 rounded-lg overflow-hidden">
        <div className="px-4 py-1 flex justify-between items-center bg-gray-400 bg-opacity-50">
          <h3 className="text-xl font-bold tracking-widest">
            <span className="w-12 text-center mr-2">{chaptersGroup.rank}</span> {chaptersGroup.title}
          </h3>
        </div>
        <div className="">
          {/* All chapters */}
          {/* {!chapters.length && <div className="tracking-widest font-semibold mb-3 opacity-80">No Chapters Yet</div>} */}
          {chapters && chapters.map((chapter) => <Chapter chapter={chapter} key={chapter.id} />)}
          {/* Create a new chapter inside the parent group */}
          <div className="border-2 border-purple-500 ml-4 grid grid-cols-12 gap-4 rounded-lg pr-2 overflow-hidden mt-2">
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