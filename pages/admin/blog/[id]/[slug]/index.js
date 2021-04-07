import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { FaArrowCircleRight, FaCheckSquare, FaSquare } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ChooseLfmImage from '../../../../../_components/admin/posts/fields/ChooseLfmImage';
import InputLabel from '../../../../../_components/admin/posts/fields/InputLabel';
import TextareaLabel from '../../../../../_components/admin/posts/fields/TextareaLabel';
import { ADMIN_API_URL, BACK_URL, FRONT_URL } from '../../../../../_constants/URLs';
import sanctumRequest from '../../../../../_helpers/sanctumRequest';

export default function EditABlog({ blog }) {
	// console.log("blog", blog);

	// S T A T E S
	const [errors, setErrors] = React.useState({
		title: null, video_url: null, video_duration: null, image_cover: null
	});

	// V A R I A B L E S
	const router = useRouter();

	// R E F S
	const titleRef = React.useRef();
	const videoUrlRef = React.useRef();
	const videoDurationRef = React.useRef();
	const imageCoverRef = React.useRef();
	const descriptionRef = React.useRef();

	// M E T H O D S
	const handlePublish = () => sanctumRequest(async () => {
		await axios.put(`${ADMIN_API_URL}/blog/update/${blog.id}`, { published: !blog.published });
		router.replace(`/admin/blog/${blog.id}/${blog.slug}`);
	});

	const handleSubmit = () => sanctumRequest(
		async () => {
			setErrors({ title: null, video_url: null, video_duration: null, image_cover: null });

			const title = titleRef.current.value;
			const video_url = videoUrlRef.current.value;
			const video_duration = videoDurationRef.current.value;
			const image_cover = imageCoverRef.current.value;
			const description = descriptionRef.current.value;
			const data = { title, video_url, video_duration, image_cover, description };

			const response = await axios.put(`${ADMIN_API_URL}/blog/update/${blog.id}`, data);
			const { message, newBlog } = response.data;
			router.replace(`/admin/blog/${newBlog.id}/${newBlog.slug}`);
			toast.success(message);
		},
		e => {
			const { errors } = e.response.data;
			if (errors.title) setErrors({ ...errors, title: errors.title[0] });
			if (errors.image_cover) setErrors({ ...errors, image_cover: errors.image_cover[0] });
			if (errors.video_url) setErrors({ ...errors, video_url: errors.video_url[0] });
			if (errors.video_duration) setErrors({ ...errors, video_duration: errors.video_duration[0] });
		}
	);

	return (
		<div className="p-4">
			<div className="flex justify-between flex-col lg:flex-row items-center mb-4">
				<h1 className={`text-3xl tracking-widest font-bold mb-3 md:mb-0 ${blog.published ? "success" : "text-yellow-300"}`}>
					<Link href={`/admin/blog/${blog.id}/${blog.slug}/preview-content`}>
						<a>{blog.title}</a>
					</Link>
				</h1>
				<div className="flex">
					<span
						className={`px-3 py-2 mr-2 md:text-sm rounded-lg border-2 flex items-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-30 font-bold tracking-widest transition-colors duration-150 ${blog.published ? "border-success success" : "border-yellow-300 text-yellow-300"}`}
						onClick={handlePublish}
					>
						{blog.published ? (<><FaCheckSquare className="mr-2" /> Unpublish</>) : (<><FaSquare className="mr-2" /> Publish</>)} it ?
          </span>
					<Link href={`${BACK_URL}/admin/blog/${blog.id}/${blog.slug}/edit-content`}>
						<a className={`px-3 py-2 md:text-sm rounded-lg border-2 flex items-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-30 font-bold tracking-widest transition-colors duration-150 border-blue-500 text-blue-500 hover:text-blue-500 mx-2`} style={{ textDecoration: "none" }} target="_blank">
							Edit the content <FaArrowCircleRight className="ml-2" />
						</a>
					</Link>
					<span
						className={`px-3 py-2 md:text-sm rounded-lg border-2 flex items-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-30 font-bold tracking-widest transition-colors duration-150 border-blue-500 text-blue-500 text-center`}
					>
						Visits <br />{blog.views}
					</span>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
				{/* Column 1 */}
				<div className="flex flex-col">
					<InputLabel fieldRef={titleRef} label="Title" id="blog_title" errorNeeds={[errors, setErrors, "title"]} className="mb-3" defaultValue={blog.title}>
						Title of the blog
          </InputLabel>
					<InputLabel fieldRef={videoUrlRef} label="Video URL" id="blog_video_url" errorNeeds={[errors, setErrors, "video_url"]} className="mb-3" defaultValue={blog.video.url}>
						Video URL for the blog
          </InputLabel>
					<InputLabel fieldRef={videoDurationRef} label="Video duration" id="blog_video_duration" errorNeeds={[errors, setErrors, "video_duration"]} className="mb-3" defaultValue={blog.video.duration}>
						Duration of the video
          </InputLabel>
					<button className="py-2 flex-1 text-center font-bold text-3xl bg-blue-500 hover:bg-blue-600 transition-colors duration-150 w-full rounded-lg tracking-widest" type="button" onClick={handleSubmit}>
						Update the blog
          </button>
				</div>
				{/* Column 2 */}
				<div>
					<TextareaLabel fieldRef={descriptionRef} id="blog_description" rows="21" label="Description" defaultValue={blog.description}>
						Description of the blog
          </TextareaLabel>
				</div>
				{/* Column 3 */}
				<div>
					<ChooseLfmImage fieldRef={imageCoverRef} id="blog_image_cover" errorNeeds={[errors, setErrors, "image_cover"]} defaultValue={blog.image_cover} />
				</div>
			</div>
		</div>
	)
}

export async function getServerSideProps({ params, req }) {
	try {
		const response = await axios.get(`${ADMIN_API_URL}/blog/${params.id}/${params.slug}`, {
			headers: { credentials: "include", referer: FRONT_URL, cookie: req.headers.cookie }
		});
		const { blog } = response.data;
		return {
			props: {
				page: {
					title: blog.title
				},
				blog
			}
		}
	} catch (error) {
		return {
			props: {
				page: {
					title: "An error occured",
				},
				notFound: true
			}
		}
	}
}
