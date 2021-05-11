import axios from 'axios';
import React from 'react'
import ReactPlayer from 'react-player';
import { API_URL, FRONT_URL } from '../../../../../../../_constants/URLs';
import PostContent from "../../../../../../../_components/front/PostContent";
import { useRouter } from 'next/router';
import Link from "next/link";
import { FaArrowLeft, FaLock } from "react-icons/fa";
import ChapterAside from '../../../../../../../_components/front/ChapterAside';
import CommentSection, { CHAPTER_POST } from '../../../../../../../_components/front/CommentSection';
import UserContext from '../../../../../../../_react-contexts/user-context';

export default function ViewAChapter({ chapter, groups = [], course }) {

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
		const timeout = setTimeout(() => {
			axios.put(`${API_URL}/chapter/${chapterID}/increment-views`);
		}, 2000 * 60); // 2 minutes

		return () => clearTimeout(timeout);
	}, [chapterID]);

	// E F F E C T   [user]
	React.useEffect(() => {
		if (user === null) {
			axios
				.get(`${API_URL}/check-can-see-chapter/${chapterID}`)
				.then(response => {
					const { courseID, courseSlug } = router.query;
					if (response.data.can === false) router.push(`/fampianarana/${courseID}/${courseSlug}`);
				});
		}
	}, [user]);

	const videoURL = chapter?.video.url;
	const videoDuration = chapter?.video.duration;
	const courseTitle = course.title;
	return (
		<div className="px-4 md:pl-8 md:pr-2">
			<div className="my-8 grid grid-cols-12 gap-4 md:gap-x-8">
				<section className="col-span-12 md:col-span-8">
					{videoURL && <div className="flex justify-center mb-8 bg-gray-300">
						<ReactPlayer url={videoURL} />
					</div>}
					<article>
						<PostContent content={chapter?.content} />
					</article>
					{/* Comment section */}
					{user && (<>
						<hr className="mt-8 mb-4" />
						<section>
							<CommentSection post={{ type: CHAPTER_POST, id: router.query.chapterID }} />
						</section>
					</>)}
				</section>
				<aside className="hidden md:block md:col-span-4">
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
				</aside>
			</div>
		</div>
	)

}

export async function getServerSideProps({ params, req }) {
	try {
		const response = await axios.get(`${API_URL}/course/${params.courseID}/chapter/${params.chapterID}?courseSlug=${params.courseSlug}&chapterSlug=${params.chapterSlug}`, {
			headers: { credentials: "include", referer: FRONT_URL, cookie: req.headers.cookie }
		});
		const { chapter, groups, course } = response.data;

		return {
			props: {
				page: {
					title: chapter.title,
					metaDescription: course.description,
				},
				chapter,
				groups,
				course
			},
		}
	}
	catch (e) {
		return e.response.status === 403
			? {
				redirect: {
					destination: `/fampianarana/${params.courseID}/${params.courseSlug}`,
					permanent: true
				}
			}
			: {
				props: {
					page: {
						title: "Pejy tsy tazana - IanaTek",
					},
				},
				notFound: true
			};
	}
}
