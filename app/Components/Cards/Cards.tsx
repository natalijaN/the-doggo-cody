import React from "react";
import Yorkshire from "../../../public/Yorkshire.jpg";
import WhiteDog from "../../../public/WhiteDog.webp";
import SmallDogs from "../../../public/SmallDogs.webp";
import LargeDog from "../../../public/LargeDog.webp";
import Card from "./Card";

type Post = {
  id: string;
  title: string;
  content: string;
};

type Posts = {
  posts: Post[];
};

const Cards = ({ posts }: Posts) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[370px] w-full">
        <div className="md:col-span-2 relative h-full cursor-pointer">
          <Card
            image={LargeDog}
            alt="Large Dog"
            title={posts[0].title}
            feature="ABOUT ADOPTING"
            id={posts[0].id}
          />
        </div>

        <div className="flex flex-col gap-4 h-full">
          <div className="relative h-1/3 cursor-pointer">
            <Card
              image={WhiteDog}
              alt="White Dog"
              title={posts[1].title}
              feature="FEATURED"
              id={posts[1].id}
            />
          </div>

          <div className="relative h-1/3 cursor-pointer">
            <Card
              image={Yorkshire}
              alt="Yorkshire Dog"
              title={posts[2].title}
              feature="FEATURED"
              id={posts[2].id}
            />
          </div>

          <div className="relative h-1/3 cursor-pointer">
            <Card
              image={SmallDogs}
              alt="Small Dog"
              title={posts[3].title}
              feature="ADOPTION"
              id={posts[3].id}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
