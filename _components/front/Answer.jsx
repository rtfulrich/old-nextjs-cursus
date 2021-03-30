import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import { FaCheck, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { API_URL } from '../../_constants/URLs';
import UserContext from '../../_react-contexts/user-context';

function Answer({ challenge, answer }) {

	// S T A T E 
	const { user } = React.useContext(UserContext);
	const [canSeeAnswer, setCanSeeAnswer] = React.useState(false);

	// V A R I A B L E
	const isPrem = challenge.price > 0;

	// M O U N T  E F F E C T
	React.useEffect(() => setCanSeeAnswer(!isPrem), []);

	// user  E F F E C T
	React.useEffect(() => {
		// console.log("user", user);
		if (user) axios
			.get(`${API_URL}/check-can-see-answer/${answer.id}`)
			.then(response => setCanSeeAnswer(response.data.can))
			.catch(e => console.clear());
		else setCanSeeAnswer(!isPrem);
	}, [user]);

	const href = `/challenge/${challenge.id}/${challenge.slug}/${answer.id}/${answer.slug}${isPrem ? "/premium" : ""}`;
	const preventToast = <span className="text-black font-semibold">Tsy afaka mijery io toko io enao !</span>;
	return (
		<h2 className={`font-bold flex items-center mb-3 md:mb-2 hover:text-blue-400 tracking-widest`}>
			<span className={`w-8 md:w-10 text-xs inline-block`}>
				{answer.rank}
			</span>
			{canSeeAnswer
				? <Link href={href}>
					<a style={{ textDecoration: "none" }} className="flex items-center">
						{answer.title} <span className="ml-4 text-xs success"><FaCheck /></span>
					</a>
				</Link>
				: <span className="cursor-pointer flex items-center" onClick={() => toast.info(preventToast)}>
					{answer.title} <span className="ml-4 text-red-400 text-xs"><FaLock /></span>
				</span>
			}
		</h2>
	)
}

export default Answer
