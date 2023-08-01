import React, { useEffect, useState, useRef } from "react";
import ScorecardItem from "./ScorecardItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
// import Teams from "./Teams";

const Twenty20 = (props) => {
  // s-312
  // l-3

  const [data, setData] = useState([]);
  const [dataShown, setDataShown] = useState([]);
  const numberShown = useRef(0);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [season, setSeason] = useState(props.season);
  const [league, setLeague] = useState(props.league);
  const [arrowLoading, setArrowLoading] = useState(false);
  const [seasonArray, setSeasonArray] = useState([]);
  // const [totalResults, setTotalResults] = useState(0);
  // const [updateNumber, setUpdateNumber] = useState(0);
  useEffect(() => {
    fixtures();
    seasonYear();
  }, []);
  const showButton = () => {
    console.log("Down");
    setArrowLoading(false);
    setLoadingButton(true);
  };
  const showButton1 = () => {
    console.log("Up");
    setLoadingButton(false);
    setArrowLoading(true);
  };
  const fixtures = async () => {
    const url = `https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=2gDADYAeIYCKOcSUbZxlfb79rCC6142SZbBunGxLHHyfJyFEpkdtkiO49sOu&include=runs&filter[league_id]=${league}&filter[season_id]=${season}`;
    const response = await fetch(url);
    const parseData = await response.json();
    const arrayData = await parseData.data;
    const arrayData2 = await parseData.data.slice(
      numberShown.current,
      numberShown.current + 4
    );
    console.log("Increment", numberShown.current);
    console.log(arrayData);
    // setDataShown(arrayData.slice(numberShown.current, numberShown.current + 4));
    // console.log(numberShown.current);
    // setInterval(() => {
    //   console.log("Shown data", dataShown);
    // }, 1500);
    setDataShown(arrayData2);
    // setDataShown(arrayData);
    // setData(arrayData);
    setData(arrayData2);
    setLoading(true);
  };
  const seasonYear = async () => {
    const url = `https://cricket.sportmonks.com/api/v2.0/seasons?api_token=2gDADYAeIYCKOcSUbZxlfb79rCC6142SZbBunGxLHHyfJyFEpkdtkiO49sOu&filter[league_id]=${league}`;
    const response = await fetch(url);
    const parseData = await response.json();
    const arrayData = await parseData.data;
    setSeasonArray(arrayData);
    setLoadingButton(true);
    // console.log("Season", arrayData);
  };
  const changeYear = (e) => {
    // console.log(e.target.value);
    numberShown.current = 0;
    const seasonId = parseInt(e.target.value);
    setSeason(seasonId);
    setLoading(false);
    // console.log(Number.isInteger(seasonId));
    fixtures();
    // console.log(Number.isInteger(5));
  };
  const increment = () => {
    // setNumberShown(numberShown + 4);
    // setNumberShown((preVal) => preVal + 4);
    numberShown.current = numberShown.current + 4;
    console.log("Increment", numberShown);
  };
  const arrayIncrease = () => {
    setDataShown((preArray) =>
      preArray.concat(data.slice(numberShown.current, numberShown.current + 4))
    );
    console.log("UpdateArray", dataShown);
  };
  const fetchMoreData = () => {
    // setTimeout(() => {
    // setUpdateNumber((prevVal) => {
    //   return prevVal + 4;
    // });
    increment();
    // setNumberShown(numberShown + 4);
    // console.log("Update number", numberShown);
    // setDataShown(
    //   dataShown.concat(data.slice(numberShown.current, numberShown.current + 4))
    // );
    arrayIncrease();
    console.log("Sukhman");
    // console.log("Update array ", dataShown);
    // }, 1500);
  };
  return (
    <>
      <h1 className="text-center my-3">Matches</h1>
      <div className="container">
        {arrowLoading && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            class="bi bi-arrow-down-circle-fill"
            viewBox="0 0 16 16"
            onClick={showButton}
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
          </svg>
        )}
        {!arrowLoading && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            class="bi bi-arrow-up-circle-fill"
            viewBox="0 0 16 16"
            onClick={showButton1}
          >
            <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
          </svg>
        )}
        <div className="buttonContainer row">
          {loadingButton &&
            seasonArray.map((id) => {
              return (
                <div className="col-md-2" key={id.id}>
                  {/* <div> */}
                  <button
                    type="button"
                    className="btn btn-dark mx-3 my-3"
                    value={id.id}
                    onClick={changeYear}
                  >
                    {id.name}
                  </button>
                  {/* </div> */}
                </div>
              );
            })}
        </div>
      </div>
      {!loading && <Spinner />}

      {loading && (
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={data.length !== dataShown.length}
          // hasMore={true}
          loader={<Spinner />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>
                Due to lack of api calls matches are restricted to 4. Sorry!!
              </b>
            </p>
          }
        >
          <div className="row">
            {dataShown
              .filter((result) => {
                if (
                  result.note !== "" &&
                  result.note !== "Match abandoned without a ball bowled" &&
                  result.note.slice(0, 10) !== "Match tied" &&
                  result.note.slice(0, 9) !== "No result"
                ) {
                  return true;
                }
              })
              .map((score) => {
                return (
                  <div className="col-md-6" key={score.id}>
                    <ScorecardItem
                      result={score.note}
                      scorecard={score.runs}
                      id={score.id}
                    />
                  </div>
                );
              })}
          </div>
        </InfiniteScroll>
      )}
    </>
  );
};

export default Twenty20;
