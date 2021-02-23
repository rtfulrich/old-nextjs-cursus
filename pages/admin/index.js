import React from 'react'

function Dashboard() {

  // J S X
  return (
    <div>
      <p>
        ksjdlfqsjdf sqdjflq
      </p>
    </div>
  )
}

export default Dashboard

export async function getStaticProps() {
  return {
    props: {
      page: {
        title: "Admin - Dashboard",
      }
    }
  }
}