import React from 'react'
import ReactPlayer from 'react-player'
import PostContent from '../../../../../../../_components/front/PostContent'
import AnswerAside from '../../../../../../../_components/front/AnswerAside'
import axios from 'axios';
import { API_URL, FRONT_URL } from '../../../../../../../_constants/URLs';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CommentSection, { ANSWER_POST } from '../../../../../../../_components/front/CommentSection';
import UserContext from '../../../../../../../_react-contexts/user-context';

export default function ViewAFreeAnswer({ answer, challenge }) {

	// C O N T E X T
	const { user } = React.useContext(UserContext);

	// V A R I A B L E S
	const router = useRouter();

	// E F F E C T  [user]
	React.useEffect(() => {
		const { challengeID, challengeSlug, answerID } = router.query;
		if (user === null) {
			axios
				.get(`${API_URL}/check-can-see-answer/${answerID}`)
				.then(response => {
					if (response.data.can === false) router.push(`/challenge/${challengeID}/${challengeSlug}`);
				});
		}
	}, [user]);

	let answers = [];
	if (challenge) answers = challenge.answers.sort((a, b) => {
		if (a.rank < b.rank) return -1;
		else if (a.rank === b.rank) return 0;
		else return 1;
	});

	return <>
		{challenge && (
			<div className="px-4 xl:pl-8 md:pr-2">
				<div className="my-8 grid grid-cols-12 gap-4 xl:gap-x-8">
					<article className="col-span-12 md:col-span-8">
						{answer && answer.video.url && <div className="flex justify-center mb-8 bg-gray-300">
							<ReactPlayer url={answer?.video.url} />
						</div>}
						<article>
							<PostContent content={answer?.content} />
						</article>
						{/* Comment section */}
						{user && (<>
							<hr className="mt-8 mb-4" />
							<section>
								<CommentSection post={{ type: ANSWER_POST, id: router.query.answerID }} />
							</section>
						</>)}
					</article>
					<aside className="hidden md:block md:col-span-4">
						<div className="twitter-bg twitter-bg-hover transition-colors ease-in-out duration-300 p-2 mb-4 hidden md:block rounded-xl">
							<h1 className="font-bold tracking-wider text-lg flex items-center">
								<Link href={`/challenge/${challenge.id}/${challenge.slug}`}>
									<a className="text-center"><FaArrowLeft className="mr-2 inline" /> {challenge.title}</a>
								</Link>
							</h1>
						</div>
						<h2 className="font-bold tracking-widest text-xl text-center mb-4">IREO TAKELAKA</h2>
						<div className="mb-2">
							{answers.map(answer => <AnswerAside key={answer.id} answer={answer} challenge={challenge} />)}
						</div>
					</aside>
				</div>
			</div>
		)}
	</>;
}

export async function getServerSideProps({ params, req }) {
	const { challengeID, challengeSlug, answerID, answerSlug } = params;
	try {
		const response = await axios.get(`${API_URL}/challenge/${challengeID}/answer/${answerID}?challengeSlug=${challengeSlug}&answerSlug=${answerSlug}`, {
			headers: {
				credentials: "include", referer: FRONT_URL, cookie: req.headers.cookie
			}
		});
		const { answer, challenge } = response.data;
		return {
			props: {
				page: {
					title: answer.title
				},
				answer,
				challenge
			}
		}
	} catch (error) {
		console.log(error.response)
		return error.response.status === 403
			? {
				redirect: {
					destination: `${FRONT_URL}/challenge/${challengeID}/${challengeSlug}`,
					permanent: false
				}
			}
			: {
				props: {
					page: {
						title: "Pejy tsy tazana"
					}
				},
				notFound: true
			};
	}
}