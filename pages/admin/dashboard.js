import React from 'react'
import UsersSection from '../../_components/front/page/admin/dashboard/UsersSection';
import CoursesSection from '../../_components/front/page/admin/dashboard/CoursesSection';
import ChallengesSection from '../../_components/front/page/admin/dashboard/ChallengesSection';
import axios from 'axios';
import { ADMIN_API_URL, FRONT_URL } from '../../_constants/URLs';

function Dashboard({ usersCount }) {

  // J S X
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold tracking-widest mb-4">D A S H B O A R D</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 border-2 border-gray-400 rounded-xl p-2 relative">
          <div className="absolute -top-4 w-full flex justify-center">
            <h2 className="bg-black font-bold tracking-widest text-xl text-gray-400 px-4">Users</h2>
          </div>
          <UsersSection count={usersCount} />
        </div>

        <div className="col-span-1 border-2 border-gray-400 rounded-xl p-2 relative">
          <div className="absolute -top-4 w-full flex justify-center">
            <h2 className="bg-black font-bold tracking-widest text-xl text-gray-400 px-4">Courses</h2>
          </div>
          <CoursesSection />
        </div>

        <div className="col-span-1 border-2 border-gray-400 rounded-xl p-2 relative">
          <div className="absolute -top-4 w-full flex justify-center">
            <h2 className="bg-black font-bold tracking-widest text-xl text-gray-400 px-4">Challenges</h2>
          </div>
          <ChallengesSection />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

export async function getServerSideProps({ req }) {
  try {
    const response = await axios.get(`${ADMIN_API_URL}/users?count`, {
      headers: { credentials: "incluede", referer: FRONT_URL, cookie: req.headers.cookie }
    });
    const usersCount = response.data.count;
    return {
      props: {
        page: {
          title: "Admin - Dashboard",
        },
        usersCount
      }
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: true
      }
    };
  }
}