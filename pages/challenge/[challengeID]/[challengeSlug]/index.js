import axios from 'axios'
import { useRouter } from 'next/router';
import React from 'react'
import ReactPlayer from 'react-player';
import AnswerAside from '../../../../_components/front/AnswerAside';
import PostContent from '../../../../_components/front/PostContent';
import { API_URL } from '../../../../_constants/URLs';

export default function ViewAChallenge({ challenge }) {
	// if (challenge) console.log(challenge);

	const router = useRouter();
	if (router.isFallback) return <div className="text-4xl font-bold tracking-widest h-full flex justify-center items-center">Vetivety ...</div>;

	const answers = challenge.answers.sort((a, b) => {
		if (a.rank < b.rank) return -1;
		else if (a.rank > b.rank) return 1;
		return 0;
	});

	return (
		<div className="">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-4 bg45 p-4">
				<div className="flex justify-center md:col-span-1 relative">
					<img src={challenge.image_cover} alt={challenge.slug} className="max-w-full rounded-xl" />
					<div className="absolute bottom-1 left-0">
						{challenge && challenge.tags && challenge.tags.map(tag => (
							<span key={tag.id} className="bg-black text-xs font-semibold tracking-widest mx-1 px-2 py-1 rounded-full">{tag.name}</span>
						))}
					</div>
				</div>
				<div className="col-span-2 md:flex flex-col justify-between">
					<div className="flex-1">
						<h1 className="font-bold text-lg sm:text-2xl tracking-widest mb-3 sm:mb-4">
							{challenge.title}
						</h1>
						<p className="text-sm md:text-base mb-8">{challenge.description}</p>
					</div>
					<div className="ml-8">
						{challenge.price > 0 && <span className="px-2 py-1 rounded-full twitter-bg twitter-bg-hover transition-colors duration-300 border-2 border-dotted border-transparent hover:border-white ease-in-out font-bold tracking-widest cursor-pointer">Hividy</span>}
					</div>
				</div>
			</div>

			<div className="px-4 xl:pl-8 md:pr-2">
				<div className="my-4 grid grid-cols-12 gap-4 md:gap-x-8 relative">
					<div className="col-span-12 md:col-span-8">
						{challenge && challenge.video.url && <div className="flex justify-center mb-4 bg-gray-300">
							<ReactPlayer url={challenge.video.url} />
						</div>}
						<div>
							<PostContent content={challenge?.content} />
						</div>
					</div>
					<div className="col-span-12 md:col-span-4 my-4">
						<h2 className="font-bold tracking-widest text-xl text-center mb-4">IREO TAKELAKA</h2>
						<div className="mb-2">
							{answers && answers.map(answer => <AnswerAside key={answer.id} answer={answer} challenge={challenge} />)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export async function getStaticPaths() {
	const response = await axios.get(`${API_URL}/challenges?pubished`);

	const { challenges } = response.data;
	const paths = challenges.map(challenge => ({ params: { challengeID: challenge.id, challengeSlug: challenge.slug } }));

	return {
		paths,
		fallback: true
	}
}

export async function getStaticProps({ params }) {
	try {
		const response = await axios.get(`${API_URL}/challenge/${params.challengeID}/${params.challengeSlug}`);
		const { challenge } = response.data;
		return {
			props: {
				page: {
					title: challenge.title,
				},
				challenge
			}
		}
	} catch (error) {
		return {
			props: {
				page: {
					title: "Pejy tsy tazana"
				}
			},
			notFound: true
		}
	}
}
