import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RecommendedSongs } from "../components";
import {
  useGetSongDetailsQuery,
  useGetRecommendedSongsQuery,
} from "../redux/services/shazamCore";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });
  const {
    data,
    isFetching: isFetchingRecommendedSongs,
    error,
  } = useGetRecommendedSongsQuery({ songid });
  console.log("songData", songData);

  if (isFetchingSongDetails || isFetchingRecommendedSongs)
    return <Loader title="Loading Song Details" />;
  if (error) <Error />;

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />
      <div className="mb-10">
        {/* <h2 className="text-3xl text-white font-bold">Lyrics:</h2> */}
        <div className="mt-5">
          {/* {songData?.sections[1].type === 'LYRICS' ? } */}
        </div>
      </div>
      <RecommendedSongs
        data={data?.tracks}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
