import "./App.css";
import React, { Component } from "react";
import Navbar from "./Component/Navbar";
import News from "./Component/News";

export default class App extends Component {
    render() {
        return (
            <>
                <Navbar />
                <News pageSize={5} country="in" category="general" />
            </>
        );
    }
}

// GET https://newsapi.org/v2/top-headlines?country=us&apiKey=f9214b6de98543aa9decf7a114aaafa3
