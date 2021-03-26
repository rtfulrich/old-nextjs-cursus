import axios from 'axios';
import Link from 'next/link'
import React from 'react'
import { toast } from 'react-toastify';
import { API_URL } from '../../_constants/URLs';
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
	React.useEffect(() => {
		// console.log("user", user);
		if (user) axios
			.get(`${API_URL}/check-can-see-chapter/${chapter.id}`)
			.then(response => setCanSeeChapter(response.data.can))
			.catch(e => console.clear());
	}, [user]);

	const href = `/fampianarana/${course.slug}/${chapter.slug}${isPrem ? "/premium" : ""}`;
	const preventToast = <span className="text-black font-semibold">Tsy afaka mijery io toko io enao !</span>;
	return (
		// <div className="">
		<h2 className={`font-bold flex items-center mb-3 md:mb-2 hover:text-blue-400 tracking-widest md:text-xl`}>
			{/* <span className="w-8 md:w-10 inline-block">{isPrem && <FaLock className="text-red-500 text-xs" />}</span> */}
			<span className={`w-8 md:w-10 text-xs inline-block ${canSeeChapter ? "success" : "text-red-500"}`}>
				{chapter.rank}
			</span>
			{canSeeChapter
				? <Link href={href}>
					<a style={{ textDecoration: "none" }}>
						{chapter.title}
					</a>
				</Link>
				: <span className="cursor-pointer" onClick={() => toast.info(preventToast)}>
					{chapter.title}
				</span>
			}
		</h2>
		// </div>
	)
}

export default Chapter