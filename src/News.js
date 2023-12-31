import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "science",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  // static capitalizeFirstLetter(string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }

  constructor(props) {
    super(props);
    console.log("I am a constructor from News Component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.props.category} - What's New`;
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=b2004c55fb0041a2b2dd60e07d0fb4e9&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totslResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=b2004c55fb0041a2b2dd60e07d0fb4e9&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    let data = fetch(url);
    let parsedData = await (await data).json();
    console.log(data);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
    });
  }

  handlePreviousClick = async () => {
    if (this.state.page > 1) {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=b2004c55fb0041a2b2dd60e07d0fb4e9&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      // Change pageSize to 8

      try {
        let response = await fetch(url);
        let parsedData = await response.json();

        this.setState({
          page: this.state.page - 1,
          articles: parsedData.articles,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=b2004c55fb0041a2b2dd60e07d0fb4e9&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`; // Change pageSize to 8

    try {
      let response = await fetch(url);
      let parsedData = await response.json();

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // fetchMoreData = () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">What's New - Top Headlines</h2>

        <div className="row">
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            // loader={<h4>Loading...</h4>}
          />
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-3" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.articles.length === this.state.totalArticles}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
