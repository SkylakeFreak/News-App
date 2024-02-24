/* eslint-disable no-undef */
import React, { Component } from "react";
import Newsitem from "./Newsitem";
import { Spinner } from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps = {
   country: 'us',
   pageSize:8,
   category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,

  }
 
   capitlizeText = (string) => 
  {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0,
    }
    document.title =`${this.capitlizeText(this.props.category)} - News`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url =
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey} &page=${this.state.page}&pageSize=${this.props.pageSize}`;
  this.setState({ loading: true });
  let data = await fetch(url);
  let parsedData = await data.json();
  console.log(parsedData);
  this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false,  })
  this.props.setProgress(100);

  }

  async componentDidMount() {
    // console.log("render-1");
    // deceleration m-1 
    // let url =
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6ebac1506c104e69b4c1cb3e8fb2a26b &page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    // deceleration m-2 
    this.updateNews(); 

  }

  handlePrevClick = async () => {
    // console.log("Prev..")
    // deceleration m-1 
    // if (this.state.page - 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    // }
    // else {
    //   let url =
    //     `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6ebac1506c104e69b4c1cb3e8fb2a26b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //     page: this.state.page - 1,
    //     articles: parsedData.articles,
    //     loading: false
    //   })
    // }
    // deceleration m-2 
    this.setState({page: this.state.page - 1 })
    this.updateNews();


  }
  handleNextClick = async () => {
    console.log("Next");
    // deceleration m-1 
    // if (!(this.state.page + 1 >= Math.ceil(this.state.totalResults / this.props.pageSize))) {


    //   let url =
    //     `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ca9a869295214372a7b4c64e44571e25&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   // console.log(parsedData);

    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false

    //   })
    // }
    // deceleration m-2 
    this.setState({page: this.state.page + 1 })
    this.updateNews();




  }
  fetchMoreData = async () => {
   this.setState({page: this.state.page + 1});
   const url =
   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//  this.setState({ loading: true });
 let data = await fetch(url);
 let parsedData = await data.json();
 console.log(parsedData);
 this.setState({ 
  articles: this.state.articles.concat(parsedData.articles),
   totalResults: parsedData.totalResults,
     })
  };
  render() {
    console.log("render-2");
    return (
      <div className="container my-3">
        <h1 className="text-center " style={{ margin:'40px 0px'}}>News from {this.capitlizeText(this.props.category)}</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading &&<Spinner/>}
        >
          <div className="container">
         

        <div className="row">
          { this.state.articles.map((element) => {
            return (
              <div className="col md-4" key={element.url}>
                <Newsitem
                  title={element.title ? element.title.slice(0, 88) : ""}
                  description={element.description ? element.description.slice(0, 66) : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url} author={element.author} date={element.publishedAt}
                />
              </div>

            );
          })}  
          </div>
        </div>
        </InfiniteScroll>
        {/* /*{ {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col md-4" key={element.url}>
                <Newsitem
                  title={element.title ? element.title.slice(0, 88) : ""}
                  description={element.description ? element.description.slice(0, 66) : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url} author={element.author} date={element.publishedAt}
                />
              </div>
            );
          })}  }*/ }

        {/* <div className="container d-flex justify-content-between ">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 >= Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
       </div>
      // this.state.page<=1
    );
  }
}
//

export default News;
