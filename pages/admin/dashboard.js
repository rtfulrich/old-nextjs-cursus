import React from 'react'
import UsersSection from '../../_components/front/page/admin/dashboard/UsersSection';
import sanctumRequest from "../../_helpers/sanctumRequest";

function Dashboard() {

  // J S X
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold tracking-widest mb-4">D A S H B O A R D</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 border-2 border-gray-400 rounded-xl p-2 relative">
          <h2 className="bg-black font-bold tracking-widest text-xl absolute -top-4 left-36 px-4">Users</h2>
          <UsersSection />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

export async function getServerSideProps({ req }) {

  try {
    return {
      props: {
        page: {
          title: "Admin - Dashboard",
        }
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: true
      }
    };
  }
}