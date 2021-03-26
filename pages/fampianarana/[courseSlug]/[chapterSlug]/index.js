import axios from 'axios';
import React from 'react'
import ReactPlayer from 'react-player';
import { REVALIDATE } from '../../../../_constants/nextConstants';
import { API_URL } from '../../../../_constants/URLs';
import PostContent from "../../../../_components/front/PostContent";
import { useRouter } from 'next/router';
import Link from "next/link";

export default function ViewFreeChapter({ chapter, groups = [], unauthorized }) {
	// if (chapter) console.log("chapter", chapter);

	if (groups) {
		groups = groups.sort((a, b) => {
			if (a.rank < b.rank) return -1;
			else if (a.rank === b.rank) return 0;
			else return 1;
		});
		groups.forEach(group => {
			group.chapters = group.chapters.sort((a, b) => {
				if (a.rank < b.rank) return -1;
				else if (a.rank === b.rank) return 0;
				else return 1;
			});
		})
		// console.log(groups);
	}

	const router = useRouter();

	// M O U N T  E F F E C T
	React.useEffect(() => {
		if (unauthorized) router.replace(unauthorized.redirect);
		/* ------------------------------------------------------ */
	}, []);

	if (unauthorized) return <div className="text-4xl h-full flex justify-center items-center font-bold tracking-widest">Redirecting ...</div>

	const videoURL = chapter?.video.url;
	const videoDuration = chapter?.video.duration;
	return (
		<div className="px-4 md:pl-8 md:pr-2">
			<div className="my-8 grid grid-cols-12 gap-4 relative">
				<div className="col-span-12 md:col-span-9">
					{videoURL && <div className="flex justify-center mb-8 bg-gray-300">
						<ReactPlayer url={videoURL} />
					</div>}
					<div>
						<PostContent content={chapter?.content} />
					</div>
				</div>
				<div className="hidden md:block md:col-span-3">

					{groups.map(group => (
						<div key={group.id} className="mb-2">
							<h3 className="py-1 twitter-bg font-bold text-center text-black">{group.title}</h3>
							<div>
								{group.chapters.map(chapter => {
									const matched = !!router.asPath.match(chapter.slug);
									const { canBeSeen } = chapter;
									// console.log(chapter.title, canBeSeen);
									const { courseSlug } = router.query;
									return (
										<div
											className={`flex items-center transition-all duration-200 ease-in-out px-1 my-1 cursor-pointer ${matched ? "success-bg" : `${canBeSeen ? "hover:bg-gray-300 hover:text-black" : "hover:text-red-400"}`}`}
											key={chapter.id} title={matched ? "Efa io amy pejy io !" : (canBeSeen ? "" : "Hoan zay nividy ihany !")}
										>
											<div className={`w-6 ${!canBeSeen ? "text-red-500" : ""}`}>{chapter.rank}</div>
											<div className="flex-1">
												<h2 className="text-xs font-bold">
													{matched || !canBeSeen
														? chapter.title
														: <Link href={`/fampianarana/${courseSlug}/${chapter.slug}`}>
															<a className="inline-block h-full w-full">{chapter.title}</a>
														</Link>
													}
												</h2>
											</div>
										</div>
									)
								})}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)

}

export async function getStaticPaths() {
	const response = await axios.get(`${API_URL}/courses?published=true&with-chapters`);

	const { courses } = response.data;
	// console.log(courses);
	let paths = [];
	courses.forEach(course => {
		const groups = course.chapters_groups;
		groups.forEach(group => {
			const chapters = group.chapters;
			chapters.forEach(chapter => {
				paths.push({
					params: {
						courseSlug: course.slug,
						chapterSlug: chapter.slug
					}
				});
			});
		});
	});
	// console.log("p", paths);
	return {
		paths,
		fallback: true
	};
}

export async function getStaticProps({ params }) {
	try {
		const response = await axios.get(`${API_URL}/course/${params.courseSlug}/chapter/${params.chapterSlug}`);
		const { chapter, groups } = response.data;

		return {
			props: {
				page: {
					title: chapter.title
				},
				chapter,
				groups
			},
			revalidate: REVALIDATE
		}
	}
	catch (e) {
		return e.response.status === 403
			? {
				props: {
					page: {
						title: "Redirecting ... - IanaTek"
					},
					unauthorized: { redirect: `/fampianarana/${params.courseSlug}` }
				}
			}
			: {
				props: {
					page: {
						title: "Pejy tsy tazana - IanaTek"
					},
				},
				notFound: true
			}
	}
}
