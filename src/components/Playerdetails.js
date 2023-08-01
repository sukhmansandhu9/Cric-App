import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";

const Playerdetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    playerInformation();
    // playerCountry();
  }, []);

  const [data, setData] = useState([]);
  const playerInformation = async () => {
    const url = `https://cricket.sportmonks.com/api/v2.0/players/${id}?api_token=2gDADYAeIYCKOcSUbZxlfb79rCC6142SZbBunGxLHHyfJyFEpkdtkiO49sOu&include=teams&include=career`;
    const response = await fetch(url);
    const parseData = await response.json();
    setData(parseData.data);
    console.log(parseData.data);
    setLoading(true);
    // const countryResponse = await fetch(
    //   `https://cricket.sportmonks.com/api/v2.0/teams/47?api_token=2gDADYAeIYCKOcSUbZxlfb79rCC6142SZbBunGxLHHyfJyFEpkdtkiO49sOu`
    // );
    // console.log(countryResponse);
  };
  // function to get the country name

  return (
    <>
      {!loading && <Spinner />}

      {loading && (
        //   Player basic information
        <div className="card text-center">
          <img
            src={data.image_path}
            className="card-img-top my-4"
            alt="..."
            style={{ height: "30vh", width: "30vh", margin: "auto" }}
          />
          <div className="card-body">
            <h1 className="card-title">{data.fullname}</h1>
            <h2 className="card-text">{data.position.name}</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Batting Style: {data.battingstyle.toUpperCase()}
              </li>
              <li className="list-group-item">
                Bowling Style: {data.bowlingstyle.toUpperCase()}
              </li>
              <li className="list-group-item">
                Date of Birth: {data.dateofbirth}
              </li>
              <li className="list-group-item">
                Age:{" "}
                {new Date().getFullYear() -
                  parseInt(data.dateofbirth.slice(0, 4))}
              </li>
            </ul>
          </div>
          {/* <div>
            <h3 className="text-center my-3">Batting Statistics</h3>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ODI</th>
                  <th scope="col">T-20</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Matches</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">Innings</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">Runs</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">SR</th>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div> */}
          {/* <div>
            <h3 className="text-center my-3">Bowling Statistics</h3>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ODI</th>
                  <th scope="col">T-20</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Matches</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">Innings</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">Runs</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">SR</th>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div> */}
        </div>
      )}
    </>
  );
};

export default Playerdetails;
