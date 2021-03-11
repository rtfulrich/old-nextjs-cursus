import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import InputLabel from '../../../../_components/admin/posts/fields/InputLabel';
import ChallengeAnswer from '../../../../_components/admin/posts/manage-challenges/ChallengeAnswer';
import { ADMIN_API_URL, FRONT_URL } from '../../../../_constants/URLs';
import getPageProps from '../../../../_helpers/getPageProps'
import sanctumRequest from '../../../../_helpers/sanctumRequest';

export default function EditChallengeAnswers({ challengeData }) {
  console.log(challengeData);

  // V A R I A B L E S
  const router = useRouter();
  const answers = challengeData.answers.sort((a, b) => {
    if (a.rank < b.rank) return -1;
    else if (a.rank > b.rank) return 1;
    return 0;
  });

  // S T A T E S
  const [answerErrors, setAnswerErrors] = React.useState({ title: null, rank: null });

  // R E F S
  const titleRef = React.useRef();
  const rankRef = React.useRef();

  // M E T H O D S
  const addAnswer = () => sanctumRequest(
    async () => {
      const title = titleRef.current.value;
      const rank = rankRef.current.value;
      const challengeID = challengeData.id;
      const response = await axios.post(`${ADMIN_API_URL}/challenge-answer/store`, { title, rank, challengeID });
      titleRef.current.value = "";
      rankRef.current.value = "";
      const { message, newAnswer } = response.data; console.log(newAnswer)
      toast.success(<span className="font-bold tracking-widest">{message}</span>);
      router.push(`/admin/challenge/${challengeData.slug}/edit-answers`);
    },
    e => {
      const { status, data } = e.response;
      if (status === 422) {
        const errors = { title: null, rank: null };
        if (data.errors.title) errors.title = data.errors.title[0];
        if (data.errors.rank) errors.rank = data.errors.rank[0];
        setAnswerErrors({ ...errors });
        // if (data.errors.chapterGroupID) toast.error(data.errors.chapterGroupID[0]);
      }
    }
  );

  // J S X
  return (
    <div className="p-4">
      <div className="flex justify-between flex-col lg:flex-row items-center mb-4">
        <h1 className={`text-3xl tracking-widest font-bold mb-3 md:mb-0 ${challengeData.published ? "success" : "text-yellow-300"}`}>
          {challengeData.title}
        </h1>
        <div className="flex">
          <Link href={`/admin/challenge/${challengeData.slug}`}>
            <a className={`px-3 py-2 md:text-sm rounded-lg border-2 flex items-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-30 font-bold tracking-widest transition-colors duration-150 border-blue-500 text-blue-500 hover:text-blue-500 mr-2`} style={{ textDecoration: "none" }}>
              <FaArrowCircleLeft className="mr-2" /> Edit the challenge
            </a>
          </Link>
        </div>
      </div>

      {/* All groups and their chapters */}
      {
        answers.length === 0 && <div className="tracking-widest font-semibold mb-3 opacity-80">No answers Yet</div>
      }
      {
        answers.map((answer, index) => <ChallengeAnswer key={Math.random()} answer={answer} />)
      }

      {/* Create a new answer */}
      <div className={`grid grid-cols-12 gap-4 border-t-2 pt-4 ${challengeData.published ? "border-success" : "border-yellow-300"}`}>
        <div className="col-span-12">
          <div className={`grid grid-cols-12 gap-4 pr-2 border-2 ${challengeData.published ? "border-success" : "border-yellow-300"} rounded-xl items-start overflow-hidden`}>
            <h3 className={`col-span-2 ${challengeData.published ? "success-bg" : "bg-yellow-300"} h-full flex items-center justify-center text-2xl font-semibold tracking-widest text-black`}>New answer</h3>
            <div className="col-span-2 py-2">
              <InputLabel id="answer_rank" label="Rank" fieldRef={rankRef} errorNeeds={[answerErrors, setAnswerErrors, "rank"]}>Rank of the answer</InputLabel>
            </div>
            <div className="col-span-6 py-2">
              <InputLabel id="answer_title" label="Title" fieldRef={titleRef} errorNeeds={[answerErrors, setAnswerErrors, "title"]}>Title of the answer</InputLabel>
            </div>
            <div className="col-span-2 flex self-center">
              <button type="button" className={`py-2 rounded-xl ${challengeData.published ? "success-bg success-bg-hover" : "bg-yellow-300 hover:bg-yellow-400"} w-full text-center font-bold tracking-widest text-lg text-black`} onClick={addAnswer}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export async function getServerSideProps({ params, req }) {
  return await getPageProps(async () => {
    const response = await axios.get(`${ADMIN_API_URL}/challenge/${params.slug}?with-answers`, {
      headers: {
        credentials: "include",
        referer: FRONT_URL,
        cookie: req.headers.cookie
      }
    });
    const { challengeData } = response.data;
    return {
      props: {
        page: {
          title: "Challenge - Edit answers"
        },
        challengeData,
      }
    }
  });
}

/* function errorsReducer(state = { title: null, rank: null }, action) {
  switch (action.type) {
    case "CLEAR":
      return { title: null, rank: null };
    case "ADD":
      return { ...state, [action.payload.name]: action.payload.error };
    default: return state;
  }
} */