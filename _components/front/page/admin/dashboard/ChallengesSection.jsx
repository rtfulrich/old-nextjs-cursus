import React from 'react'
import Link from "next/link";
import sanctumRequest from '../../../../../_helpers/sanctumRequest';
import axios from 'axios';
import { ADMIN_API_URL } from '../../../../../_constants/URLs';
// import Pusher from 'pusher-js';

function ChallengesSection() {

	// S T A T E
	const [freeChallengesCount, setFreeChallengesCount] = React.useState(null);
	const [premiumChallengesCount, setPremiumChallengesCount] = React.useState(null);

	// M O U N T
	React.useEffect(() => {
		fetchStates();
	}, []);

	// M E T H O D S
	const fetchStates = () => sanctumRequest(
		async () => {
			const response = await axios.get(`${ADMIN_API_URL}/challenges/prem-and-free?count`);
			setFreeChallengesCount(response.data.free);
			setPremiumChallengesCount(response.data.premium);
		}
	);

	// J S X
	return (
		<div className="flex justify-between">
			<div className="flex flex-col items-center flex-1">
				<h3 className="text-lg">
					<Link href="/admin/challenge/premium">
						<a>Premium</a>
					</Link>
				</h3>
				<div className="font-bold tracking-widest">{premiumChallengesCount}</div>
			</div>
			<div className="flex flex-col items-center flex-1">
				<h3 className="text-lg">
					<Link href="/admin/challenge/all">
						<a>Total</a>
					</Link>
				</h3>
				<div className="font-bold tracking-widest">{freeChallengesCount + premiumChallengesCount}</div>
			</div>
			<div className="flex flex-col items-center flex-1">
				<h3 className="text-lg">
					<Link href="/admin/challenge/free">
						<a>Free</a>
					</Link>
				</h3>
				<div className="font-bold tracking-widest">{freeChallengesCount}</div>
			</div>
		</div>
	)
}

export default ChallengesSection
