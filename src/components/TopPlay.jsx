import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopChartCard = ({
  song,
  index,
  activeSong,
  isPlaying,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3">{index + 1}</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={song?.images?.coverart}
        alt={song?.title}
      />
      <div className="flex flex-1 flex-col justify-between mx-3  w-[150px]">
        <Link to={`/songs/${song.key}`}>
          <p className="text-xl font-bold text-white truncate">{song?.title}</p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="text-base text-gray-300 mt-1">{song?.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  // const data = {
  //   tracks: [
  //     {
  //       layout: "5",
  //       type: "MUSIC",
  //       key: "267429991",
  //       title: "Makeba",
  //       subtitle: "Jain",
  //       share: {
  //         subject: "Makeba - Jain",
  //         text: "Makeba by Jain",
  //         href: "https://www.shazam.com/track/267429991/makeba",
  //         image:
  //           "https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/5a/78/86/5a788626-308e-eb19-80e3-1b3b78ef1fe8/886446194783.jpg/400x400cc.jpg",
  //         twitter: "I used @Shazam to discover Makeba by Jain.",
  //         html: "https://www.shazam.com/snippets/email-share/267429991?lang=en-US&country=US",
  //         avatar:
  //           "https://is5-ssl.mzstatic.com/image/thumb/Features116/v4/9d/93/ee/9d93ee11-53ed-d045-4b11-5f6f4b15f324/mzl.ztqrsgts.jpg/800x800cc.jpg",
  //         snapchat: "https://www.shazam.com/partner/sc/track/267429991",
  //       },
  //       images: {
  //         background:
  //           "https://is5-ssl.mzstatic.com/image/thumb/Features116/v4/9d/93/ee/9d93ee11-53ed-d045-4b11-5f6f4b15f324/mzl.ztqrsgts.jpg/800x800cc.jpg",
  //         coverart:
  //           "https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/5a/78/86/5a788626-308e-eb19-80e3-1b3b78ef1fe8/886446194783.jpg/400x400cc.jpg",
  //         coverarthq:
  //           "https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/5a/78/86/5a788626-308e-eb19-80e3-1b3b78ef1fe8/886446194783.jpg/400x400cc.jpg",
  //         joecolor: "b:edba3dp:0b0b18s:391b20t:382e1fq:5d3b26",
  //       },
  //       hub: {
  //         type: "APPLEMUSIC",
  //         image:
  //           "https://images.shazam.com/static/icons/hub/web/v5/applemusic.png",
  //         actions: [
  //           {
  //             name: "apple",
  //             type: "applemusicplay",
  //             id: "1175094463",
  //           },
  //           {
  //             name: "apple",
  //             type: "uri",
  //             uri: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/c6/ef/30/c6ef3043-c03c-caf7-caa3-a3431a086c65/mzaf_11631466525512100935.plus.aac.ep.m4a",
  //           },
  //         ],
  //         options: [
  //           {
  //             caption: "OPEN",
  //             actions: [
  //               {
  //                 name: "hub:applemusic:deeplink",
  //                 type: "applemusicopen",
  //                 uri: "https://music.apple.com/us/album/makeba/1175093890?i=1175094463&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_web&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=music&itsct=Shazam_web",
  //               },
  //               {
  //                 name: "hub:applemusic:deeplink",
  //                 type: "uri",
  //                 uri: "https://music.apple.com/us/album/makeba/1175093890?i=1175094463&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_web&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=music&itsct=Shazam_web",
  //               },
  //             ],
  //             beacondata: {
  //               type: "open",
  //               providername: "applemusic",
  //             },
  //             image:
  //               "https://images.shazam.com/static/icons/hub/web/v5/overflow-open-option.png",
  //             type: "open",
  //             listcaption: "Open in Apple Music",
  //             overflowimage:
  //               "https://images.shazam.com/static/icons/hub/web/v5/applemusic-overflow.png",
  //             colouroverflowimage: false,
  //             providername: "applemusic",
  //           },
  //         ],
  //         explicit: false,
  //         displayname: "APPLE MUSIC",
  //       },
  //       artists: [
  //         {
  //           alias: "jain",
  //           id: "42",
  //           adamid: "334329603",
  //         },
  //       ],
  //       url: "https://www.shazam.com/track/267429991/makeba",
  //       highlightsurls: {
  //         artisthighlightsurl:
  //           "https://cdn.shazam.com/video/v3/en-US/US/web/334329603/highlights?affiliate=mttnagencyid%3Ds2n%26mttnsiteid%3D125115%26mttn3pid%3DApple-Shazam%26mttnsub1%3DShazam_web%26mttnsub2%3D5348615A-616D-3235-3830-44754D6D5973%26itscg%3D30201%26app%3Dmusic%26itsct%3DShazam_web&videoIdToFilter=1180771928",
  //         trackhighlighturl:
  //           "https://cdn.shazam.com/video/v3/en-US/US/web/highlights/1180771928?affiliate=mttnagencyid%3Ds2n%26mttnsiteid%3D125115%26mttn3pid%3DApple-Shazam%26mttnsub1%3DShazam_web%26mttnsub2%3D5348615A-616D-3235-3830-44754D6D5973%26itscg%3D30201%26app%3Dmusic%26itsct%3DShazam_web",
  //       },
  //       properties: {},
  //     },
  //   ],
  // };
  const divRef = useRef(null);
  const topPlays = data?.tracks?.slice(0, 5);
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  useEffect(() => {
    divRef.current.scrollIntoView({ behaviour: "smooth" });
  });

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[350px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col overflow-y-auto">
          {topPlays?.map((song, i) => (
            <TopChartCard
              song={song}
              index={i}
              key={song.key}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePlayClick={() => handlePlayClick(song, i)}
              handlePauseClick={handlePauseClick}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="flex shadow-lg rounded-full animate-slideright">
          {topPlays?.slice(0, 5).map((artist) => (
            <Link to={`/artists/${artist?.artists[0].adamid}`}>
              <img
                src={artist?.images?.background}
                alt="Name"
                className="rounded-full w-full object-cover"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TopPlay;
