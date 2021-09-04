import React from 'react';
import { ListGroup } from "react-bootstrap";



const History = (props) =>{
    const searchClick = () => {
        props.history.push("/search");
      };
    
      const homeClick = () => {
        props.history.push("/");
      };
    
      const searchTermMapper = (term, index) => {
        return <ListGroup.Item key={`Key - ${index}`}>{term}</ListGroup.Item>;
      };
    
      const newsList = props.location.state.payLoadStories;
    
      const newNewList = JSON.parse(newsList);
    
      const lastViewedNewsMapper = (previousStory, index) => {
        return (
          <ListGroup.Item key={`Key - ${index}`}>
            {previousStory.title}
          </ListGroup.Item>
        );
      };
    
      return (
        <React.Fragment>
          <br />
          <br />
          <h1>Your Last Five News Stories</h1>
          <br />
          <ListGroup>{newNewList.map(lastViewedNewsMapper)}</ListGroup>
    
          <br />
          <h1>Your Last Search Terms</h1>
          <br />
          <ListGroup>
            {props.location.state.payLoadTerms.map(searchTermMapper)}
          </ListGroup>
          <br />
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={searchClick}
          >
            Press Here for Search!
          </button>
          <br />
          <br />
          <button
            type="button"
            className="btn btn-success btn-lg"
            onClick={homeClick}
          >
            Press here to return to Home Page!
          </button>
        </React.Fragment>
      );
}



export default History