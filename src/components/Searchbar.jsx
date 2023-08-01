import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const onhandleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };
  return (
    <form
      autoComplete="off"
      className="p-2 text-gray-400 focus-within:text-gray-600"
      onSubmit={onhandleSubmit}
    >
      <label htmlFor="search-filed" className="sr-only">
        Search All Songs
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch className="w-5 h-5 ml=4" />
        <input
          type="search"
          name="search-field"
          autoComplete="off"
          placeholder="Search"
          value={searchTerm}
          id="search-field"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className="flex flex-1 bg-transparent outline-none border-none placeholder-gray-400 text-base text-white p-4"
        />
      </div>
    </form>
  );
};

export default Searchbar;
