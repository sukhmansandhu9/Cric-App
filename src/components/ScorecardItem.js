import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import "../Style/series.css";

// Basic component for all the results,series result
// I have used the bootstrap card here to save the time
// Here I have make 2 api calls to get the name of the team

const ScorecardItem = (props) => {
  // const history = useHistory();
  // function handleClick(path) {
  //   history.push(path);
  // }
  useEffect(() => {
    team1Name();
    team2Name();
  }, []);

  const { result, scorecard, team1_id, team2_id } = props;
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const team1Name = async () => {
    const url = `https://cricket.sportmonks.com/api/v2.0/teams/${scorecard[0].team_id}?api_token=2gDADYAeIYCKOcSUbZxlfb79rCC6142SZbBunGxLHHyfJyFEpkdtkiO49sOu`;
    const response = await fetch(url);
    const team1_Name = await response.json();
    // console.log(team1_Name.data.name);
    // console.log("Sukhman");
    // console.log(team1_Name);
    setTeam1(team1_Name.data.name);
    // setLoading1(true);
  };
  const team2Name = async () => {
    const url = `https://cricket.sportmonks.com/api/v2.0/teams/${scorecard[1].team_id}?api_token=2gDADYAeIYCKOcSUbZxlfb79rCC6142SZbBunGxLHHyfJyFEpkdtkiO49sOu`;
    const response = await fetch(url);
    const team2_Name = await response.json();
    // console.log(team2_Name.data.name);
    setTeam2(team2_Name.data.name);
    setLoading2(true);
  };
  return (
    <div className="card my-3">
      <div className="card-body">
        <h5 className="card-title">
          {team1} {scorecard.length === 2 ? scorecard[0].score : "-"}/
          {scorecard.length === 2 ? scorecard[0].wickets : "-"}
        </h5>
        <h5 className="card-title">
          {team2} {scorecard.length === 2 ? scorecard[1].score : "-"}/
          {scorecard.length === 2 ? scorecard[1].wickets : "-"}
        </h5>
        <p className="card-text h6">{result}</p>

        {/* <button
          variant="outline-light"
          size="lg"
          onClick={() => handleClick(`${props.link}`)}
        >
          about
        </button> */}
        <Link
          to={{
            pathname: `/matchDetails/${props.id}`,
            state: { stateParam: true },
          }}
        >
          Match Details
        </Link>
      </div>
    </div>
  );
};

export default ScorecardItem;
