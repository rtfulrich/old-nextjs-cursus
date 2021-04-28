import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { FaMoneyBill } from 'react-icons/fa';
import PostGridItem from '../../_components/front/PostGridItem';
import { API_URL } from '../../_constants/URLs';

function ViewAllChallenges({ result }) {

	const router = useRouter();

	const challenges = result.data;
	const links = result.links;

	const { page } = router.query;
	return (
		<div className="px-4 py-3 md:px-8 md:-py-4">
			<div className="flex justify-between flex-col lg:flex-row items-center mb-4">
				<h1 className={`text-3xl tracking-widest font-bold md:mb-0`}>
					Ireo challenges farany {page ? `- Pejy ${page}` : ""}
				</h1>
			</div>

			{/* List of challenges */}
			<section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
				{
					challenges.map(challenge => (
						<PostGridItem post={challenge} url={`/challenge/${challenge.id}/${challenge.slug}`} key={challenge.id} />
					))
				}
			</section>
			{/* Pagination buttons */}
			{links.length > 3 && <div className="fixed bottom-0 right-0 p-1 bg-black bg-opacity-90">
				<div className="flex justify-around mt-4">
					{
						links.map((link, index) => {
							let { label, url, active } = link;

							let page = label;
							if (index === 0) {
								page = 1;
								label = "Prev";
							}
							else if (index === links.length - 1) {
								page = result.current_page + 1;
								label = "Next"
							}

							const button = url
								? (<Link href={page !== 1 ? `?page=${page}` : ""} key={index}>
									<a className={`px-2 mx-1 rounded-lg border-2 font-bold text-white border-blue-500 ${active ? "bg-blue-500" : "hover:bg-blue-600"}`} style={{ textDecoration: "none" }}>{label}</a>
								</Link>)
								: <span key={index} className="font-bold px-2 tracking-widest cursor-not-allowed text-center rounded-lg text-black bg-gray-300 mx-1">{label}</span>
							return button;
						})
					}
				</div>
			</div>}
		</div>
	)
}

export default ViewAllChallenges

export const getServerSideProps = async ({ query }) => {
	try {
		let page = null;
		if (query.page) page = query.page;
		const response = await axios.get(`${API_URL}/challenges/paginated?${page ? `&page=${page}` : ""}`);
		const { result } = response.data;

		return {
			props: {
				page: {
					title: "Ireo challenges farany",
				},
				result
			}
		}
	} catch (error) {
		return {
			redirect: {
				destination: "/challenges",
				permanent: true
			}
		};
	}
}
