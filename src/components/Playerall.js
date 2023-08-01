import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import PlayerScorecardItem from "./PlayerScorecardItem";
import Spinner from "./Spinner";

const Playerall = () => {
  useEffect(() => {
    playerData();
  }, []);

  const [loading, setLoading] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(true);
  const [data, setData] = useState([]);
  const [fullArray, setFullArray] = useState([]);
  const [searchPlayerArray, setSearchPlayerArray] = useState([]);
  const [loadingSearchPlayer, setLoadingSearchPlayer] = useState(false);
  const [loadingNoPlayer, setLoadingNoPlayer] = useState(false);

  const playerData = async () => {
    const randomNumber = Math.floor(Math.random() * 1000 + 1);

    const url = `https://cricket.sportmonks.com/api/v2.0/players?api_token=2gDADYAeIYCKOcSUbZxlfb79rCC6142SZbBunGxLHHyfJyFEpkdtkiO49sOu`;
    const response = await fetch(url);
    const parseData = await response.json();
    const arrayData = await parseData.data;
    console.log(arrayData);
    // console.log("Sukhman Singh Sandhu");
    // Showing 9 players randomly
    setData(arrayData.slice(randomNumber, randomNumber + 10));
    setFullArray(arrayData);
    setLoading(true);
    setLoadingSpinner(false);
  };
  const searchPlayer = (e) => {
    // console.log("You type on keyboard");
    // console.log(e.target.value);
    // Improve the Search Bar
    // 1) Convert the all text into lowercase
    // 2) Use the include instead of ===
    let playerName = e.target.value;
    playerName = playerName.toLowerCase();
    // console.log(playerName);
    const searchPlayerArray2 = fullArray.filter((id) => {
      if (
        playerName.includes(id.firstname.toLowerCase()) ||
        playerName.includes(id.fullname.toLowerCase()) ||
        playerName.includes(id.lastname.toLowerCase())
      ) {
        return true;
      }
    });
    // console.log("Length", searchPlayerArray2.length);
    // console.log("Array", searchPlayerArray2);
    if (searchPlayerArray2.length > 0) {
      // console.log("You are great");
      setLoadingSearchPlayer(true);
      setSearchPlayerArray(searchPlayerArray2);
      setLoading(false);
      setLoadingNoPlayer(false);
    } else {
      setLoadingSearchPlayer(false);
      setLoadingNoPlayer(true);
      setLoading(true);
    }
  };
  return (
    <>
      <div
        className="input-group input-group-lg my-4 "
        style={{ width: "80vw", margin: "auto" }}
      >
        <span className="input-group-text" id="inputGroup-sizing-lg">
          Search Player
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Enter name you wish to Search"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          onChange={searchPlayer}
        />
      </div>
      {loadingSpinner && <Spinner />}

      {loadingNoPlayer && (
        <h1 className="text-center my-5">No player with this name</h1>
      )}
      {loadingSearchPlayer && (
        <div className="row ">
          {searchPlayerArray.map((score) => {
            return (
              <div className="col-md-4" key={score.id}>
                <PlayerScorecardItem
                  imagePath={score.image_path}
                  name={score.fullname}
                  role={score.position.name}
                  id={score.id}

                  //   playingStyle={
                  //     score.position.id === "2"
                  //       ? score.bowlingstyle
                  //       : score.battingstyle
                  //   }
                />
              </div>
            );
          })}
        </div>
      )}

      {loading && (
        <div className="container ">
          <h1 className="text-center my-3">Trending Players</h1>
          <div className="row ">
            {data.map((score) => {
              return (
                <div className="col-md-4" key={score.id}>
                  <PlayerScorecardItem
                    imagePath={score.image_path}
                    name={score.fullname}
                    role={score.position.name}
                    id={score.id}
                    //   playingStyle={
                    //     score.position.id === "2"
                    //       ? score.bowlingstyle
                    //       : score.battingstyle
                    //   }
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Playerall;
