import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FaLock } from 'react-icons/fa';
import { API_URL } from '../../_constants/URLs';
import UserContext from '../../_react-contexts/user-context';
import sanctumRequest from "../../_helpers/sanctumRequest";

function ChapterAside({ chapter }) {

	const router = useRouter();
	const [canBeSeen, setCanBeSeen] = React.useState(null);

	const { user } = React.useContext(UserContext);

	React.useEffect(() => sanctumRequest(
		async () => {
			const response = await axios.get(`${API_URL}/check-can-see-chapter/${chapter.id}`);
			setCanBeSeen(response.data.can);
		}
	), [user]);

	// J S X
	const matched = !!router.asPath.match(`${chapter.slug}`);
	const url = `/fampianarana/${router.query.courseID}/${router.query.courseSlug}/toko/${chapter.id}/${chapter.slug}`;
	return (
		<div
			className={`flex items-center transition-all duration-300 ease-in-out px-1 my-1 cursor-pointer ${matched ? "success-bg" : `${canBeSeen ? "hover:bg-gray-300 hover:text-black" : "hover:text-red-400"}`}`}
			key={chapter.id} title={matched ? "Efa io amy pejy io !" : (canBeSeen ? "" : "Hoan zay nividy ihany !")}
		>
			<div className={`w-6`}>{chapter.rank}</div>
			<div className="flex-1">
				<h2 className="text-xs font-bold my-2">
					{matched || !canBeSeen
						? chapter.title
						: <Link href={url}>
							<a className="inline-block h-full w-full">{chapter.title}</a>
						</Link>
					}
				</h2>
			</div>
			{canBeSeen === false && <div className="w-2 text-center text-xs text-red-500"><FaLock /></div>}
		</div>
	)
}

export default ChapterAside
