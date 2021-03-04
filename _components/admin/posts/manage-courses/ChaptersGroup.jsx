import axios from 'axios';
import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { FaAngleDoubleDown, FaAngleDoubleUp, FaCheck, FaEdit, FaEye, FaEyeSlash, FaPlus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ADMIN_API_URL } from '../../../../_constants/URLs';
import InputLabel from '../fields/InputLabel';
import Chapter from './Chapter'

function ChaptersGroup({ groupData, setGroups, notFree }) {

  // S T A T E S
  const [group, setGroup] = React.useState({ id: Math.random(), title: "", rank: "", show: true })
  const [chapters, setChapters] = React.useReducer(chapterReducer, []);
  const [chapterErrors, setChapterErrors] = React.useState({ title: null, rank: null });
  const [groupErrors, setGroupErrors] = React.useState({ title: null, rank: null });
  const [editGroup, setEditGroup] = React.useState(false);
  const [showChildren, setShowChildren] = React.useState(false);
  const [groupToDelete, setGroupToDelete] = React.useState(null);

  // M O U N T  E F F E C T
  React.useEffect(() => {
    setGroup(groupData);
    setChapters({ type: "INIT", payload: groupData.chapters });

    return () => null;
  }, []);

  // R E F S
  const chapterTitleRef = React.useRef();
  const chapterRankRef = React.useRef();
  const groupTitleRef = React.useRef();
  const groupRankRef = React.useRef();

  // M E T H O D S
  const handleAddChapter = () => {
    const title = chapterTitleRef.current.value;
    const rank = chapterRankRef.current.value;
    const chapterGroupID = group.id;
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

  const updateGroupData = () => {
    const data = groupTitleRef.current
      ? { title: groupTitleRef.current.value, rank: groupRankRef.current.value }
      : { show: !group.show };
    axios.put(`${ADMIN_API_URL}/chapters-group/update/${group.id}`, data)
      .then(response => {
        const { message, newGroup, chapters } = response.data;
        setGroup(newGroup);
        setGroups({ type: "UPDATE_SORT", payload: newGroup });
        setChapters({ type: "INIT", payload: chapters })
        setEditGroup(false);
        toast.success(<span className="font-bold tracking-widest">{message}</span>)
      })
      .catch(e => {
        const { status, data } = e.response;
        if (status === 422) {
          const errors = { title: null, rank: null };
          if (data.errors.title) errors.title = data.errors.title[0];
          if (data.errors.rank) errors.rank = data.errors.rank[0];
          setGroupErrors({ ...errors });
        }
        toast.error(data.message);
      });
  }

  const deleteGroup = (groupID) => {
    axios.delete(`${ADMIN_API_URL}/chapters-group/delete/${groupID}`)
      .then(response => {
        setGroupToDelete(null);
        const { message, groupData } = response.data;
        toast.success(message);
        setGroups({ type: "DELETE", payload: groupData });
      })
      .catch(e => {
        console.log(e.response);
        toast.error(e.response.data.message);
      });
  }

  // J S X
  return (
    <>
      <div>
        <div className="mb-4 rounded-lg overflow-hidden">
          <div
            className="px-4 py-1 flex justify-between items-center bg-gray-400 hover:bg-gray-500 bg-opacity-50 hover:bg-opacity-50 cursor-pointer"
            onClick={(e) => setShowChildren(!showChildren)}
          >
            <h3 className="text-xl font-bold tracking-widest align-middle">
              <span className="w-12 text-center mr-2">{group.rank}</span> {group.title} <span className="text-sm ml-3">({chapters ? chapters.length : 0})</span>
            </h3>
            <div className="flex items-center cursor-pointer">
              {group.show
                ? <FaCheck
                  className="mr-4 hover:text-blue-500"
                  onClick={(e) => { e.stopPropagation(); updateGroupData(true); }}
                />
                : <FaEyeSlash
                  className="mr-4 hover:text-blue-500"
                  onClick={(e) => { e.stopPropagation(); updateGroupData(true); }}
                />
              }
              <FaEdit
                className="text-lg hover:text-blue-500 mr-4"
                onClick={(e) => { e.stopPropagation(); setEditGroup(true); }}
              />
              <FaTrash
                className="hover:text-red-500 cursor-pointer mr-4"
                onClick={(e) => { e.stopPropagation(); setGroupToDelete(group); }}
              />
              <span className="-mr-4">{showChildren ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}</span>
            </div>
          </div>
          {showChildren && <div className="ml-4">

            {/* All chapters */}
            {chapters && chapters.length === 0 && <div className="tracking-widest font-semibold mb-3 opacity-80 ml-4 mt-2 text-red-300">No Chapters Yet</div>}
            {chapters && chapters.map((chapter) => <Chapter chapterData={chapter} setChapters={setChapters} key={Math.random()} notFree={notFree} />)}

            {/* Create a new chapter inside the parent group */}
            <div className="border-2 border-purple-500 grid grid-cols-12 gap-4 rounded-lg pr-2 overflow-hidden mt-2">
              <h3 className="col-span-2 bg-purple-500 h-full flex items-center justify-center text-2xl font-semibold tracking-widest text-center">New Chapter</h3>
              <div className="col-span-2 py-2">
                <InputLabel id={`chapter_rank_${group.id}`} label="Rank" fieldRef={chapterRankRef} errorNeeds={[chapterErrors, setChapterErrors, "rank"]}>Rank of the chapter</InputLabel>
              </div>
              <div className="col-span-7 py-2">
                <InputLabel id={`chapter_title_${group.id}`} label="Title" fieldRef={chapterTitleRef} errorNeeds={[chapterErrors, setChapterErrors, "title"]}>Title of the chapter</InputLabel>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <button type="button" className="py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-center font-bold tracking-widest text-lg px-2" onClick={handleAddChapter}>
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>}
        </div>
      </div>

      {/* Modal for editing the group */}
      <Modal show={editGroup} onHide={() => setEditGroup(false)} size="lg" centered>
        <div className="bg24 rounded-lg border-2 border-yellow-300 overflow-hidden">
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Edit Group (id = {group.id})</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="grid grid-cols-12 gap-2">
              {/* column 1 */}
              <div className="col-span-9">
                <InputLabel id={`group_title_${group.id}`} errorNeeds={[groupErrors, setGroupErrors, "title"]} label="Title" fieldRef={groupTitleRef} defaultValue={group.title}>Title of the group</InputLabel>
              </div>
              {/* column 2 */}
              <div className="col-span-3">
                <InputLabel id={`group_rank_${group.id}`} errorNeeds={[groupErrors, setGroupErrors, "rank"]} label="Rank" fieldRef={groupRankRef} defaultValue={group.rank}>Rank of the group</InputLabel>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant="secondary" onClick={() => setEditGroup(false)}>
              Close
          </Button>
            <Button type="submit" variant="primary" onClick={() => updateGroupData(false)}>
              Save Changes
          </Button>
          </Modal.Footer>

        </div>
      </Modal>

      {/* Modal for delete confirmation */}
      {groupToDelete && <Modal show={groupToDelete !== null} onHide={() => setGroupToDelete(null)} centered>
        <div className="bg24 rounded-lg border-2 border-yellow-300 overflow-hidden">
          <Modal.Header closeButton>
            <Modal.Title className="text-xl">
              Do you really want to delete the group : <br />
              <span className="mr-2 text-blue-500">{groupToDelete.rank}.</span><span className="text-blue-500">{groupToDelete.title}</span> ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button type="button" variant="secondary" onClick={() => setGroupToDelete(null)}>
              No, cancel
          </Button>
            <Button type="submit" variant="primary" onClick={() => deleteGroup(groupToDelete.id)}>
              Yes, I'm sure
          </Button>
          </Modal.Footer>

        </div>
      </Modal>}
    </>
  )
}

export default ChaptersGroup

// Chapters reducer
function chapterReducer(state = [], action) {
  switch (action.type) {

    case "INIT":
      return action.payload.sort((a, b) => {
        if (a.rank < b.rank) return -1;
        else if (a.rank === b.rank) return 0;
        return 1;
      });

    case "ADD":
      state.push(action.payload);
      return state.sort((a, b) => {
        if (a.rank < b.rank) return -1;
        else if (a.rank === b.rank) return 0;
        return 1;
      });

    case "REMOVE":
      return state.filter(chapter => chapter.id !== action.payload.id);

    case "UPDATE":
      return state
        .map(chapter => chapter.id === action.payload.id ? action.payload : chapter)
        .sort((a, b) => {
          if (a.rank < b.rank) return -1;
          else if (a.rank === b.rank) return 0;
          return 1;
        });

    case "SORT":
      return state.sort((a, b) => {
        if (a.rank < b.rank) return -1;
        else if (a.rank === b.rank) return 0;
        return 1;
      })

    default: return state;
  }
}