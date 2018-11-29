import React from "react";
import ReactDOM from "react-dom";
import Styled from "styled-components";
import 'babel-polyfill';

import Bulk from "./Bulk";
import Header from "./Header";
import NewPrescription from "./NewPrescription";
import ListPrescription from "./ListPrescription";

//Initialize Firebase
var config = {
    apiKey: "AIzaSyCYMbqBcd7RiyWk7LPzTBlIoLRm297-JhE",
    authDomain: "fikraspacedrugsapp.firebaseapp.com",
    databaseURL: "https://fikraspacedrugsapp.firebaseio.com",
    projectId: "fikraspacedrugsapp",
    storageBucket: "fikraspacedrugsapp.appspot.com",
    messagingSenderId: "280044973293"
};
firebase.initializeApp(config);
// connection setting for firebase
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
// Main class
class App extends React.Component {
    constructor(){
        super();
        this.state = {
            Drugs : [],
            UI    : "ListPrescription",           
        };
        this.getDrugsNameFromFile();
    }
    // get all drugs name from drugname.json file and push it into Drugs state
    getDrugsNameFromFile(){
        const DataFile  = require('./drugname.json');  //file size 4MB nearly and content nealy 50 thousand drug names
        let DragName    = []
        let UnqDrugName = []
        let xName;
        DataFile.map((index)=>{ DragName.push(index.brand_name.toLowerCase()); }); //push all drug names
        //check if there are doplicate name
        DragName.map((index)=>{ xName = UnqDrugName.indexOf(index);if(xName == -1){ UnqDrugName.push(index); } });
        this.state.Drugs = UnqDrugName;
    }
    // update UI when click on header button
    setUI(loc){
        let locArray = ["NewPrescription","ListPrescription"];
        if(locArray.indexOf(loc) > -1){
            this.setState({ UI : loc })
        }
    }

    render(){
        return (
            <Bulk.Provider value={{
                state  : this.state,
                action : {
                    setUIFun: (event)=>{ this.setUI(event); }
                }
            }}>
                <Header />
                <UI location={this.state.UI}/>
            </Bulk.Provider>
        )
    }
}

function UI(props){
    if(props.location == "NewPrescription"){ return (<NewPrescription />) }
    if(props.location == "ListPrescription"){ return (<ListPrescription />) }
    if(props.location == ""){ return (<br />) }
}

ReactDOM.render(
    <App />,
    document.getElementById('demo')
);