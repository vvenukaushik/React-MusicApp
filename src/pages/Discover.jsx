import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";
const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (store) => store.player
  );
  const { data, isFetching, error } = useGetTopChartsQuery();
  const genreTitle = "Pop";
  console.log(data);

  if (isFetching) return <Loader title={"Loading Songs"} />;
  if (error) <Error />;
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="text-3xl font-bold text-white text-left">
          Discover {genreTitle}
        </h2>
        {/* <select
          value={genreListId || "pop"}
          onChange={(e) => {
            dispatch(selectGenreListId(e.target.value));
          }}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value}>{genre.title}</option>
          ))}
        </select> */}
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((song, index) => (
          <SongCard
            key={song.key}
            song={song}
            activeSong={activeSong}
            isPlaying={isPlaying}
            data={data}
            i={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
