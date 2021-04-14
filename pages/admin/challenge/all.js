import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import { FaCheck, FaMoneyBill } from 'react-icons/fa';
import { ADMIN_API_URL, FRONT_URL } from '../../../_constants/URLs';
import getPageProps from '../../../_helpers/getPageProps';

export default function AllChallenges({ result }) {

  const challenges = result.data;
  const links = result.links;

  return (
    <div className="px-4 py-3">
      <div className="flex justify-between flex-col lg:flex-row items-center mb-4">
        <h1 className={`text-3xl tracking-widest font-bold md:mb-0`}>
          All challeges - IanaTek
        </h1>
      </div>

      {/* List of challenges */}
      <div className="grid grid-cols-4 gap-4">
        {
          challenges.map(challenge => (
            <div key={challenge.id} className="bg45 rounded-xl overflow-hidden relative border-2 border-black hover:border-blue-500">
              <div className="h-40 flex justify-center items-center overflow-hidden">
                <img src={challenge.image_cover} className="min-h-full min-w-full w-auto" />
              </div>
              <div className="my-2 px-2">
                <h1 className="font-bold mb-2">
                  <Link href={`/admin/challenge/${challenge.slug}`}>
                    <a className="hover:text-blue-500" style={{ textDecoration: "none" }}>{challenge.title}</a>
                  </Link>
                </h1>
                <div className={`flex ${challenge.price > 0 && challenge.tags.length > 0 ? "justify-between items-center" : "justify-end"}`}>
                  {challenge.price > 0 && <div className="px-2 text-xs bg-yellow-300 text-black rounded-full font-bold tracking-widest">
                    {challenge.price} ar
                  </div>}
                  <div>
                    {challenge.tags.map(tag => (
                      <span className="mr-1 px-2 text-xs font-semibold pb-1 bg-black mb-1 tracking-widest rounded-full" key={tag.id}>{tag.name}</span>
                    ))}
                  </div>
                </div>
              </div>
              {/* if challenge is published */}
              {
                challenge.published && (<>
                  <span className="absolute top-1 right-1 z-10"><FaCheck /></span>
                  <div className="absolute -top-2 -right-6 transform rotate-45 bg-blue-500 w-16 h-9"></div>
                </>
                )
              }
              {/* if challenge is not free */}
              {
                challenge.price > 0 && (<>
                  <span className="absolute top-1 left-2 transform -rotate-45 z-10"><FaMoneyBill /></span>
                  <div className="absolute -top-2 -left-6 transform -rotate-45 success-bg w-16 h-9"></div>
                </>)
              }
            </div>
          ))
        }
      </div>
      {/* Pagination buttons */}
      <div className="fixed bottom-3 right-3">
        <div className="flex justify-around mt-4">
          {
            links.map((link, index) => {
              let { label, url, active } = link;

              let page = label;
              if (index === 0) {
                page = 1;
                label = "Prev";
              }
              else if (index === links.length - 1) {
                page = result.current_page + 1;
                label = "Next"
              }

              const button = url
                ? (<Link href={page !== 1 ? `?page=${page}` : ""} key={index}>
                  <a className={`px-2 mx-1 rounded-lg border-2 font-bold text-white border-blue-500 ${active ? "bg-blue-500" : "hover:bg-blue-600"}`} style={{ textDecoration: "none" }}>{label}</a>
                </Link>)
                : <span key={index} className="font-bold px-2 tracking-widest cursor-not-allowed text-center rounded-lg text-black bg-gray-300 mx-1">{label}</span>
              return button;
            })
          }
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ req, query }) {
  return await getPageProps(async () => {
    let page = null;
    if (query.page) page = query.page;
    const response = await axios.get(`${ADMIN_API_URL}/challenges/paginated${page ? `?page=${page}` : ""}`, {
      headers: {
        credentials: "include",
        referer: FRONT_URL,
        cookie: req.headers.cookie
      }
    });
    const { result } = response.data;

    return {
      props: {
        page: {
          title: "All challenges",
        },
        result
      }
    }
  });
}
