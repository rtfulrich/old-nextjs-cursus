import React from 'react'
import ReactPlayer from 'react-player'
import PostContent from '../../../../../../../_components/front/PostContent'
import AnswerAside from '../../../../../../../_components/front/AnswerAside'
import axios from 'axios';
import { API_URL } from '../../../../../../../_constants/URLs';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CommentSection, { ANSWER_POST } from '../../../../../../../_components/front/CommentSection';
import UserContext from '../../../../../../../_react-contexts/user-context';

export default function ViewAFreeAnswer({ answer, challenge }) {
	// console.log(answer, challenge);

	// C O N T E X T
	const { user } = React.useContext(UserContext);

	// V A R I A B L E S
	const router = useRouter();

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

export async function getStaticPaths() {
	const response = await axios.get(`${API_URL}/challenges?published&with-answers`);

	const { challenges } = response.data;

	const paths = [];
	challenges.forEach(challenge => {
		const answers = challenge.answers;
		answers.forEach(answer => {
			paths.push({
				params: {
					challengeID: challenge.id.toString(),
					challengeSlug: challenge.slug,
					answerID: answer.id.toString(),
					answerSlug: answer.slug
				}
			});
		});
	});

	return {
		paths,
		fallback: true
	};
}

export async function getStaticProps({ params }) {
	try {
		const response = await axios.get(`${API_URL}/challenge/${params.challengeID}/answer/${params.answerID}?challengeSlug=${params.challengeSlug}&answerSlug=${params.answerSlug}`);
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
		return {
			notFound: true
		}
	}
}