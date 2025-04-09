import Cards from "./Components/Cards/Cards";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/dogs");
  const posts = await res.json();

  return (
    <>
      <h1 className="text-4xl pb-4 mb-5 md:text-6xl font-extrabold text-center bg-gradient-to-r from-red-300 to-red-900 text-transparent bg-clip-text drop-shadow-lg">
        Welcome to The Doggo Cody!
      </h1>
      <Cards posts={posts} />
    </>
  );
}
