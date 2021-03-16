import Head from 'next/head'
import AppLayout from '../_layouts/AppLayout'

export default function Home(props) {
  // console.log(props.withFooter);
  return (
    <>
      {/* <AppLayout title="IanaTek"> */}
      <h1 className="">Content</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quam, quibusdam harum fugit in neque delectus consequatur? Officia placeat ipsa voluptas temporibus expedita possimus aliquam maiores tempora explicabo nihil, earum quia eius excepturi facilis quam. Reiciendis dolor atque ipsa, repudiandae accusamus maiores recusandae ipsum? Consequatur, quidem vero odio quisquam officiis quod dolor vel tempore provident voluptatum, quae aspernatur deserunt officia harum voluptatem molestiae obcaecati. Alias ea ipsam excepturi in itaque! Aliquam provident laboriosam harum distinctio, tenetur optio aut a ratione quod cupiditate maiores? Delectus excepturi est doloribus. Illum, iusto neque! Esse cumque inventore nesciunt odit itaque, delectus corrupti! Magnam, natus. Assumenda deserunt nihil officiis? Suscipit voluptas sed modi, corrupti obcaecati eveniet consectetur porro beatae amet perferendis provident incidunt iste ipsam numquam aliquid labore, eaque ad accusantium corporis odio reiciendis harum culpa? Corporis voluptate earum quo tempora maxime sit. Molestiae excepturi esse, quaerat consectetur, temporibus error repellat corrupti dolores laborum, voluptatum aliquid! Velit voluptatum odit ratione, perspiciatis atque iste reprehenderit sint nesciunt nihil dolorum ut doloremque laborum itaque ipsa vel commodi libero, optio ab necessitatibus? Id natus rerum quis. Nihil at quas natus? Libero, porro esse nihil voluptas, neque rem ad quo, eum sed cupiditate quisquam hic debitis minus blanditiis quidem?
        </p>
      {/* </AppLayout> */}
    </>
  )
}

export async function getStaticProps({ req, res }) {
  return {
    props: {
      page: {
        title: "IanaTek",
        // noFooter: true,
      }
    }
  }
}