import axios from 'axios';
import React from 'react'
import { API_URL } from '../../_constants/URLs';
import sanctumRequest from '../../_helpers/sanctumRequest';
import SingleComment from './SingleComment';
import CommentForm from './CommentForm';

export const CHAPTER_POST = "CHAPTER";
export const ANSWER_POST = "ANSWER";
export const TUTORIAL_POST = "TUTORIAL";
export const BLOG_POST = "BLOG";

function CommentSection({ post }) {

	// S T A T E
	const [comments, setComments] = React.useState([]);

	// M O U N T
	React.useEffect(() => {
		fetchComments();
		const interval = setInterval(fetchComments, 1000 * 60 * 1);

		return () => clearInterval(interval);
	}, [post.id]);

	// M E T H O D S
	const fetchComments = () => sanctumRequest(
		async () => {
			const response = await axios.get(`${API_URL}/${post.type.toLowerCase()}-comments/${post.id}`);
			setComments(response.data.comments);
		}
	);

	return (
		<section>
			<div className="mb-4">
				<CommentForm setComments={setComments} post={post} />
			</div>
			<div>
				{comments.map(comment => <SingleComment comment={comment} post={post} key={comment.id} />)}
			</div>
		</section>
	);
}

export default CommentSection
