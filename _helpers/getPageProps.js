export default async function getPageProps(callback) {
  try {
    return await callback();
  } catch (e) {
    console.log("error", e);
    return {
      props: {
        page: {
          title: "Page not found - IanaTek"
        },
        notFound: true,
      }
    }
  }
}