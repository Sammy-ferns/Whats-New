import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div>
        <div className="card my-2">
          <img
            src={
              !imageUrl
                ? "https://media.wired.com/photos/6525c8ac419624284be05210/191:100/w_1280,c_limit/HANF-Michael%20Casey.jpg"
                : imageUrl
            }
            className="card-img-top"
            style={{ width: "100%", height: "15rem" }}
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}...
              <span
                className="position-absolute top-0 translate-middle badge rounded-pill bg-success"
                style={{ left: "85%", zIndex: "1" }}
              >
                {source}
              </span>
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} on
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-primary"
              rel="noreferrer"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
