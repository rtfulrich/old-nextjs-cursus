import axios from 'axios';
import React from 'react'
import { API_URL } from '../../_constants/URLs';
import sanctumRequest from '../../_helpers/sanctumRequest';
import { BLOG_POST, TUTORIAL_POST } from './CommentSection';
import PostGridItem from "./PostGridItem";

export const COURSE_POST = "COURSE";
export const CHALLENGE_POST = "CHALLENGE";

function FetchPostsForAside({ postType, otherThan = null }) {

	// S T A T E 
	const [posts, setPosts] = React.useState([]);

	// M O U N T
	React.useEffect(() => {
		fetchPosts();
		const interval = setInterval(fetchPosts, 1000 * 60 * 1);

		return () => clearInterval(interval);
	}, []);

	// M E T H O D
	const fetchPosts = () => sanctumRequest(async () => {
		if ([COURSE_POST, CHALLENGE_POST, TUTORIAL_POST, BLOG_POST].includes(postType.toUpperCase())) {
			const url = `${API_URL}/fetch-interesting-${postType.toLowerCase()}s${otherThan ? `?otherThan=${otherThan}` : ""}`;
			const response = await axios.get(url);
			const { data } = response;
			if (postType === COURSE_POST) setPosts(data.courses);
			else if (postType === CHALLENGE_POST) setPosts(data.challenges);
			else if (postType === TUTORIAL_POST) setPosts(data.tutorials);
			else if (postType === BLOG_POST) setPosts(data.blogs);
		} else throw new TypeError("The value of post type is unexpected !");
	});

	const h3Class = "font-bold tracking-widest text-center text-lg px-2 py-1 rounded-full text-gray-400 text-opacity-95 mb-4";
	return (
		<aside>
			{postType === COURSE_POST && <h3 className={h3Class}>Fampianarana mety hahaliana</h3>}
			{postType === CHALLENGE_POST && <h3 className={h3Class}>Challenges mety hahaliana</h3>}
			{postType === TUTORIAL_POST && <h3 className={h3Class}>Tutos mety hahaliana</h3>}
			{postType === BLOG_POST && <h3 className={h3Class}>Blogs mety hahaliana</h3>}

			<ul className="mx-4">
				{posts.map(post => {
					let url = "#";
					if (postType === COURSE_POST) url = `/fampianarana/${post.id}/${post.slug}`;
					if (postType === CHALLENGE_POST) url = `/challenge/${post.id}/${post.slug}`;
					if (postType === TUTORIAL_POST) url = `/tutorial/${post.id}/${post.slug}`;
					if (postType === BLOG_POST) url = `/blog/${post.id}/${post.slug}`;
					return (
						<li key={post.id} className="mb-4">
							<PostGridItem post={post} url={url} />
							<hr className="mt-2" />
						</li>
					);
				})}
			</ul>

		</aside>
	)
}

export default FetchPostsForAside
