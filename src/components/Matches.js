import React, { useEffect, useState } from "react";
import "../Style/matches.css";
import Leagues from "./Leagues";
import ScorecardItem from "./ScorecardItem";
import Spinner from "./Spinner";

const Matches = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    liveMatches();
  }, []);

  const liveMatches = async () => {
    const url =
      "https://cricket.sportmonks.com/api/v2.0/leagues?api_token=2gDADYAeIYCKOcSUbZxlfb79rCC6142SZbBunGxLHHyfJyFEpkdtkiO49sOu";
    const response = await fetch(url);
    const parseData = await response.json();
    setData(parseData);
    setLoading(true);
  };

  const arrayData = data.data;

  // console.log(arrayData);
  return (
    <>
      {!loading && <Spinner />}

      {/* {loading && (
        <div className="">
          <h1 className="text-center my-3">Browse Leagues</h1>
          <div className="panel my-5">
            <div className="panels panel1">
              <p>{arrayData[0].name}</p>
              <Leagues
                image={arrayData[0].image_path}
                name={arrayData[0].name}
                link={"iccMatches"}
              />
            </div>
            <div className="panels panel2">
              <p>{arrayData[1].name}</p>
              <Leagues
                image={arrayData[1].image_path}
                name={arrayData[1].name}
                link={"bigBashMatches"}
              />
            </div>
            <div className="panels panel3">
              <p>{arrayData[2].name}</p>
              <Leagues
                image={arrayData[2].image_path}
                name={arrayData[2].name}
                link={"csaMatches"}
              />
            </div>
          </div>
        </div>
      )} */}
      {loading && (
        <div className="row my-3">
          {/* <div className=""> */}
          {/* <h3>{arrayData[0].name}</h3> */}
          <div className="col-md-4">
            <Leagues
              image={arrayData[0].image_path}
              name={arrayData[0].name}
              link={"iccMatches"}
            />
          </div>
          {/* </div> */}
          {/* <div className=""> */}
          {/* <h3>{arrayData[1].name}</h3> */}
          <div className="col-md-4">
            <Leagues
              image={arrayData[1].image_path}
              name={arrayData[1].name}
              link={"bigBashMatches"}
            />
          </div>
          {/* </div> */}
          {/* <div className=""> */}
          {/* <h3>{arrayData[2].name}</h3> */}
          <div className="col-md-4">
            <Leagues
              image={arrayData[2].image_path}
              name={arrayData[2].name}
              link={"csaMatches"}
            />
            {/* </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Matches;
