import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import PostGridItem from '../../_components/front/PostGridItem';
import { REVALIDATE } from '../../_constants/nextConstants';
import { technologies } from '../../_constants/techs'
import { API_URL } from '../../_constants/URLs'

function TagSearchPage({ results }) {
	console.log(results);

	// S T A T E S
	const [posts, setPosts] = React.useState([]);
	const [page, setPage] = React.useState(1);
	const [hasNextPage, setHasNextPage] = React.useState(true);

	// V A R I A B L E S
	const router = useRouter();
	const tagName = router.query.tag;
	const COURSE = "App\\Models\\Course";
	const CHALLENGE = "App\\Models\\Challenge";
	const TUTORIAL = "App\\Models\\Tutorial";
	const BLOG = "App\\Models\\Blog";

	// M O U N T
	React.useEffect(() => {
		const { courses, challenges, tutorials, blogs } = results;
		const allPosts = [...courses.data, ...challenges, ...tutorials, ...blogs];
		setHasNextPage(allPosts.length !== 0);
		setPosts(allPosts.sort((a, b) => a.updated_at > b.updated_at ? -1 : 1));
	}, [tagName]);

	// E F F E C T on [page]
	React.useEffect(async () => {
		const query = page > 1 ? `?page=${page}` : "";
		const response = await axios.get(`${API_URL}/get-posts-for-tag/${router.query.tag}${query}`);
		const { results } = response.data;
		const { courses, challenges, tutorials, blogs } = results;
		const allPosts = [...courses.data, ...challenges, ...tutorials, ...blogs];
		setHasNextPage(allPosts.length !== 0);
		setPosts(allPosts.sort((a, b) => a.updated_at > b.updated_at ? -1 : 1));
	}, [page]);

	// E F F E C T on [hasNextPage]
	React.useEffect(() => {
		if (hasNextPage === false) setPage(page - 1);
	}, [hasNextPage]);

	// J S X
	console.log("posts", posts);
	return (
		<div className="px-4 py-3 md:px-8 md:-py-4">
			<h1 className={`text-3xl tracking-widest font-bold md:mb-0`}>
				Ireo posts rehetra momban'ny <strong>{router.query.tag}</strong>
			</h1>
			<section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 my-8">
				{posts.map(post => {
					let type = "";
					let showDate = false;
					if (post.pivot.taggable_type === COURSE) type = "fampianarana";
					else if (post.pivot.taggable_type === CHALLENGE) type = "challenge";
					else if (post.pivot.taggable_type === TUTORIAL) {
						type = "tutorial";
						showDate = true;
					}
					else if (post.pivot.taggable_type === BLOG) {
						type = "blog";
						showDate = true;
					}
					else throw new TypeError("Type error exception for post type");

					return (
						<PostGridItem post={post} url={`/${type}/${post.id}/${post.slug}`} showDate={showDate} key={Math.random()} />
					);
				})}
			</section>
			<div className="flex items-center justify-between">
				<button
					className={`px-2 py-1 ${page > 1 ? "success-bg success-bg-hover text-black" : "bg-gray-500 cursor-not-allowed"} font-bold tracking-widest rounded-xl flex items-center`}
					onClick={() => setPage(page === 1 ? page : page - 1)}
				>
					<FaArrowLeft className="mr-4" /> Vaovao
				</button>
				<button
					className={`px-2 py-1 ${hasNextPage ? "success-bg success-bg-hover text-black" : "bg-gray-500 cursor-not-allowed"} font-bold tracking-widest rounded-xl flex items-center`}
					onClick={e => hasNextPage ? setPage(page + 1) : e.preventDefault()}
				>
					Taloha <FaArrowRight className="ml-4" />
				</button>
			</div>
		</div>
	)
}

export default TagSearchPage

export async function getStaticPaths() {
	const paths = [];
	technologies.forEach(tech => paths.push({ params: { tag: tech.tag } }));
	return {
		fallback: true,
		paths
	};
}

export async function getStaticProps({ params }) {
	try {
		const response = await axios.get(`${API_URL}/get-posts-for-tag/${params.tag}`);
		const { results } = response.data;
		return {
			props: {
				page: {
					title: `Tag <${params.tag}>`
				},
				results
			},
			revalidate: REVALIDATE,
		};
	} catch (error) {
		console.log("error", error, error.response);
		return { notFound: true };
	}
}
