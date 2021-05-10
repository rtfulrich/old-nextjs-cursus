import axios from 'axios';
import React from 'react';
import { API_URL } from '../../../../_constants/URLs';
import PostGridItem from '../../../../_components/front/PostGridItem';
import Payment from '../../../../_components/front/modals/Payment';
import { useRouter } from "next/router";

export default function ViewCourse({ course }) {

	// S T A T E S
	// const [hasTheCourse, setHasTheCourse] = React.useState(course.price === "0");

	// V A R I A B L E
	const router = useRouter();
	const { courseID } = router.query;

	// M O U N T
	React.useEffect(() => {
		const timeout = setTimeout(() => {
			axios.put(`${API_URL}/course/${courseID}/increment-visits`);
		}, 1000 * 60); // 1 minute

		return () => clearTimeout(timeout);
	}, [courseID]);

	// V A R I A B L E S
	let chaptersGroups = course.chapters_groups || [];
	if (chaptersGroups.length !== 0) {
		chaptersGroups = chaptersGroups.sort((a, b) => {
			if (a.rank < b.rank) return -1;
			else if (a.rank > b.rank) return 1;
			return 0;
		});
		chaptersGroups.forEach(group => {
			group.chapters = group.chapters.sort((a, b) => {
				if (a.rank < b.rank) return -1;
				else if (a.rank > b.rank) return 1;
				return 0;
			});
		});
	}

	return (
		<div className="">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-4 bg45 p-4">
				<section className="md:col-span-1">
					<div className="relative">
						<img src={course.image_cover} alt={course.slug} className="max-w-full rounded-xl" />
						<div className="absolute bottom-1 right-2 font-bold tracking-widest text-black">
							{course.level}
						</div>
						<div className="absolute bottom-1 left-0">
							{course && course.tags && course.tags.map(tag => (
								<span key={tag.id} className="bg-black text-xs font-semibold tracking-widest mx-1 px-2 py-1 rounded-full">{tag.name}</span>
							))}
						</div>
					</div>
					{course.price > 0 && (
						<div className="flex justify-between font-bold text-black mt-2 mx-8">
							<div className="tracking-widest text-sm px-4 py-2 rounded-full bg-yellow-300">{course.price} ar</div>
							<Payment post={course} type={"COURSE"} />
						</div>
					)}
				</section>
				<section className="col-span-2 md:flex flex-col justify-between">
					<div className="flex-1">
						<h1 className="font-bold text-lg sm:text-2xl tracking-widest mb-3 sm:mb-4">
							{course.title}
						</h1>
						<p className="text-sm md:text-base mb-8 whitespace-pre-wrap">
							{course.description}
						</p>
					</div>
				</section>
			</div>

			<section className={`px-4 sm:px-8 my-3 md:mt-6 md:mb-4`}>
				{chaptersGroups && chaptersGroups.map(group => (
					<div key={group.id}>
						{chaptersGroups.length > 1 && group.show && (
							<h2 className="text-xl font-bold tracking-widest text-center bg33 rounded-full py-1 my-4">
								{group.title}
							</h2>
						)}
						<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
							{group.chapters.map(chapter => (
								<PostGridItem
									post={chapter} key={chapter.id} parent={course}
									url={`/fampianarana/${course.id}/${course.slug}/toko/${chapter.id}/${chapter.slug}`}
								/>
							))}
						</div>
					</div>
				))}
			</section>
		</div>
	)
}

// export async function getStaticPaths() {

// 	const response = await axios.get(`${API_URL}/courses?published`);

// 	const { courses } = response.data;
// 	const paths = [];
// 	courses.forEach(course => paths.push(
// 		{ params: { courseID: course.id.toString(), courseSlug: course.slug } }
// 	));

// 	return {
// 		paths,
// 		fallback: true
// 	}
// }

export async function getServerSideProps({ params }) {
	try {
		const response = await axios.get(`${API_URL}/course/${params.courseID}`);

		const { course } = response.data;

		return {
			props: {
				page: {
					title: course.title
				},
				course
			},
		};
	} catch (error) {
		return {
			notFound: true
		};
	}
}