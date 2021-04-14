import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FaLock } from 'react-icons/fa';
import { API_URL } from '../../_constants/URLs';
import UserContext from '../../_react-contexts/user-context';

function ChapterAside({ chapter }) {

	const router = useRouter();
	const [matched, setMatched] = React.useState(false);
	const [canBeSeen, setCanBeSeen] = React.useState(null);
	const [isPremium, setIsPremium] = React.useState(null);

	const { user } = React.useContext(UserContext);

	React.useEffect(() => {
		if (user) axios
			.get(`${API_URL}/check-can-see-chapter/${chapter.id}`)
			.then(response => {
				setCanBeSeen(response.data.can);
				setIsPremium(currentValue => response.data.isPremium);
			})
			.catch(e => { });
		else axios
			.get(`${API_URL}/is-course-premium/${router.query.courseSlug}`)
			.then(response => {
				console.log(chapter.title, response.data);
				let can = false;
				if (response.data.isPremium) can = chapter.show_anyway;
				else can = true;
				setCanBeSeen(can);
				setIsPremium(!chapter.show_anyway);
			})
			.catch(e => { });
	}, [user]);

	React.useEffect(() => {
		setMatched(!!router.asPath.match(`/${chapter.slug}${isPremium ? "/" : ""}`));
	}, [isPremium, chapter])

	let url = isPremium === null ? "#" : `/fampianarana/${router.query.courseID}/${router.query.courseSlug}/toko/${chapter.id}/${chapter.slug}`;
	if (isPremium) url += "/premium";
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
