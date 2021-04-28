export default async function getPageProps(callback) {
  try {
    return await callback();
  } catch (e) {
    return {
      props: {
        page: {
          title: "Page not found - IanaTek"
        },
      },
      notFound: true,
    }
  }
}