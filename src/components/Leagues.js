import React from "react";
import { useHistory } from "react-router-dom";

// To show which legaue to browse

const Leagues = (props) => {
  const history = useHistory();
  function handleClick(path) {
    history.push(path);
  }

  return (
    // <>
    //   <div
    //     className="card my-5 mx-3"
    //     style={{ height: "30vw", position: "absolute" }}
    //   >
    //     <img
    //       className="card-img-top"
    //       src={props.image}
    //       alt="Card image cap"
    //       style={{
    //         height: "20vw",
    //         width: "20vw",
    //         position: "relative",
    //         top: "5i",
    //       }}
    //     />
    //     <div className="card-body">
    //       <h5 className="card-title">{props.name}</h5>

    //       <button
    //         variant="outline-light"
    //         className="btn btn-success"
    //         size="lg"
    //         onClick={() => handleClick(`${props.link}`)}
    //       >
    //         about
    //       </button>
    //     </div>
    //   </div>
    // </>
    <div className="card text-center my-3 mx-3">
      <img
        src={props.image}
        className="card-img-top"
        alt="..."
        style={{ height: "20vh", width: "20vh", margin: "auto" }}
      />
      <div className="card-body">
        <h4 className="card-title">{props.name}</h4>
        {/* <h5 className="card-text">{props.role}</h5> */}
        {/* <h5 className="card-title">{props.playingStyle}</h5> */}

        <button
          variant="outline-light"
          className="btn btn-success my-3"
          size="lg"
          onClick={() => handleClick(`${props.link}`)}
        >
          Browse Matches
        </button>
      </div>
    </div>
  );
};

export default Leagues;
