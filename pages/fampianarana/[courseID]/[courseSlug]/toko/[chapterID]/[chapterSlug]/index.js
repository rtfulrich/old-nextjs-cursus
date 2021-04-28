import axios from 'axios';
import React from 'react'
import ReactPlayer from 'react-player';
import { REVALIDATE } from '../../../../../../../_constants/nextConstants';
import { API_URL } from '../../../../../../../_constants/URLs';
import PostContent from "../../../../../../../_components/front/PostContent";
import { useRouter } from 'next/router';
import Link from "next/link";
import { FaArrowLeft, FaLock } from "react-icons/fa";
import ChapterAside from '../../../../../../../_components/front/ChapterAside';
import CommentSection, { CHAPTER_POST } from '../../../../../../../_components/front/CommentSection';
import UserContext from '../../../../../../../_react-contexts/user-context';

export default function ViewFreeChapter({ chapter, groups = [], course, unauthorized }) {

	// C O N T E X T
	const { user } = React.useContext(UserContext);

	if (groups) {
		groups = groups.sort((a, b) => {
			if (a.rank < b.rank) return -1;
			else if (a.rank === b.rank) return 0;
			else return 1;
		});
		groups.forEach(group => {
			group.chapters = group.chapters.sort((a, b) => {
				if (a.rank < b.rank) return -1;
				else if (a.rank === b.rank) return 0;
				else return 1;
			});
		});
	}

	// V A R I A B L E S
	const router = useRouter();
	const { chapterID } = router.query;

	// M O U N T  E F F E C T
	React.useEffect(() => {
		if (unauthorized) router.replace(unauthorized.redirect);
		/* ------------------------------------------------------ */
		const timeout = setTimeout(() => {
			axios.put(`${API_URL}/chapter/${chapterID}/increment-views`);
		}, 2000 * 60); // 2 minutes

		return () => clearTimeout(timeout);
	}, [chapterID]);

	if (unauthorized) return <div className="text-4xl h-full flex justify-center items-center font-bold tracking-widest">Redirecting ...</div>

	const videoURL = chapter?.video.url;
	const videoDuration = chapter?.video.duration;
	const courseTitle = course.title;
	return (
		<div className="px-4 md:pl-8 md:pr-2">
			<div className="my-8 grid grid-cols-12 gap-4 md:gap-x-8">
				<div className="col-span-12 md:col-span-8">
					{videoURL && <div className="flex justify-center mb-8 bg-gray-300">
						<ReactPlayer url={videoURL} />
					</div>}
					<div>
						<PostContent content={chapter?.content} />
					</div>
					{/* Comment section */}
					{user && (<>
						<hr className="mt-8 mb-4" />
						<div>
							<CommentSection post={{ type: CHAPTER_POST, id: router.query.chapterID }} />
						</div>
					</>)}
				</div>
				<div className="hidden md:block md:col-span-4">
					<div className="twitter-bg twitter-bg-hover transition-colors ease-in-out duration-300 p-2 mb-4 hidden md:block rounded-xl">
						<h1 className="font-bold tracking-wider text-lg flex items-center justify-center">
							<Link href={`/fampianarana/${course.id}/${course.slug}`}>
								<a className="text-center"><FaArrowLeft className="mr-2 inline" /> {courseTitle}</a>
							</Link>
						</h1>
					</div>
					<h2 className="font-bold tracking-widest text-xl text-center mb-4">IREO TAKELAKA</h2>
					{groups.map(group => (
						<div key={group.id} className="mb-8">
							{group.show && <h3 className="py-1 bg-yellow-300 bg-opacity-70 bg-gradient-to-br font-bold text-center text-black">{group.title}</h3>}
							<div>
								{group.chapters.map(chapter => <ChapterAside key={chapter.id} chapter={chapter} />)}
							</div>
						</div>
					))}
				</div>
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
						courseID: course.id.toString(),
						courseSlug: course.slug,
						chapterID: chapter.id.toString(),
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
		const response = await axios.get(`${API_URL}/course/${params.courseID}/chapter/${params.chapterID}?courseSlug=${params.courseSlug}&chapterSlug=${params.chapterSlug}`);
		const { chapter, groups, course } = response.data;

		return {
			props: {
				page: {
					title: chapter.title
				},
				chapter,
				groups,
				course
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
					unauthorized: { redirect: `/fampianarana/${params.courseID}/${params.courseSlug}` }
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
