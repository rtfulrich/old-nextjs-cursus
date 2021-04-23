import axios from 'axios';
import React from 'react'
import { API_URL } from '../../_constants/URLs';
import sanctumRequest from '../../_helpers/sanctumRequest';

function CommentForm({ setComments, post, reply = false }) {

	// S T A T E 
	const [error, setError] = React.useState(null);
	const [loading, setLoading] = React.useState(false);

	// R E F S
	const commentRef = React.useRef();

	// M E T H O D S
	const handleSubmit = e => sanctumRequest(
		async () => {
			e.preventDefault();
			setError(null);
			setLoading(true);
			const data = { id: post.id, content: commentRef.current.value };
			const url = `${API_URL}/${reply ? `comment/${post.id}/reply` : `${post.type.toLowerCase()}-comment/store`}`
			const response = await axios.post(url, data);
			commentRef.current.value = "";
			setComments(comments => [...comments, response.data.newComment]);
		},
		e => setError(e.response.data.errors.content[0]),
		() => setLoading(false)
	);

	return (
		<form onSubmit={handleSubmit}>
			<div className="flex relative">
				{loading && <div className="absolute transition-opacity duration-300 ease-in-out bg-black bg-opacity-50 w-full h-full"></div>}
				<textarea className={`flex-1 mr-2 px-2 py-1 rounded-lg border-2 ${error ? "border-red-500" : "border-gray-500"} bg-gray-700 bg-opacity-70 focus:bg-opacity-40 focus:border-blue-500 outline-none text-sm sm:text-base font-semibold tracking-wider placeholder-gray-400 placeholder-opacity-50 transition-all duration-300 ease-linear`} maxLength={5000} rows="2" placeholder="Soraty eto ny tsikera anao" ref={commentRef}></textarea>
				<button className="px-2 py-1 rounded-lg twitter-bg twitter-bg-hover transition-all duration-300 ease-linear text-sm lg:text-lg font-semibold tracking-widest">
					Itsikera
				</button>
			</div>
			{error && <small className="ml-4 text-xs text-red-500 font-semibold tracking-wider">{error}</small>}
		</form>
	)
}

export default CommentForm
