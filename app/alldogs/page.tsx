import Link from "next/link";
import React from "react";

const AllDogs = () => {
  return (
    <div>
      AllDogs
      <h2>
        <Link href="/alldogs/dog">View Dog</Link>
      </h2>
    </div>
  );
};

export default AllDogs;
