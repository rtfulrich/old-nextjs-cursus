import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import ReactPlayer from 'react-player';
import PostContent from '../../../../_components/front/PostContent';
import { API_URL, FRONT_URL } from '../../../../_constants/URLs';
import UserContext from '../../../../_react-contexts/user-context';

export default function ViewPremiumChapter({ chapter, urlRedirect }) {
	console.log("chapter prem", chapter);

	// V A R I A B L E S
	const router = useRouter();

	// C O N T E X T S
	const { user } = React.useContext(UserContext);

	// user E F F E C T
	React.useEffect(() => {
		if (!user) router.replace(urlRedirect);
	}, [user]);

	return <>
		{ user && <div className="px-4 md:px-8">
			{(chapter && chapter.video.url) && <div className="flex justify-center">
				<ReactPlayer url={chapter.video.url} />
			</div>}
			<div className="my-8">
				<PostContent content={chapter?.content} />
			</div>
		</div>}
		{!user && <div className="text-4xl font-bold tracking-widest h-full flex justify-center items-center">Redirecting ...</div>}
	</>
}

export async function getServerSideProps({ params, req }) {
	try {
		const response = await axios.get(`${API_URL}/course/${params.courseSlug}/chapter/${params.chapterSlug}/premium`, {
			headers: { credentials: "include", referer: FRONT_URL, cookie: req.headers.cookie }
		});

		const { chapter } = response.data;

		return {
			props: {
				page: {
					title: "View a chapter"
				},
				chapter,
				urlRedirect: `/fampianarana/${params.courseSlug}`
			}
		}
	}
	catch (e) {
		return {
			redirect: {
				destination: `/fampianarana/${params.courseSlug}`,
				permanent: false
			}
		}
	}
}
