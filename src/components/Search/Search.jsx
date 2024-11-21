import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchFoods } from "../../features/foodSlice";
// Update the path to where your foodSlice is located

const Search = () => {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const { searchTerm } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchTerm) {
      setTerm(searchTerm);
      dispatch(searchFoods(searchTerm)); // Dispatch searchFoods when searchTerm changes
    } else {
      setTerm("");
    }
  }, [searchTerm, dispatch]);

  const search = () => {
    if (term) {
      navigate("/search/" + term);
      dispatch(searchFoods(term)); // Dispatch searchFoods when searching
    } else {
      navigate("/");
    }
  };
  return (
    <div className="w-full px-4 flex justify-center sm:hidden md:flex">
      <input
        type="text"
        className="border-2 border-red-300 p-2 rounded-3xl focus:outline-none"
        placeholder="Search Bring Food!"
        onChange={(e) => setTerm(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && search()}
        value={term}
      />
      <button
        onClick={() => search()}
        className="text-white hover:bg-red-300 transition-colors px-2 rounded-3xl -ml-8 bg-red-500"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
