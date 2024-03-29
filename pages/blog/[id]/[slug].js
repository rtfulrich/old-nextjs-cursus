import axios from 'axios'
import { useRouter } from 'next/router';
import React from 'react'
import ReactPlayer from 'react-player';
import CommentSection, { BLOG_POST } from '../../../_components/front/CommentSection';
import FetchPostsForAside, { CHALLENGE_POST, COURSE_POST } from '../../../_components/front/FetchPostsForAside';
import PostContent from '../../../_components/front/PostContent';
import { API_URL } from '../../../_constants/URLs';
import UserContext from '../../../_react-contexts/user-context';

export default function ViewBlogContent({ blog }) {

	// V A R I A B L E
	const router = useRouter();
	const { id } = router.query;

	// E F F E C T on [id]
	React.useEffect(() => {
		const timeout = setTimeout(() => {
			axios.put(`${API_URL}/blog/${id}/increment-views`);
		}, 2000 * 60); // 2 minutes

		return () => clearTimeout(timeout);
	}, [id]);

	// C O N T E X T
	const { user } = React.useContext(UserContext);

	return (
		<div className="px-4 md:pl-8 md:pr-2">
			<div className="my-4 grid grid-cols-12 gap-x-4 md:gap-x-8">
				<section className="col-span-12 md:col-span-8">
					{blog && blog.video.url && <div className="flex justify-center mb-8 bg-gray-300">
						<ReactPlayer url={blog?.video.url} />
					</div>}
					<article>
						<PostContent content={blog?.content} />
					</article>
					{/* Comment section */}
					{user && (<>
						<hr className="mt-8 mb-4" />
						<div>
							<CommentSection post={{ type: BLOG_POST, id: router.query.id }} />
						</div>
					</>)}
				</section>
				<aside className="hidden md:block md:col-span-4">
					<FetchPostsForAside postType={COURSE_POST} />
					<hr className="my-4 opacity-30" />
					<FetchPostsForAside postType={CHALLENGE_POST} />
				</aside>
			</div>
		</div>
	)
}

export async function getServerSideProps({ params }) {
	try {
		const response = await axios.get(`${API_URL}/blog/${params.id}?slug=${params.slug}`);
		const { blog } = response.data;
		return {
			props: {
				page: {
					title: blog.title,
					metaDescription: blog.description,
				},
				blog
			}
		}
	} catch (error) {
		return {
			props: {
				page: {
					title: "Pejy tsy tazana",
				},
			},
			notFound: true
		};
	}
}
