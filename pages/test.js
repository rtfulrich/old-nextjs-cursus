import React from 'react'
import AppLayout from '../_layouts/AppLayout'
import NotFound from '../_layouts/components/errors/NotFound'

function Test() {
  return (
    <NotFound />
  )
}

export default Test

export async function getStaticProps(context) {
  return {
    props: {
      notFound: true
    }
  }
}
