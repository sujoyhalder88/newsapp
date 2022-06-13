import React, { Component } from "react";

export class NewsItem extends Component {
    render() {
        let { title, description, imgUrl, newsUrl } = this.props;
        return (
            <div className="container my-3">
                <div className="card">
                    <img
                        src={
                            !imgUrl
                                ? "https://st1.bollywoodlife.com/wp-content/uploads/2022/06/Nayan-1-2-600x315.png"
                                : imgUrl
                        }
                        className="card-img-top"
                        alt="Error"
                    />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a
                            href={newsUrl}
                            target="__blank"
                            className="btn btn-sm btn-dark"
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
