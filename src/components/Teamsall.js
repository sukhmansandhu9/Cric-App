import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import TeamScorecarditem from "./TeamScorecarditem";

const Teamsall = () => {
  const [data, setData] = useState([]);
  const [fullArray, setFullArray] = useState([]);
  const [searchArray, setSearchArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  useEffect(() => {
    teamData();
  }, []);

  const teamData = async () => {
    const randomNumber = Math.floor(Math.random() * 200 + 1);

    const url =
      "https://cricket.sportmonks.com/api/v2.0/countries?api_token=2gDADYAeIYCKOcSUbZxlfb79rCC6142SZbBunGxLHHyfJyFEpkdtkiO49sOu";
    const response = await fetch(url);
    const parseData = await response.json();
    const arrayData = parseData.data;
    setData(arrayData.slice(randomNumber, randomNumber + 10));
    setLoading(true);
    setFullArray(arrayData);
  };
  const searchPlayer = async (e) => {
    // console.log(e.target.value);
    let teamName = e.target.value;
    teamName = teamName.toLowerCase();
    console.log(teamName);

    const searchTeam = fullArray.filter((team) => {
      let actualTeamName = team.name.toLowerCase();
      if (teamName.includes(actualTeamName)) {
        return true;
      }
    });
    setSearchArray(searchTeam);
    console.log(searchTeam);
    if (searchTeam.length > 0) {
      setLoading(false);
      setLoadingSearch(true);
    } else {
      setLoading(true);
      setLoadingSearch(false);
    }
  };
  return (
    <>
      {/* Search Bar */}

      <div
        className="input-group input-group-lg my-4 "
        style={{ width: "80vw", margin: "auto" }}
      >
        <span className="input-group-text" id="inputGroup-sizing-lg">
          Search Team
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
      {!loading && <Spinner />}

      {loading && (
        <div className="row">
          <h1 className="text-center my-3">Browse Team</h1>
          {data.map((team) => {
            return (
              <div className="col-md-4" key={team.id}>
                <TeamScorecarditem image={team.image_path} name={team.name} />
              </div>
            );
          })}
        </div>
      )}
      {loadingSearch && (
        <div>
          <h1 className="text-center">Your search result</h1>
          <div className="row">
            {searchArray.map((team) => {
              return (
                <div className="col-md-4" key={team.id}>
                  <TeamScorecarditem image={team.image_path} name={team.name} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Teamsall;
