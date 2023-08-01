import React from "react";
import { Link } from "react-router-dom";

const TeamScorecarditem = (props) => {
  return (
    <div className="card text-center my-3 mx-3">
      <img
        src={props.image}
        className="card-img-top"
        alt="..."
        style={{ height: "20vh", width: "20vh", margin: "auto" }}
      />
      <div className="card-body">
        <h4 className="card-title">{props.name}</h4>

        {/* <Link
          to={{
            pathname: `/playerDetails/43`,
            state: { stateParam: true },
          }}
        >
          More Details
        </Link> */}
      </div>
    </div>
  );
};

export default TeamScorecarditem;
