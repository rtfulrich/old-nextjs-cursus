import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { FaArrowCircleRight, FaCheckSquare, FaSquare } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ChooseLfmImage from '../../../../../_components/admin/posts/fields/ChooseLfmImage';
import InputLabel from '../../../../../_components/admin/posts/fields/InputLabel';
import OptionSelect from '../../../../../_components/admin/posts/fields/OptionSelect';
import SelectLabel from '../../../../../_components/admin/posts/fields/SelectLabel';
import TextareaLabel from '../../../../../_components/admin/posts/fields/TextareaLabel';
import { ADMIN_API_URL, BACK_URL, FRONT_ADMIN_URL, FRONT_URL } from '../../../../../_constants/URLs';
import sanctumRequest from '../../../../../_helpers/sanctumRequest';

export default function EditABlog({ blog, tags }) {

	// S T A T E S
	const [errors, setErrors] = React.useState({
		title: null, video_url: null, video_duration: null, image_cover: null, tag: null
	});

	// V A R I A B L E S
	const router = useRouter();

	// R E F S
	const titleRef = React.useRef();
	const videoUrlRef = React.useRef();
	const videoDurationRef = React.useRef();
	const imageCoverRef = React.useRef();
	const descriptionRef = React.useRef();
	const tagRef = React.useRef();

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

	const handleAttachTag = () => sanctumRequest(
		async () => {
			const tagID = parseInt(tagRef.current.value);
			if (isNaN(tagID)) return;
			const data = { tagID };
			const response = await axios.put(`${ADMIN_API_URL}/blog/${blog.id}/attach-a-tag`, data);
			const { message } = response.data;
			router.push(`${FRONT_ADMIN_URL}/blog/${blog.id}/${blog.slug}`);
			toast.success(message);
		},
		(e) => {
			if (e.response?.status === 422) setErrors({ ...errors, tag: e.response.data.errors.tagID[0] });
		}
	);

	const handleDetachTag = (tag) => sanctumRequest(async () => {
		const confirmation = `Do you really want to detach the tag "${tag.name}" from this blog ?`;
		if (!confirm(confirmation)) return;
		await axios.delete(`${ADMIN_API_URL}/blog/${blog.id}/detach-a-tag/${tag.id}`);
		router.push(`${FRONT_ADMIN_URL}/blog/${blog.id}/${blog.slug}`);
	});

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

					<div className="mb-4">
						<div className="rounded-2xl bg45 pt-1 px-1 font-semibold flex items-center flex-wrap">
							{blog.tags.length === 0 && "NO TAGS YET"}
							{blog.tags.map(tag => (
								<span key={tag.id} className="px-2 pt-1 pb-2 bg-black rounded-full text-xs mr-1 mb-1">
									{tag.name} <span className="font-bold twitter">({tag.times_its_used})</span>
									<span className="bg-red-500 hover:bg-red-600 px-2 pb-1 rounded-full cursor-pointer ml-2" onClick={() => handleDetachTag(tag)}>x</span>
								</span>
							))}
						</div>
						{tags.length > 0 && <div className="mt-2">
							<div className="flex justify-between items-end">
								<SelectLabel fieldRef={tagRef} errorNeeds={[errors, setErrors, "tag"]} label="New tag for this blog" className="flex-1 mr-2" id="blog_tag" text="Select a tag">
									{
										tags.map(tag => <OptionSelect key={tag.id} value={tag.id}>{tag.name} ({tag.times_its_used})</OptionSelect>)
									}
								</SelectLabel>
								<button type="button" className="py-1 rounded-lg px-2 bg-blue-500 hover:bg-blue-600 font-bold tracking-widest float-right" onClick={handleAttachTag}>Add Tag</button>
							</div>
						</div>}
					</div>

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
		const { blog, tags } = response.data;
		return {
			props: {
				page: {
					title: blog.title
				},
				blog,
				tags
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
