import axios from "axios";

const algoliaEndPoint = "http://hn.algolia.com/api/v1/search?";

let getHackerNews = (page, hitsPerPage) => {
  const config = {
    method: "GET",
    url: `${algoliaEndPoint}tags=front_page&page=${page}&hitsPerPage=${hitsPerPage}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};


let getSearchNews = (search, page, hitsPerPage) => {
  const config = {
    method: "GET",
    url: `${algoliaEndPoint}query=${search}&tags=story&page=${page}&hitsPerPage=${hitsPerPage}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export { getHackerNews, getSearchNews };