import Cards from "./components/Cards/Cards";

export default async function Home() {
  const baseUrl = process.env.VERCEL_URL
    ? `${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const getPosts = async () => {
    const res = await fetch(`${baseUrl}/api/dogs`, {
      next: { revalidate: 10 },
    });
    return res.json();
  };

  const posts = await getPosts();

  return (
    <>
      <h1 className="text-4xl pb-4 mb-5 md:text-6xl font-extrabold text-center bg-gradient-to-r from-red-300 to-red-900 text-transparent bg-clip-text drop-shadow-lg">
        Welcome to The Doggo Cody!
      </h1>

      <Cards posts={posts} />
    </>
  );
}
