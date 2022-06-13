import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general",
    };

    static PropTypo = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    };

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        };
    }
    async componentDidMount() {
        // console.log("cdn");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f9214b6de98543aa9decf7a114aaafa3&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        // console.log(data);
        let parseData = await data.json();
        // console.log(parseData);
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false,
        });
    }

    handalPreviousClick = async () => {
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${
            this.props.country
        }&category=${
            this.props.category
        }&apiKey=f9214b6de98543aa9decf7a114aaafa3&page=${
            this.state.page - 1
        }&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        // console.log("Next");
        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false,
        });
    };
    handalNextClick = async () => {
        // console.log("Next");
        if (
            !(
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
            )
        ) {
            let url = `https://newsapi.org/v2/top-headlines?country=${
                this.props.country
            }&category=${
                this.props.category
            }&apiKey=f9214b6de98543aa9decf7a114aaafa3&page=${
                this.state.page + 1
            }&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parseData = await data.json();

            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles,
                loading: false,
            });
        }
    };

    render() {
        // console.log("render");
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{ margin: "45px 0px" }}>
                    <b>NewsFox- Top Headline</b>
                </h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading &&
                        this.state.articles.map((element) => {
                            return (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem
                                        title={
                                            element.title ? element.title : ""
                                        }
                                        description={
                                            element.description
                                                ? element.description
                                                : ""
                                        }
                                        imgUrl={element.urlToImage}
                                        newsUrl={element.url}
                                    />
                                </div>
                            );
                        })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button
                        disabled={this.state.page <= 1}
                        type="button"
                        className="btn btn-success"
                        onClick={this.handalPreviousClick}
                    >
                        &larr; Previous
                    </button>
                    <button
                        disabled={
                            this.state.page + 1 >
                            Math.ceil(
                                this.state.totalResults / this.props.pageSize
                            )
                        }
                        type="button "
                        className="btn btn-success"
                        onClick={this.handalNextClick}
                    >
                        Next &rarr;
                    </button>
                </div>
            </div>
        );
    }
}

export default News;
