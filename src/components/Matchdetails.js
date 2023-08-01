import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
const Matchdetails = () => {
  const { id } = useParams();

  const [matchInfo, setMatchInfo] = useState([]);
  const [batting, setBatting] = useState([]);
  const [bowling, setBowling] = useState([]);
  const [lineup, setLineup] = useState([]);
  const [manOfMatch, setManOfMatch] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    matchDetails();
  }, []);
  //216

  // Function to call the fetch api to get the match details
  const matchDetails = async () => {
    const url = `https://cricket.sportmonks.com/api/v2.0/fixtures/${id}?api_token=2gDADYAeIYCKOcSUbZxlfb79rCC6142SZbBunGxLHHyfJyFEpkdtkiO49sOu&include=batting.team,bowling.team,lineup,runs,localteam,visitorteam`;
    const response = await fetch(url);
    const parseData = await response.json();
    setMatchInfo(parseData.data);
    console.log(parseData);
    // console.log(parseData.data.batting);
    const arrayBatting = await parseData.data.batting;
    // console.log(arrayBatting);
    const arrayBowling = await parseData.data.bowling;
    // console.log(arrayBowling);
    const arrayLineup = await parseData.data.lineup;
    setBatting(arrayBatting);
    setBowling(arrayBowling);
    setLineup(arrayLineup);
    const arrayPlayer = arrayLineup.filter((id) => {
      if (id.id === parseData.data.man_of_match_id) {
        return id;
      }
    });
    setManOfMatch(arrayPlayer);
    console.log(arrayPlayer);
    setLoading(true);
    // console.log(arrayLineup);
  };

  // Function to get the man of the match details

  return (
    <>
      {!loading && <Spinner />}

      {loading && (
        <div className="container">
          <h1 className="my-5 text-center">
            {matchInfo.localteam.name} vs {matchInfo.visitorteam.name}
          </h1>
          <div className="container ">
            <h3 className="my-3">
              {matchInfo.runs[0].team_id === matchInfo.localteam.id
                ? matchInfo.localteam.name
                : matchInfo.visitorteam.name}
              {"     "}
              {matchInfo.runs[0].score}/{matchInfo.runs[0].wickets} (
              {matchInfo.runs[0].overs})
            </h3>
            <h3>
              {matchInfo.runs[1].team_id === matchInfo.localteam.id
                ? matchInfo.localteam.name
                : matchInfo.visitorteam.name}
              {"     "}
              {matchInfo.runs[1].score}/{matchInfo.runs[1].wickets} (
              {matchInfo.runs[1].overs})
            </h3>
            <h2 className="text-center my-3">{matchInfo.note}</h2>
          </div>
          {/* Man of the Match code  */}
          <div className="card my-5 text-center" style={{}}>
            <img
              src={manOfMatch[0].image_path}
              className="card-img-top my-1"
              alt="Dane Paterson"
              style={{ height: "20vh", width: "20vh", margin: "auto" }}
            />
            <div className="card-body">
              <h5 className="card-title">Player of the Match</h5>
              <p className="card-text">{manOfMatch[0].fullname}</p>
            </div>
          </div>

          {/* First Bating Scorecard  */}
          <div className="my-3">
            <h3 className="">
              {matchInfo.runs[0].team_id === matchInfo.localteam.id
                ? matchInfo.localteam.name
                : matchInfo.visitorteam.name}
              {matchInfo.runs[0].score}/{matchInfo.runs[0].wickets} (
              {matchInfo.runs[0].overs})
            </h3>
            <h4 className="text-center my-3">Batting</h4>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">R</th>
                  <th scope="col">B</th>
                  <th scope="col">SR</th>
                </tr>
              </thead>
              <tbody>
                {batting
                  .filter((scorecard) => scorecard.scoreboard === "S1")
                  .map((player) => {
                    return (
                      <tr>
                        <th scope="row">
                          {lineup.map((id) => {
                            if (id.id === player.player_id) {
                              return id.fullname;
                            }
                          })}
                        </th>
                        <td>{player.active ? "Not out" : "Out"}</td>
                        <td>{player.score}</td>
                        <td>{player.ball}</td>
                        <td>{player.rate}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* Frist Bowling Scorecard  */}
          <div className="my-3">
            <h4 className="text-center my-3">Bowling</h4>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">O</th>
                  <th scope="col">R</th>
                  <th scope="col">W</th>
                  <th scope="col">Eco</th>
                </tr>
              </thead>
              <tbody>
                {bowling
                  .filter((scorecard) => scorecard.scoreboard === "S1")
                  .map((player) => {
                    return (
                      <tr>
                        <th scope="row">
                          {lineup.map((id) => {
                            if (id.id === player.player_id) {
                              return id.fullname;
                            }
                          })}
                        </th>
                        <td>{player.overs}</td>
                        <td>{player.runs}</td>
                        <td>{player.wickets}</td>
                        <td>{player.rate}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* Second Batting Scorecard  */}

          <div className="my-5">
            <h4 className="text-center my-3">Batting</h4>

            <h3>
              {matchInfo.runs[1].team_id === matchInfo.localteam.id
                ? matchInfo.localteam.name
                : matchInfo.visitorteam.name}{" "}
              {matchInfo.runs[1].score}/{matchInfo.runs[1].wickets} (
              {matchInfo.runs[1].overs})
            </h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">R</th>
                  <th scope="col">B</th>
                  <th scope="col">SR</th>
                </tr>
              </thead>
              <tbody>
                {batting
                  .filter((scorecard) => scorecard.scoreboard === "S2")
                  .map((player) => {
                    return (
                      <tr>
                        <th scope="row">
                          {lineup.map((id) => {
                            if (id.id === player.player_id) {
                              return id.fullname;
                            }
                          })}
                        </th>
                        <td>{player.active ? "Not out" : "Out"}</td>
                        <td>{player.score}</td>
                        <td>{player.ball}</td>
                        <td>{player.rate}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* Second Bowling Scorecard  */}
          <div className="my-3">
            <h4 className="text-center my-3">Bowling</h4>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">O</th>
                  <th scope="col">R</th>
                  <th scope="col">W</th>
                  <th scope="col">Eco</th>
                </tr>
              </thead>
              <tbody>
                {bowling
                  .filter((scorecard) => scorecard.scoreboard === "S2")
                  .map((player) => {
                    return (
                      <tr>
                        <th scope="row">
                          {lineup.map((id) => {
                            if (id.id === player.player_id) {
                              return id.fullname;
                            }
                          })}
                        </th>
                        <td>{player.overs}</td>
                        <td>{player.runs}</td>
                        <td>{player.wickets}</td>
                        <td>{player.rate}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Matchdetails;
