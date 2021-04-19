import axios from 'axios';
import Link from 'next/link'
import React from 'react'
import { FaCheck, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { API_URL } from '../../_constants/URLs';
import sanctumRequest from '../../_helpers/sanctumRequest';
import UserContext from "../../_react-contexts/user-context";

function Chapter({ chapter, course }) {

	// S T A T E 
	const { user } = React.useContext(UserContext);
	const [canSeeChapter, setCanSeeChapter] = React.useState(false);

	// V A R I A B L E
	const isPrem = course.price > 0 && chapter.show_anyway === false;

	// M O U N T  E F F E C T
	React.useEffect(() => setCanSeeChapter(!isPrem), []);

	// user  E F F E C T
	React.useEffect(() => sanctumRequest(
		async () => {
			if (user) {
				const response = await axios.get(`${API_URL}/check-can-see-chapter/${chapter.id}`);
				setCanSeeChapter(response.data.can);
			}
			else setCanSeeChapter(!isPrem);
		}
	), [user]);

	const href = `/fampianarana/${course.id}/${course.slug}/toko/${chapter.id}/${chapter.slug}${isPrem ? "/premium" : ""}`;
	const preventToast = <span className="text-black font-semibold">Tsy afaka mijery io toko io enao !</span>;
	return (
		// <div className="">
		<h2 className={`font-bold flex items-center mb-3 md:mb-2 hover:text-blue-400 tracking-widest`}>
			{/* <span className="w-8 md:w-10 inline-block">{isPrem && <FaLock className="text-red-500 text-xs" />}</span> */}
			<span className={`w-8 md:w-10 text-xs inline-block`}>
				{chapter.rank}
			</span>
			{canSeeChapter
				? <Link href={href}>
					<a style={{ textDecoration: "none" }} className="flex items-center">
						{chapter.title} <span className="ml-4 text-xs success"><FaCheck /></span>
					</a>
				</Link>
				: <span className="cursor-pointer flex items-center" onClick={() => toast.info(preventToast)}>
					{chapter.title} <span className="ml-4 text-red-400 text-xs"><FaLock /></span>
				</span>
			}
		</h2>
		// </div>
	)
}

export default Chapter
