import axios from 'axios'
import React from 'react'
import ReactPlayer from 'react-player';
import PostContent from '../../../_components/front/PostContent';
import { API_URL } from '../../../_constants/URLs';

export default function ViewTutorialContent({ tutorial }) {
	// console.log("tutorial", tutorial);
	return (
		<div className="px-4 md:pl-8 md:pr-2">
			<div className="my-4 grid grid-cols-12 gap-x-4 md:gap-x-8">
				<div className="col-span-12 md:col-span-8">
					{tutorial && tutorial.video.url && <div className="flex justify-center mb-8 bg-gray-300">
						<ReactPlayer url={tutorial.video.url} />
					</div>}
					<div>
						<PostContent content={tutorial?.content} />
					</div>
				</div>
				<div className="hidden md:block md:col-span-4">

				</div>
			</div>
		</div>
	)
}

export async function getStaticPaths() {
	const response = await axios.get(`${API_URL}/tutorials`);
	const { tutorials } = response.data;
	const paths = [];
	tutorials.forEach(tutorial => paths.push({ params: { id: tutorial.id.toString(), slug: tutorial.slug } }));
	return {
		paths,
		fallback: true
	};
}

export async function getStaticProps({ params }) {
	try {
		const response = await axios.get(`${API_URL}/tutorial/${params.id}`);
		const { tutorial } = response.data;
		return {
			props: {
				page: {
					title: tutorial.title
				},
				tutorial
			}
		}
	} catch (error) {
		return {
			props: {
				notFound: true
			}
		}
	}
}
