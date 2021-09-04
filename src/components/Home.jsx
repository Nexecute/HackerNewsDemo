import React from "react";

const Home = (props) => {

  const searchClick = () => {
    props.history.push("/search");
  };

  return (
    <React.Fragment>
      <br />
      <br />
      <h1>Welcome to the Hacker News Algolia!</h1>
      <h2>Please Click on the Button Below to Begin your News Search</h2>
      <br />
      <br />
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={searchClick}
      >
        Click to Search the News
      </button>
    </React.Fragment>
  );
};

export default Home;
