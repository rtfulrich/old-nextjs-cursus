import axios from 'axios'
import Link from 'next/link';
import React from 'react'
import { FaMoneyBill } from 'react-icons/fa';
import { API_URL } from '../../_constants/URLs'
import { useRouter } from "next/router";

function ViewAllCourses({ result }) {
	// console.log("result", result);

	const router = useRouter();

	const courses = result.data;
	const links = result.links;

	const { page } = router.query;
	return (
		<div className="px-4 py-3 md:px-8 md:-py-4">
			<div className="flex justify-between flex-col lg:flex-row items-center mb-4">
				<h1 className={`text-3xl tracking-widest font-bold md:mb-0`}>
					Ireo fampianarana farany {page ? `- Pejy ${page}` : ""}
				</h1>
			</div>

			{/* List of courses */}
			<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
				{
					courses.map(course => (
						<div key={course.id} className="bg45 bg-opacity-10 rounded-xl overflow-hidden relative border-2 border-black hover:border-blue-500 flex flex-col">
							<div className="h-40 flex justify-center items-center overflow-hidden">
								<img src={course.image_cover} className="min-h-full min-w-full w-auto" />
							</div>
							<div className="my-2 px-2 flex-1 flex flex-col justify-between">
								<h1 className="font-bold mb-2">
									<Link href={`/fampianarana/${course.id}/${course.slug}`}>
										<a className="hover:text-blue-500 text-sm sm:text-base lg:text-sm xl:text-base" style={{ textDecoration: "none" }}>{course.title}</a>
									</Link>
								</h1>
								<div className={`flex items-center ${course.price > 0 && course.tags.length > 0 ? "justify-between" : "justify-end"}`}>
									{course.price > 0 && <div className="px-2 text-xs bg-yellow-300 text-black rounded-full font-semibold sm:font-bold tracking-widest">
										{course.price} ar
                  </div>}
									<div>
										{course.tags.map(tag => (
											<span className="mr-1 px-2 text-xs font-semibold py-1 bg-black mb-1 tracking-widest rounded-full" key={tag.id}>{tag.name}</span>
										))}
									</div>
								</div>
							</div>
							{/* if course is not free */}
							{
								course.price > 0 && (<>
									<span className="absolute top-1 left-2 transform -rotate-45 z-10"><FaMoneyBill /></span>
									<div className="absolute -top-2 -left-6 transform -rotate-45 success-bg w-16 h-9"></div>
								</>)
							}
						</div>
					))
				}
			</div>
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

export default ViewAllCourses

export const getServerSideProps = async ({ query }) => {
	try {
		let page = null;
		if (query.page) page = query.page;
		const response = await axios.get(`${API_URL}/courses/paginated?${page ? `&page=${page}` : ""}`);
		const { result } = response.data;

		return {
			props: {
				page: {
					title: "Ireo fampianarana farany",
				},
				result
			}
		}
	} catch (error) {
		return {
			redirect: {
				destination: "/fampianarana",
				permanent: true
			}
		};
	}
}