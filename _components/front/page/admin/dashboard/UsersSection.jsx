import React from 'react'
import Link from "next/link";
import sanctumRequest from '../../../../../_helpers/sanctumRequest';
import axios from 'axios';
import { ADMIN_API_URL } from '../../../../../_constants/URLs';
// import Pusher from 'pusher-js';

function UsersSection({ count }) {

	// S T A T E
	const [usersCount, setUsersCount] = React.useState(null);

	// M O U N T
	React.useEffect(() => {
		setUsersCùount(count);
		const interval = setInterval(fetchUsersCount, 1000 * 60 * 5);

		return () => clearInterval(interval);
	}, []);

	// M E T H O D S
	const fetchUsersCount = () => sanctumRequest(
		async () => {
			const response = await axios.get(`${ADMIN_API_URL}/users?count`);
			setUsersCount(response.data.count);
		}
	);

	// J S X
	return (
		<div className="flex justify-between">
			<div className="flex flex-col items-center">
				<h3 className="text-lg">
					<Link href="/admin/users/all">
						<a>Count</a>
					</Link>
				</h3>
				<div className="font-bold tracking-widest">{usersCount}</div>
			</div>
			<div className="flex flex-col items-center">
				<h3 className="text-lg">
					<Link href="/admin/users/active">
						<a onClick={e => e.preventDefault()}>Active</a>
					</Link>
				</h3>
				<div className="font-bold tracking-widest">0</div>
			</div >
		</div >
	)
}

export default UsersSection
