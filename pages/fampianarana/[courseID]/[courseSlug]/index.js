import axios from 'axios';
import React from 'react';
import ChaptersGroup from '../../../../_components/front/ChaptersGroup';
import { REVALIDATE } from '../../../../_constants/nextConstants';
import { API_URL } from '../../../../_constants/URLs';
import { useRouter } from "next/router";

export default function ViewCourse({ course = [] }) {
	// console.log(course === undefined);

	// V A R I A B L E S
	const router = useRouter();
	if (router.isFallback) return <div className="text-4xl font-bold tracking-widest h-full flex justify-center items-center">Vetivety ...</div>;

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
				<div className="flex justify-center md:col-span-1 relative">
					<img src={course.image_cover} alt={course.slug} className="max-w-full rounded-xl" />
					<div className="absolute bottom-1 left-0">
						{course && course.tags && course.tags.map(tag => (
							<span key={tag.id} className="bg-black text-xs font-semibold tracking-widest mx-1 px-2 py-1 rounded-full">{tag.name}</span>
						))}
					</div>
				</div>
				<div className="col-span-2 md:flex flex-col justify-between">
					<div className="flex-1">
						<h1 className="font-bold text-lg sm:text-2xl tracking-widest mb-3 sm:mb-4">
							{course.title}
						</h1>
						<p className="text-sm md:text-base mb-8">{course.description}</p>
					</div>
					<div className="ml-8">
						{course.price > 0 && <span className="px-2 py-1 rounded-full twitter-bg twitter-bg-hover transition-colors duration-300 border-2 border-dotted border-transparent hover:border-white ease-in-out font-bold tracking-widest cursor-pointer">Hividy</span>}
					</div>
				</div>
			</div>

			<div className={`px-4 sm:px-8 my-3 md:my-4 ${chaptersGroups.length === 1 ? "md:mx-20 xl:mx-40" : ""}`}>
				<h3
					className={`text-2xl font-semibold tracking-widest mb-3 md:mb-4 ${(chaptersGroups && chaptersGroups.length === 1) ? "text-center md:text-left md:ml-32" : "text-center"}`}
					title="List of all chapters"
				>
					Ireo toko
				</h3>

				{chaptersGroups && chaptersGroups.length > 1 && (
					<div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8">
						{chaptersGroups.map(group => <ChaptersGroup course={course} key={group.id} group={group} />)}
					</div>
				)}
				{chaptersGroups && chaptersGroups.length === 1 && chaptersGroups.map(
					group => <ChaptersGroup course={course} key={group.id} group={group} />
				)}
			</div>
		</div>
	)
}

export async function getStaticPaths() {

	const response = await axios.get(`${API_URL}/courses?published`);

	const { courses } = response.data;
	const paths = courses.map(course => ({ params: { courseID: course.id.toString(), courseSlug: course.slug } }));

	return {
		paths,
		fallback: true
	}
}

export async function getStaticProps({ params }) {
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
			revalidate: REVALIDATE
		}
	} catch (error) {
		return {
			notFound: true
		};
	}
}