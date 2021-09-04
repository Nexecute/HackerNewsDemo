import React from "react";

const NewsStory = (props) => {
  const { oneStory } = props;

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{oneStory.title}</h5>
        <p className="card-text">Written by: {oneStory.author}</p>
        <a href={oneStory.url}>{oneStory.url}</a>
      </div>
    </div>
  );
};

export default NewsStory;
