import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import PostContent from '../../../../../_components/front/PostContent';
import { ADMIN_API_URL, FRONT_URL } from '../../../../../_constants/URLs';

export default function PreviewTutorialContent({ tutorial }) {
	// console.log("tutorial", tutorial);

	// V A R I A B L E S
	const router = useRouter();

	return (
		<div className="p-4 relative flex justify-center">
			<div className="w-full md:w-2/3">
				<PostContent content={tutorial.content} />
				<Link href={`/admin/tutorial/${tutorial.id}/${tutorial.slug}`}>
					<a className="absolute top-0 right-0 px-2 py-1 font-bold flex items-center border-2 border-yellow-300 text-yellow-300 hover:text-yellow-400" style={{ textDecoration: "none" }}>
						<FaArrowLeft /> <span>Go back</span>
					</a>
				</Link>
			</div>
		</div>
	)
}

export async function getServerSideProps({ params, req }) {
	try {
		const response = await axios.get(`${ADMIN_API_URL}/tutorial/${params.id}/${params.slug}`, {
			headers: { credentials: "include", referer: FRONT_URL, cookie: req.headers.cookie }
		});
		const { tutorial } = response.data;
		return {
			props: {
				page: {
					title: `Preview - ${tutorial.title}`
				},
				tutorial
			}
		}
	} catch (error) {
		return {
			props: {
				notFound: true
			}
		}
	}
}
