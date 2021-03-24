import axios from 'axios';
import React from 'react'
import ReactPlayer from 'react-player';
import { REVALIDATE } from '../../../../_constants/nextConstants';
import { API_URL } from '../../../../_constants/URLs';
import PostContent from "../../../../_components/front/PostContent";
import { useRouter } from 'next/router';
import UserContext from '../../../../_react-contexts/user-context';

export default function ViewFreeChapter({ chapter, unauthorized }) {
	if (chapter) console.log("chapter", chapter);

	const router = useRouter();

	// M O U N T  E F F E C T
	React.useEffect(() => {
		if (unauthorized) router.replace(unauthorized.redirect);
	}, []);

	if (unauthorized) return <div className="text-4xl h-full flex justify-center items-center font-bold tracking-widest">Redirecting ...</div>

	const videoURL = chapter?.video.url;
	const videoDuration = chapter?.video.duration;
	return (
		<div className="px-4 md:px-8">
			{videoURL && <div className="flex justify-center">
				<ReactPlayer url={videoURL} />
			</div>}
			<div className="my-8">
				<PostContent content={chapter?.content} />
			</div>
		</div>
	)

}

export async function getStaticPaths() {
	const response = await axios.get(`${API_URL}/courses?published=true&with-chapters`);

	const { courses } = response.data;
	// console.log(courses);
	let paths = [];
	courses.forEach(course => {
		const groups = course.chapters_groups;
		groups.forEach(group => {
			const chapters = group.chapters;
			chapters.forEach(chapter => {
				paths.push({
					params: {
						courseSlug: course.slug,
						chapterSlug: chapter.slug
					}
				});
			});
		});
	});
	// console.log("p", paths);
	return {
		paths,
		fallback: true
	};
}

export async function getStaticProps({ params }) {
	try {
		const response = await axios.get(`${API_URL}/course/${params.courseSlug}/chapter/${params.chapterSlug}`);
		const { chapter } = response.data;

		return {
			props: {
				page: {
					title: chapter.title
				},
				chapter
			},
			revalidate: REVALIDATE
		}
	}
	catch (e) {
		return e.response.status === 403
			? {
				props: {
					page: {
						title: "Redirecting ... - IanaTek"
					},
					unauthorized: { redirect: `/fampianarana/${params.courseSlug}` }
				}
			}
			: {
				props: {
					page: {
						title: "Pejy tsy tazana - IanaTek"
					},
				},
				notFound: true
			}
	}
}
