import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react'
import { API_URL, FRONT_URL } from '../../../../../../../_constants/URLs';
import UserContext from '../../../../../../../_react-contexts/user-context';
import AnswerAside from '../../../../../../../_components/front/AnswerAside';
import ReactPlayer from 'react-player';
import PostContent from '../../../../../../../_components/front/PostContent';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function ViewAPremiumChallenge({ answer, challenge, urlRedirect }) {

	// V A R I A B L E S
	const router = useRouter();

	// C O N T E X T S
	const { user } = React.useContext(UserContext);

	// user E F F E C T
	React.useEffect(() => {
		if (user === null) router.replace(urlRedirect);
	}, [user]);

	const answers = challenge.answers.sort((a, b) => {
		if (a.rank < b.rank) return -1;
		else if (a.rank === b.rank) return 0;
		else return 1;
	});
	return <>
		{ user && (
			<div className="px-4 md:pl-8 md:pr-2">
				<div className="my-8 grid grid-cols-12 gap-4 relative">
					<div className="col-span-12 md:col-span-9">
						{answer.video.url && <div className="flex justify-center mb-8 bg-gray-300">
							<ReactPlayer url={answer.video.url} />
						</div>}
						<div>
							<PostContent content={answer.content} />
						</div>
					</div>
					<div className="hidden md:block md:col-span-3">
						<div className="twitter-bg twitter-bg-hover transition-colors ease-in-out duration-300 p-2 mb-4 hidden md:block rounded-xl">
							<h1 className="font-bold tracking-wider text-lg flex items-center">
								<Link href={`/challenge/${challenge.id}/${challenge.slug}`}>
									<a className="text-center"><FaArrowLeft className="mr-2 inline" /> {challenge.title}</a>
								</Link>
							</h1>
						</div>
						<h2 className="font-bold tracking-widest text-xl text-center mb-4">IREO TAKELAKA</h2>
						{answers.map(answer => <AnswerAside key={answer.id} answer={answer} challenge={challenge} />)}
					</div>
				</div>
			</div>
		)}
		{ !user && <div className="text-4xl font-bold tracking-widest h-full flex justify-center items-center">Redirecting ...</div>}
	</>
}

export async function getServerSideProps({ params, req }) {
	const { challengeID, challengeSlug, answerID, answerSlug } = params;
	try {
		const response = await axios.get(`${API_URL}/challenge/${challengeID}/answer/${answerID}/premium`, {
			headers: { credentials: "include", referer: FRONT_URL, cookie: req.headers.cookie }
		});
		const { challenge, answer } = response.data;
		return {
			props: {
				page: {
					title: answer.title
				},
				answer,
				challenge,
				urlRedirect: `/challenge/${challengeID}/${challengeSlug}`
			}
		}
	} catch (error) {
		console.log(error.response);
		return error.response.status === 403 || error.response.status === 401
			? { redirect: { destination: `/challenge/${challengeID}/${challengeSlug}`, permanent: true } }
			: { notFound: true }
	}
}
