import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RecommendedSongs } from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
const ArtistDetails = () => {
  const dispatch = useDispatch();
  const { id: artistid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery(artistid);
  //console.log(artistData?.data[0]);

  if (isFetchingArtistDetails) return <Loader title="Loading Artist Details" />;
  if (error) return <Error />;

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistid} artistData={artistData} />
      <div className="mb-10">
        <div className="mt-5">
          {/* {songData?.sections[1].type === 'LYRICS' ? } */}
        </div>
      </div>
      <RecommendedSongs
        data={artistData?.data}
        isPlaying={isPlaying}
        artistId={artistid}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default ArtistDetails;
