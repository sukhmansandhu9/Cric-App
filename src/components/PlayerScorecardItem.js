import React from "react";
import { Link } from "react-router-dom";

const PlayerScorecardItem = (props) => {
  return (
    <div className="card text-center my-3 mx-3">
      <img
        src={props.imagePath}
        className="card-img-top"
        alt="..."
        style={{ height: "20vh", width: "20vh", margin: "auto" }}
      />
      <div className="card-body">
        <h4 className="card-title">{props.name}</h4>
        <h5 className="card-text">{props.role}</h5>
        {/* <h5 className="card-title">{props.playingStyle}</h5> */}
        <Link
          to={{
            pathname: `/playerDetails/${props.id}`,
            state: { stateParam: true },
          }}
        >
          More Details
        </Link>
      </div>
    </div>
  );
};

export default PlayerScorecardItem;
