import React from 'react'
import getPageProps from '../../../../../../_helpers/getPageProps'

export default function EditChallengeAnswerContent() {
  return (
    <div className="p-4">
      Edit challenge answer content
    </div>
  )
}

export async function getServerSideProps() {
  return await getPageProps(async () => {
    return {
      props: {
        page: {
          title: "Edit challenge answer content"
        }
      }
    }
  });
}
