import React, { useState, useEffect } from "react";
import * as userService from "../services/newsService";
import NewsStory from "./NewsStory";
import { Button, InputGroup } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import en_US from "rc-pagination/es/locale/en_US";

const Search = (props) => {
  const searchSchema = Yup.object().shape({
    search: Yup.string()
      .min(1)
      .required("Minimum One Character Required for Search"),
  });
  const initialValues = {
    search: "",
  };

  const [pagination, setPagination] = useState({
    nbHits: 0,
    hitsPerPage: 5,
    page: 0,
    nbPages: 0,
  });

  const [searchPagination, setSearchPagination] = useState({
    nbHits: 0,
    hitsPerPage: 5,
    page: 0,
    nbPages: 0,
  });

  const [paginationCheck, setPaginationCheck] = useState("");
  const [current, setCurrent] = useState(1);
  const [searchWords, setSearchWords] = useState([]);
  const [mappedNews, setMappedNews] = useState([]);

  useEffect(() => {
    userService
      .getHackerNews(pagination.page, pagination.hitsPerPage)
      .then((response) => {
        setMappedNews(response.data.hits.map(mapNews));
        setPagination({
          nbHits: response.data.nbHits,
          hitsPerPage: response.data.hitsPerPage,
          page: response.data.page,
          nbPages: response.data.nbPages,
        });
        setPaginationCheck(response.config.url);
        sessionStorage.setItem(
          "previousNews",
          JSON.stringify(response.data.hits)
        );
      })
      .catch((response) => {
        console.warn({ error: response });
      });
  }, [pagination.page, pagination.hitsPerPage]);

  useEffect(() => {
    searchWords.slice(-1)[0] &&
      userService
        .getSearchNews(
          searchWords.slice(-1)[0],
          searchPagination.page,
          searchPagination.hitsPerPage
        )
        .then((response) => {
          setMappedNews(response.data.hits.map(mapNews));
          setSearchPagination({
            nbHits: response.data.nbHits,
            hitsPerPage: response.data.hitsPerPage,
            page: response.data.page,
            nbPages: response.data.nbPages,
          });
          setPaginationCheck(response.config.url);
          sessionStorage.setItem(
            "previousNews",
            JSON.stringify(response.data.hits)
          );
        })
        .catch((response) => {
          console.warn({ error: response });
        });
  }, [searchPagination.page, searchPagination.hitsPerPage, searchWords]);

  const handleSubmit = (values) => {
    let newSearchWords = [...searchWords, values.search];
    setSearchWords(newSearchWords);
  };

  const onChange = (page) => {
    setCurrent(page);
    setPagination({
      ...pagination,
      page: page - 1,
    });
  };

  const onChangeSearch = (page) => {
    setCurrent(page);
    setSearchPagination({
      ...searchPagination,
      page: page - 1,
    });
  };

  const mapNews = (oneStory) => {
    return (
      <React.Fragment key={`News-${oneStory.objectID}`}>
        <NewsStory oneStory={oneStory} />
      </React.Fragment>
    );
  };

  const homeClick = () => {
    props.history.push("/");
  };

  const historyClick = () => {
    let searchWordsList = searchWords;
    let previousNewsStories = sessionStorage.getItem("previousNews");
    props.history.push("/history", {
      typeOf: "LIST",
      payLoadStories: previousNewsStories,
      payLoadTerms: searchWordsList,
    });
  };

  return (
    <React.Fragment>
      <br />
      <br />
      <>
        <Button variant="success" size="lg" active onClick={() => onChange(1)}>
          Click for Front Page News!
        </Button>{" "}
        <Button variant="warning" size="lg" active onClick={historyClick}>
          Click for Your Search History!
        </Button>{" "}
        <Button variant="secondary" size="lg" active onClick={homeClick}>
          Click for Home Page
        </Button>
      </>
      <br />
      <br />
      <div className="styles">
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={searchSchema}
        >
          <Form>
            <InputGroup className="mb-3">
              <Field
                type="text"
                name="search"
                placeholder="Search Stories by Title, Author, or Url"
                className="form-control"
              />
              <Button variant="primary" type="submit" id="button-addon2">
                Search!
              </Button>
              <ErrorMessage
                name="search"
                component="div"
                className="has-error"
              />
            </InputGroup>
          </Form>
        </Formik>
      </div>
      <br />
      <br />
      {paginationCheck.includes("story") ? (
        <Pagination
          locale={en_US}
          onChange={onChangeSearch}
          current={current}
          total={searchPagination.nbHits}
          pageSize={searchPagination.hitsPerPage}
        />
      ) : (
        <Pagination
          locale={en_US}
          onChange={onChange}
          current={current}
          total={pagination.nbHits}
          pageSize={pagination.hitsPerPage}
        />
      )}
      <br />
      <div className="col-md-12 p-5">
        <div className="row">{mappedNews}</div>
      </div>
    </React.Fragment>
  );
};

export default Search;
