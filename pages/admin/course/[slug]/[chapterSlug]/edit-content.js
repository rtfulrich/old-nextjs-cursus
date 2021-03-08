import React from 'react'
import getPageProps from '../../../../../_helpers/getPageProps'

function EditChapterContent({ chapter }) {
  return (
    <div className="p-4">
      edit chapter content
    </div>
  )
}

export default EditChapterContent

export async function getServerSideProps({ req, params }) {
  return getPageProps(async () => {
    return {
      props: {
        page: {
          title: "Edit chapter content"
        }
      }
    }
  });
}