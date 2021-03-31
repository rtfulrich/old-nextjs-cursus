import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import ReactPlayer from 'react-player';
import ChapterAside from '../../../../_components/front/ChapterAside';
import PostContent from '../../../../_components/front/PostContent';
import { API_URL, FRONT_URL } from '../../../../_constants/URLs';
import UserContext from '../../../../_react-contexts/user-context';

export default function ViewPremiumChapter({ chapter, groups = [], urlRedirect }) {
	// console.log("GROUPS prem", groups);

	// V A R I A B L E S
	const router = useRouter();

	// C O N T E X T S
	const { user } = React.useContext(UserContext);

	// user E F F E C T
	React.useEffect(() => {
		// const isLoggedIn = user; // u = is user not logged in
		// console.log("NLI", user === null);
		if (user === null) router.replace(urlRedirect);
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
					<div className="col-span-12 md:col-span-9">
						{chapter?.video_url && <div className="flex justify-center mb-8 bg-gray-300">
							<ReactPlayer url={chapter?.video_url} />
						</div>}
						<div>
							<PostContent content={chapter?.content} />
						</div>
					</div>
					<div className="hidden md:block md:col-span-3">
						<h2 className="font-bold tracking-widest text-xl text-center mb-4">IREO TAKELAKA</h2>
						{groups.map(group => (
							<div key={group.id} className="mb-2">
								{group.show && <h3 className="py-1 twitter-bg font-bold text-center text-black">{group.title}</h3>}
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
		const response = await axios.get(`${API_URL}/course/${params.courseSlug}/chapter/${params.chapterSlug}/premium`, {
			headers: { credentials: "include", referer: FRONT_URL, cookie: req.headers.cookie }
		});

		const { chapter, groups } = response.data;

		return {
			props: {
				page: {
					title: chapter.title
				},
				chapter,
				groups,
				urlRedirect: `/fampianarana/${params.courseSlug}`
			}
		}
	}
	catch (e) {
		console.log(e, e.response);
		return {
			redirect: {
				destination: `/fampianarana/${params.courseSlug}`,
				permanent: true
			}
		}
	}
}
