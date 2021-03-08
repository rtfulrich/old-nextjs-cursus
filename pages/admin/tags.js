import React from 'react'
import getPageProps from '../../_helpers/getPageProps'
import InputLabel from "../../_components/admin/posts/fields/InputLabel"
import axios from 'axios';
import { ADMIN_API_URL, FRONT_URL } from '../../_constants/URLs';
import { toast } from 'react-toastify';
import sanctumRequest from '../../_helpers/sanctumRequest';
import { useRouter } from 'next/router';

function Tags({ tags }) {
  console.log(tags)

  // V A R I A B L E S
  const router = useRouter();

  // R E F S
  const tagRef = React.useRef();

  // S T A T E S
  const [tagError, setTagError] = React.useState({ name: null });

  // M E T H O D S
  const handleAddTag = () => sanctumRequest(
    async () => {
      const name = tagRef.current.value;
      const response = await axios.post(`${ADMIN_API_URL}/tag/new`, { name })
      const { message, tag } = response.data;
      toast.success(message);
      tagRef.current.value = "";
      router.replace(router.pathname);
    },
    (e) => {
      if (e.response?.status === 422) {
        setTagError({
          name: e.response.data.errors.name[0]
        });
      }
    }
  );

  const handleRemoveTag = (tag) => sanctumRequest(async () => {
    const confirmation = `Do you really want to delete the tag : ${tag.name} ?`;
    if (confirm(confirmation)) {
      const response = await axios.delete(`${ADMIN_API_URL}/tag/delete/${tag.id}`);
      const { message } = response.data;
      toast.info(message);
      router.replace(router.pathname);
    }
  });

  // J S X
  return (
    <div className="p-4">
      {/* <div className="flex justify-between items-center pb-4"> */}
      <h1 className="text-2xl md:text-4xl tracking-widest font-bold mb-4">Manage tags</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <InputLabel className="mb-4" fieldRef={tagRef} errorNeeds={[tagError, setTagError, "name"]} id="tag_input" label="Add a new tag">New Tag</InputLabel>
          <button type="button" className="py-1 rounded-lg px-2 bg-blue-500 hover:bg-blue-600 font-bold tracking-widest float-right" onClick={handleAddTag}>Add Tag</button>
        </div>
        <div className="col-span-2">
          <h2 className="font-semibold tracking-widest text-lg mb-3">List of all tags</h2>
          <div className="p-2 pb-3 bg45 rounded-2xl font-semibold">
            {tags.map(tag => (
              <span key={tag.id} className="px-2 pt-1 pb-2 bg-black rounded-full text-xs mr-1">
                {tag.name} <span className="twitter font-bold">({tag.timesItsUsed})</span>
                <span className="bg-red-500 hover:bg-red-600 px-2 pb-1 rounded-full cursor-pointer ml-2" onClick={() => handleRemoveTag(tag)}>x</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tags

export async function getServerSideProps({ req }) {
  return getPageProps(async () => {
    const response = await axios.get(`${ADMIN_API_URL}/tags`, {
      headers: { credentials: "include", referer: FRONT_URL, cookie: req.headers.cookie }
    });
    const { tags } = response.data;
    return {
      props: {
        page: {
          title: "Manage tags"
        },
        tags
      }
    }
  });
}
