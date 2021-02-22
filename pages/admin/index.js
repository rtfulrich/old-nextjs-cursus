import React from 'react'

function Dashboard() {
  return (
    <div>
      <p>
        ksjdlfqsjdf sqdjflq
      </p>
    </div>
  )
}

export default Dashboard

export async function getServerSideProps(context) {
  return {
    props: {
      page: {
        title: "Admin - Dashboard",
        noFooter: true,
      }
    }
  }
}