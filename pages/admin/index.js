import React from 'react'
import UserContext from '../../_react-contexts/user-context'

function Dashboard() {
  const { user } = React.useContext(UserContext);

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