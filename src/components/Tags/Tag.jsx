import React from "react";
import { Link } from "react-router-dom";

const Tag = ({ tags, forFoodPage }) => {
  console.log(tags);
  return (
    <div className="flex sm:flex-wrap justify-center mt-4">
      {tags &&
        tags.map((tag) => (
          <Link
            className="text-sm px-3 mx-2 my-1 py-1 bg-slate-300 rounded-3xl hover:bg-slate-200"
            key={tag.name}
            to={`/tag/${tag.name}`}
          >
            {tag.name}
            {!forFoodPage && `{${tag.count}}`}
          </Link>
        ))}
    </div>
  );
};

export default Tag;
