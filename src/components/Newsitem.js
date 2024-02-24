/* eslint-disable react/style-prop-object */
import React, { Component } from 'react'

export class Newsitem extends Component {

  render() {
  let {title , description, imageUrl ,newsUrl,author,date}= this.props; 
    return (
      <div className="my-3">
        <div className="card" style={{width:"20rem"}}>
  <img src={imageUrl} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{title }</h5>
    <p className="card-text">{description }</p>
    <p className="card-text"><small className="text-muted">By{!author?"UnKnown":author} On {new Date (date).toGMTString()}</small></p>
    <a real="noreferrer"href={newsUrl} target="_blank" className="btn btn-sm btn-dark" rel="noreferrer">Read More</a>
  </div>
</div>
      </div>
    )
  }
}
// https://images.newindianexpress.com/uploads/user/imagelibrary/2022/11/11/w900X450/Rohit_Kohli_27101-ap10_27_2022_000060a.jpg?w=640&dpr=1.3

export default Newsitem
