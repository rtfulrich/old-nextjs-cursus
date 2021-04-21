import React from 'react'
import Link from "next/link";
import sanctumRequest from '../../../../../_helpers/sanctumRequest';
import axios from 'axios';
import { ADMIN_API_URL } from '../../../../../_constants/URLs';
// import Pusher from 'pusher-js';

function CoursesSection() {

	// S T A T E
	const [freeCoursesCount, setFreeCoursesCount] = React.useState(null);
	const [premiumCoursesCount, setPremiumCoursesCount] = React.useState(null);

	// M O U N T
	React.useEffect(() => {
		fetchStates();
	}, []);

	// M E T H O D S
	const fetchStates = () => sanctumRequest(
		async () => {
			const response = await axios.get(`${ADMIN_API_URL}/courses/prem-and-free?count`);
			setFreeCoursesCount(response.data.free);
			setPremiumCoursesCount(response.data.premium);
		}
	);

	// J S X
	return (
		<div className="flex justify-between">
			<div className="flex flex-col items-center flex-1">
				<h3 className="text-lg">
					<Link href="/admin/course/premium">
						<a>Premium</a>
					</Link>
				</h3>
				<div className="font-bold tracking-widest">{premiumCoursesCount}</div>
			</div>
			<div className="flex flex-col items-center flex-1">
				<h3 className="text-lg">
					<Link href="/admin/course/all">
						<a>Total</a>
					</Link>
				</h3>
				<div className="font-bold tracking-widest">{premiumCoursesCount + freeCoursesCount}</div>
			</div>
			<div className="flex flex-col items-center flex-1">
				<h3 className="text-lg">
					<Link href="/admin/course/free">
						<a>Free</a>
					</Link>
				</h3>
				<div className="font-bold tracking-widest">{freeCoursesCount}</div>
			</div>
		</div>
	)
}

export default CoursesSection
