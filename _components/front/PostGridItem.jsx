import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import { FaLock } from 'react-icons/fa';
import { API_URL } from '../../_constants/URLs';
import UserContext from '../../_react-contexts/user-context';

function PostGridItem({ post, url, showDate = false, parent = null }) {

	// C O N T E X T S
	const { user } = React.useContext(UserContext);

	// S T A T E S
	const [canSeePost, setCanSeePost] = React.useState(null);

	// E F F E C T S
	React.useEffect(async () => {
		if (parent) { // COURSE || CHALLENGE
			if (user) { // User is authenticated
				try {
					const postType = parent.visits ? "chapter" : "answer";
					const response = await axios.get(`${API_URL}/check-can-see-${postType}/${post.id}`);
					const { can } = response.data;
					setCanSeePost(can);
				} catch (error) {
					console.clear();
					console.log("ecan", error, error.reponse);
				}
			}
			else { // No authenticated user
				if (post.show_anyway) setCanSeePost(true);
				else setCanSeePost(parent.price === "0");
			}
		}
		else setCanSeePost(true);
	}, [user]);

	// M E T H O D S
	const handleLinkClick = e => {
		if (!canSeePost) e.preventDefault();
	}

	// J S X
	let toPrint = "";
	if (showDate) {
		const dateInstance = new Date(post.updated_at);
		const date = dateInstance.toUTCString();
		const year = dateInstance.getFullYear();
		const withDay = `${date.split(year)[0]} ${year}`;
		toPrint = withDay.split(",")[1];
	}
	if ((parent && parent.price > 0) && (post.show_anyway === false)) url += "/premium";
	return (
		<div className="rounded-xl relative flex flex-col transition-colors duration-300 ease-in-out">
			<Link href={url}>
				<a className="hover:text-yellow-300 transition-all duration-300 ease-in-out">
					<div className="flex justify-center items-center rounded-xl relative transition-all duration-500 ease-in-out transform hover:scale-105 hover:-rotate-1 border-2 border-black hover:border-yellow-300 bg-yellow-300" onClick={handleLinkClick}>
						<img src={post.image_cover} className="rounded-xl" />
						{post.rank && (
							<span className="absolute -top-2 -right-2 p-1 rounded-full font-bold tracking-widest bg-red-500 text-white text-xs">
								{post.rank}
							</span>
						)}
						{canSeePost === false && (
							<div className="absolute top-0 left-0 p-1 rounded-full font-bold tracking-widest text-red-500 text-xs">
								<FaLock />
							</div>
						)}
					</div>
					<div className="my-2 flex-1 flex flex-col justify-between">
						<h1 className="font-bold mb-2 text-center flex items-center justify-center">
							{post.rank && <><span>{post.rank}</span><span className="mx-2">|</span></>}
							<span>{post.title}</span>
						</h1>
					</div>
				</a>
			</Link>
			<div className={`font-semibold tracking-widest text-xs ${showDate || (post.price && post.price > 0) ? "flex items-center justify-between" : ""}`}>
				{showDate && (
					<div className="px-2 bg45 rounded-full py-1 leading-3 tracking-tight text-center">
						{toPrint}
					</div>
				)}
				{post.price && post.price > 0 && (
					<div className="px-2 text-xs py-1 bg-yellow-300 text-center leading-3 text-black rounded-full font-bold">
						{post.price} ar
					</div>
				)}
				<div className={`flex flex-wrap items-center ${showDate ? "justify-center" : "justify-around"}`}>
					{post.tags && post.tags.map(tag => (
						<span className="twitter-bg mr-1 px-2 py-1 text-black mb-1 leading-3 rounded-full" key={tag.id}>{tag.name}</span>
					))}
				</div>
			</div>
		</div>
	)
}

export default PostGridItem
