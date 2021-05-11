import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { API_URL } from '../../_constants/URLs';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa"
import PostGridItem from '../../_components/front/PostGridItem';

function ViewAllTutorials({ result }) {

	const router = useRouter();

	const tutorials = result.data;
	const links = result.links;

	let prevUrl = links[0].url;
	let nextUrl = links[links.length - 1].url;
	if (prevUrl) {
		let page = parseInt(prevUrl.split("page=")[1]);
		prevUrl = `/tutorials${page === 1 ? "" : `?page=${page}`}`;
	}
	if (nextUrl) {
		let page = parseInt(nextUrl.split("page=")[1]);
		nextUrl = `/tutorials?page=${page}`;
	}

	const { page } = router.query;
	return (
		<div className="px-4 py-3 md:px-8 md:-py-4">
			<div className="flex justify-between flex-col lg:flex-row items-center mb-4">
				<h1 className={`text-3xl tracking-widest font-bold md:mb-0`}>
					Ireo tutorials farany {page ? `- Pejy ${page}` : ""}
				</h1>
			</div>

			{/* List of tutorials */}
			<section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
				{tutorials.map((tutorial, index) => (
					<PostGridItem post={tutorial} url={`/tutorial/${tutorial.id}/${tutorial.slug}`} key={index} />
				))}
			</section>

			{/* Pagination buttons */}
			{links.length > 3 && <div className="flex justify-between mt-4">
				{prevUrl
					? <Link href={prevUrl}>
						<a className={`px-2 mx-1 rounded-lg border-2 font-bold text-white border-blue-500 hover:bg-blue-500 flex items-center`} style={{ textDecoration: "none" }}>
							<FaArrowAltCircleLeft className="mr-3" /> <span>Vaovao</span>
						</a>
					</Link>
					: <span className="font-bold px-2 tracking-widest cursor-not-allowed text-center rounded-lg text-black bg-gray-300 bg-opacity-70 mx-1 flex items-center">
						<FaArrowAltCircleLeft className="mr-3" /> <span>Vaovao</span>
					</span>
				}
				{nextUrl
					? <Link href={nextUrl}>
						<a className={`px-2 mx-1 rounded-lg border-2 font-bold text-white border-blue-500 hover:bg-blue-500 flex items-center`} style={{ textDecoration: "none" }}>
							<span>Taloha</span> <FaArrowAltCircleRight className="ml-3" />
						</a>
					</Link>
					: <span className="font-bold px-2 tracking-widest cursor-not-allowed text-center rounded-lg text-black bg-gray-300 bg-opacity-70 mx-1 flex items-center">
						<span>Taloha</span> <FaArrowAltCircleRight className="ml-3" />
					</span>
				}

			</div>}
		</div>
	)
}

export default ViewAllTutorials

export const getServerSideProps = async ({ query }) => {
	try {
		let page = null;
		if (query.page) page = query.page;
		const response = await axios.get(`${API_URL}/tutorials/paginated?${page ? `&page=${page}` : ""}`);
		const { result } = response.data;

		return {
			props: {
				page: {
					title: "Ireo tutorials farany",
					metaDescription: "Lisitr'ireo tutorials misy ato amy IanaTek",
				},
				result
			}
		}
	} catch (error) {
		return {
			redirect: {
				destination: "/tutorials",
				permanent: true
			}
		};
	}
}
