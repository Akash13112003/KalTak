import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';

export class News extends Component {
   static defaultProps= {
     country:'in',
     pageSize:8,
     category:'general'
   }
   static propTypes={
     country:PropTypes.string,
     pageSize:PropTypes.number,
     category:PropTypes.string
   }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1,
    };
  }
  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=593ea123154047c3b61f00a60a057039&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data= await fetch(url);
    let parseData= await data.json();
    this.setState({articles: parseData.articles,
                  totalResults: parseData.totalResults,
                loading:false})
  }
  handleNextClick= async ()=>{
      console.log('Next');
      if(!(this.state.page +1> Math.ceil(this.state.totalResults/20))){
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}category=${this.props.category}&apiKey=593ea123154047c3b61f00a60a057039&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data= await fetch(url);
      let parseData= await data.json();
      this.setState({
        page:this.state.page +1,
        articles: parseData.articles,
        loading:false
      })
    }
  }
  handlePrevClick= async ()=>{
     console.log('Previous');
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}category=${this.props.category}&apiKey=593ea123154047c3b61f00a60a057039&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data= await fetch(url);
      let parseData= await data.json();
      this.setState({
        page:this.state.page -1,
        articles: parseData.articles,
        loading:false
      })
  }
  render() {
    return (
      <div className="container my-3">
        <h1 style={{textAlign:'center',color:'#e32517',margin:'30px'}}>KalTak-Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col md-6" key={element.url}>
                <NewsItem
                  title={element.title?element.title.slice(0,66):""}
                  description={element.description?element.description.slice(0,78):""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-danger" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button type="button" className="btn btn-danger" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
