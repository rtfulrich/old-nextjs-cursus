import React from 'react'
import { FaAngleDown, FaAngleRight, FaAngleUp } from "react-icons/fa"
import { formatDate } from '../_helpers/date';
import CommentForm from './front/CommentForm';

function SingleComment({ comment, repliable = true }) {

	// S T A T E 
	const [replying, setReplying] = React.useState(false);
	const [showReplies, setShowReplies] = React.useState(false);
	const [replies, setReplies] = React.useState([]);

	// M O U N T
	React.useEffect(() => {
		if (repliable) {
			setShowReplies(true);
			setReplies(comment.replies);
		}
	}, []);

	return (
		<section className={`flex p-1 transition-colors duration-200 ease-in-out ${repliable ? "hover:bg-gray-900" : "hover:bg-black"} rounded-xl`}>
			<img src={comment.owner.avatar} className="w-8 h-8 rounded-full mr-2" alt={comment.owner.name} />
			<div className="flex flex-col w-full">
				<h6 className="font-bold text-gray-500 tracking-widest float-left">{comment.owner.full_name}</h6>

				<div className="flex flex-col justify-center flex-wrap">
					<p className="text-sm w-full mb-1 whitespace-pre-wrap">{comment.content}</p>
					<div className="flex items-center">
						<small className="rounded-full font-semibold text-xs opacity-30 mr-4">
							{formatDate(comment.created_at)}
						</small>

						<div className="flex items-center hover:text-blue-500 cursor-pointer">
							<div className="flex items-center" onClick={() => setShowReplies(!showReplies)}>
								{repliable && (
									<small className="text-xs text-gray-400 tracking-wide">Valiny ({comment.replies.length})</small>
								)}
								{repliable && comment.replies.length > 0 && showReplies && (
									<FaAngleUp />
								)}
								{repliable && comment.replies.length > 0 && !showReplies && (
									<FaAngleDown />
								)}
							</div>
							{repliable && (
								<button className={`px-1 rounded-lg ${replying ? "bg-red-400 hover:bg-red-500" : "twitter-bg twitter-bg-hover"} text-xs text-black ml-3`} onClick={() => setReplying(!replying)}>
									{replying ? "Tsy hamaly" : "Hamaly"}
								</button>
							)}
						</div>
					</div>
				</div>

				{showReplies && replies.length > 0 && (
					<div className="mt-2">
						{replies.map(reply => <SingleComment comment={reply} repliable={false} key={reply.id} />
						)}
					</div>
				)}
				{replying && (
					<div className="my-2">
						<CommentForm setComments={setReplies} post={comment} reply={true} />
					</div>
				)}

			</div>
		</section>
	);
}

export default SingleComment
