
import './App.css';



import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

import {
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";

export default class App extends Component {
pageSize=5;
apiKey= process.env.REACT_APP_NEWS_API;
state={
  process: 0,
}
setProgress =  (process)=>{
  this.setState({process:process})
}
  render() {
    return (
      <div>
      <BrowserRouter>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        height={3}
        
        progress={this.state.process}
      
      />
      <Routes>

        <Route exact path="/" element={ <News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize}  country="us" category="general"/>} />
        <Route exact path="/business" element={ <News setProgress={this.setProgress} apiKey={this.apiKey} mkey="business" pageSize={this.pageSize}  country="us" category="business"/>} />
        <Route exact path="/entertainment" element={ <News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="us" category="entertainment"/>} />
        <Route exact path="/general" element={ <News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize}  country="us" category="general"/>} />
        <Route exact path="/health" element={  <News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize}  country="us" category="health"/>} />
        <Route exact path="/science" element={ <News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize}  country="us" category="science"/>} />
        <Route exact path="/sports" element={ <News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize}  country="us" category="sports"/>} />
        <Route exact path="/technology" element={ <News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize}  country="us" category="technology"/>} />



        
      </Routes>
  
    </BrowserRouter>
      </div>
    )
  }
}

