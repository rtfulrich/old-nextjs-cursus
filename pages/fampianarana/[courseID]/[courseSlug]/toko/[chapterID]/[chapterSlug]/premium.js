import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import ChapterAside from '../../../../../../../_components/front/ChapterAside';
import PostContent from '../../../../../../../_components/front/PostContent';
import { API_URL, FRONT_URL } from '../../../../../../../_constants/URLs';
import UserContext from '../../../../../../../_react-contexts/user-context';

export default function ViewPremiumChapter({ chapter, groups = [], courseTitle, urlRedirect }) {
	// console.log("GROUPS prem", groups);

	// V A R I A B L E S
	const router = useRouter();

	// C O N T E X T S
	const { user } = React.useContext(UserContext);

	// user E F F E C T
	React.useEffect(() => {
		const { courseID, courseSlug } = router.query;
		if (user === null) router.replace(urlRedirect);
		else router.replace(`/fampianarana/${courseID}/${courseSlug}/toko/${chapter.id}/${chapter.slug}/premium`);
	}, [user]);

	// J S X
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
	return <>
		{ user && (
			<div className="px-4 md:pl-8 md:pr-2">
				<div className="my-8 grid grid-cols-12 gap-4 relative">
					<div className="col-span-12 md:col-span-8">
						{chapter?.video_url && <div className="flex justify-center mb-8 bg-gray-300">
							<ReactPlayer url={chapter?.video_url} />
						</div>}
						<div>
							<PostContent content={chapter?.content} />
						</div>
					</div>
					<div className="hidden md:block md:col-span-4">
						<div className="twitter-bg twitter-bg-hover transition-colors ease-in-out duration-300 p-2 mb-4 hidden md:block rounded-xl">
							<h1 className="font-bold tracking-wider text-lg flex items-center justify-center">
								<Link href={`/fampianarana/${router.query.courseID}/${router.query.courseSlug}`}>
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
		)}
		{!user && <div className="text-4xl font-bold tracking-widest h-full flex justify-center items-center">Redirecting ...</div>}
	</>
}

export async function getServerSideProps({ params, req }) {
	try {
		const response = await axios.get(`${API_URL}/course/${params.courseID}/chapter/${params.chapterID}/premium`, {
			headers: { credentials: "include", referer: FRONT_URL, cookie: req.headers.cookie }
		});

		const { chapter, groups, course } = response.data;

		return {
			props: {
				page: {
					title: chapter.title
				},
				chapter,
				groups,
				courseTitle: course.title,
				urlRedirect: `/fampianarana/${params.courseID}/${params.courseSlug}`
			}
		}
	}
	catch (e) {
		console.log(e, e.response);
		return {
			redirect: {
				destination: `/fampianarana/${params.courseID}/${params.courseSlug}`,
				permanent: true
			}
		}
	}
}
