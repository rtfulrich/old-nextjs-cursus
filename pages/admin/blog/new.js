import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react'
import { toast } from 'react-toastify';
import ChooseLfmImage from '../../../_components/admin/posts/fields/ChooseLfmImage';
import InputLabel from '../../../_components/admin/posts/fields/InputLabel';
import TextareaLabel from '../../../_components/admin/posts/fields/TextareaLabel';
import { ADMIN_API_URL, BACK_URL } from '../../../_constants/URLs';
import sanctumRequest from '../../../_helpers/sanctumRequest';

export default function NewBlog() {

	// V A R I A B L E S
	const router = useRouter();

	// S T A T E S
	const [errors, setErrors] = React.useState({
		title: null, video_url: null, video_duration: null, image_cover: null
	});

	// R E F S
	const titleRef = React.useRef();
	const videoUrlRef = React.useRef();
	const videoDurationRef = React.useRef();
	const imageCoverRef = React.useRef();
	const descriptionRef = React.useRef();

	// M E T H O D S
	const handleSubmit = () => sanctumRequest(
		async () => {
			setErrors({ title: null, video_url: null, video_duration: null, image_cover: null });

			const title = titleRef.current.value;
			const image_cover = imageCoverRef.current.value;
			const video_url = videoUrlRef.current.value;
			const video_duration = videoDurationRef.current.value;
			const description = descriptionRef.current.value;

			const data = { title, image_cover, video_url, video_duration, description };
			const response = await axios.post(`${ADMIN_API_URL}/blog/store`, data);
			const { message, blog } = response.data;
			router.push(`/admin/blog/${blog.id}/${blog.slug}`);
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

	// J S X
	return (
		<div className="p-4">
			{/* <div className="flex justify-between items-center pb-4"> */}
			<h1 className="text-2xl md:text-4xl tracking-widest font-bold mb-4">Create a new blog</h1>
			{/* </div> */}

			<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
				{/* Column 1 */}
				<div className="flex flex-col">
					<InputLabel fieldRef={titleRef} label="Title" id="blog_title" errorNeeds={[errors, setErrors, "title"]} className="mb-3">
						Title of the blog
          </InputLabel>
					<InputLabel fieldRef={videoUrlRef} label="Video URL" id="blog_video_url" errorNeeds={[errors, setErrors, "video_url"]} className="mb-3">
						Video URL for the blog
          </InputLabel>
					<InputLabel fieldRef={videoDurationRef} label="Video duration" id="blog_video_duration" errorNeeds={[errors, setErrors, "video_duration"]} className="mb-3">
						Duration of the video
          </InputLabel>
					<button className="py-2 flex-1 text-center font-bold text-3xl bg-blue-500 hover:bg-blue-600 transition-colors duration-150 w-full rounded-lg tracking-widest" type="button" onClick={handleSubmit}>
						Create the blog
          </button>
				</div>
				{/* Column 2 */}
				<div>
					<TextareaLabel fieldRef={descriptionRef} id="blog_description" rows="21" label="Description">
						Description of the blog
          </TextareaLabel>
				</div>
				{/* Column 3 */}
				<div>
					<ChooseLfmImage fieldRef={imageCoverRef} id="blog_image_cover" errorNeeds={[errors, setErrors, "image_cover"]} defaultValue={BACK_URL + "/images/post-cover.png"} />
				</div>
			</div>
		</div>
	)
}

export async function getServerSideProps({ req }) {
	return {
		props: {
			page: {
				title: "Create a new challenge"
			}
		}
	}
}
