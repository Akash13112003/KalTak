import React, { Component } from 'react'

export class NewsItem extends Component {
 
  render() {
     let {title, description,imageUrl,newsUrl} = this.props;
    return (
      <div>
        <div className="card" style={{width: "14rem"}}>
          <img src={!imageUrl?"https://i.postimg.cc/nzLfGs4y/breaking-1618708354-1625446391.jpg":imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <a href={newsUrl} target="blank" className="btn btn-sm btn-outline-danger">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem