import axios from 'axios'
import React from 'react'
import { FaShoppingBasket } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import PostContent from '../../../../_components/front/PostContent';
import PostGridItem from '../../../../_components/front/PostGridItem';
import { API_URL } from '../../../../_constants/URLs';

const CONTENT = "CONTENT";
const ANSWERS_GRID = "ANSWERS";

export default function ViewAChallenge({ challenge }) {

	// S T A T E S
	const [mainToShow, setMainToShow] = React.useState(CONTENT);

	const answers = challenge.answers.sort((a, b) => {
		if (a.rank < b.rank) return -1;
		else if (a.rank > b.rank) return 1;
		return 0;
	});

	return (
		<div className="">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-4 bg45 p-4">
				<div className="md:col-span-1">
					<div className="relative">
						<img src={challenge.image_cover} alt={challenge.slug} className="max-w-full rounded-xl" />
						<div className="absolute bottom-1 left-0">
							{challenge && challenge.tags && challenge.tags.map(tag => (
								<span key={tag.id} className="bg-black text-xs font-semibold tracking-widest mx-1 px-2 py-1 rounded-full">{tag.name}</span>
							))}
						</div>
					</div>
					{challenge.price > 0 && (
						<div className="flex justify-between font-bold text-black mt-2 mx-8">
							<div className="tracking-widest text-sm px-4 py-2 rounded-full bg-yellow-300">{challenge.price} ar</div>
							<div className="px-4 rounded-full twitter-bg twitter-bg-hover transition-all duration-500 ease-in-out tracking-widest cursor-pointer flex items-center transform hover:scale-105 hover:-rotate-1">
								<FaShoppingBasket className="mr-2 text-2xl" /> Hividy
								</div>
						</div>
					)}
				</div>
				<section className="col-span-2 md:flex flex-col justify-between">
					<div className="flex-1">
						<h1 className="font-bold text-lg sm:text-2xl tracking-widest mb-3 sm:mb-4">
							{challenge.title}
						</h1>
						<p className="text-sm md:text-base mb-8 whitespace-pre-wrap">{challenge.description}</p>
					</div>
				</section>
			</div>

			<div className="flex justify-center items-center mt-4 mb-6 font-bold tracking-widest">
				<div className={`border-b-2 pb-2 mx-2 md:mx-4 xl:mx-8 cursor-pointer ${mainToShow === CONTENT ? "twitter border-twitter" : "border-transparent"} transition-colors ease-in-out duration-300`} onClick={() => setMainToShow(CONTENT)}>
					VOTOATINY
					</div>
				<div className={`pb-2 border-b-2 mx-2 md:mx-4 xl:mx-8 cursor-pointer ${mainToShow === ANSWERS_GRID ? "twitter border-twitter" : "border-transparent"} transition-colors ease-in-out duration-300`} onClick={() => setMainToShow(ANSWERS_GRID)}>
					IREO VALINY
					</div>
			</div>

			<section className="px-4 md:px-8 mb-8">
				{mainToShow === CONTENT && (
					<div className="md:px-16">
						{challenge && challenge.video.url && <div className="flex justify-center mb-4 bg-gray-300">
							<ReactPlayer url={challenge.video.url} />
						</div>}
						<article>
							<PostContent content={challenge?.content} />
						</article>
					</div>
				)}
				{mainToShow === ANSWERS_GRID && answers && (
					<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
						{answers.map(answer => (
							<PostGridItem key={answer.id} post={answer} url={`/challenge/${challenge.id}/${challenge.slug}/toko/${answer.id}/${answer.slug}`} parent={challenge} />
						))}
					</div>
				)}
			</section>
		</div>
	)
}

// export async function getStaticPaths() {
// 	const response = await axios.get(`${API_URL}/challenges?published`);

// 	const { challenges } = response.data;
// 	const paths = [];
// 	challenges.forEach(
// 		challenge => paths.push({ params: { challengeID: challenge.id.toString(), challengeSlug: challenge.slug } })
// 	);

// 	return {
// 		paths,
// 		fallback: true
// 	}
// }

export async function getServerSideProps({ params }) {
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
