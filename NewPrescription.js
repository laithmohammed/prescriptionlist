import React from "react";
import Styled from "styled-components";
import { Autocomplete, TextInput, IconButton } from 'evergreen-ui'

import Bulk from "./Bulk";

// element style
let Contain = Styled.div `width:80%;margin:0px 10%;justify-content:flex-start;display:flex;`;
let Contain1= Styled.div `width:80%;margin:0px 10%;`;
let Contain2= Styled.div `width:80%;margin:0px 10%;justify-content:flex-end;display:flex;margin-top:40px;`;
let Div     = Styled.div `opacity:1;width:auto;padding-top:40px;position:relative;`;
let Table   = Styled.table `background-color:#eee;margin-top:40px;`; 
let Tr      = Styled.tr `background-color:white;`;
let Tr1     = Styled.tr `background-color:#efefef;border:0px;margin:0px;`;
let Td1     = Styled.td `padding:1em;font-weight:bold;font-size:1em;position:relative;vertical-align:top;border-bottom:2px solid black;width:5%;`;
let Td2     = Styled.td `padding:1em;font-weight:bold;font-size:1em;position:relative;vertical-align:top;border-bottom:2px solid black;width:30%;`;
let Td3     = Styled.td `padding:1em;font-weight:bold;font-size:1em;position:relative;vertical-align:top;border-bottom:2px solid black;width:60%;`;
let Td4     = Styled.td `padding:1em;font-weight:bold;font-size:1em;position:relative;vertical-align:top;border-bottom:2px solid black;width:5%;`;
let Img     = Styled.img `width:100%;`;
let TextArea= Styled.textarea `width:100%;outline:none;border:unset;font-size:1em;height:80px;`;
let Button  = Styled.button `font-size:1em;padding:12px 22px;border-radius:40px;border:2px solid #2c509a;font-family: 'Lora', serif;font-weight:bold;
                                background-color:#fff;color:#2c509a;outline:none;cursor:pointer;margin:0px 4px;text-transform:capitalize;
                            &:hover {background-color:#2c509a;color:#fff;font-weight:unset;border:2px solid #fff;}
                            &:active {background-color:#3058a9;color:#fff;font-weight:unset;border:2px solid #fff;}`;
let Input   = Styled.input `font-size:1em;padding:0px 22px;border-radius:40px;border:2px solid #2c509a;font-family:'Lora', serif;font-weight:bold;
                            background-color:#fff;color:#000;outline:none;width:350px;margin-top:20px;height:2.7em;
                            &::placeholder {color:#a7b1bb;}`;

// main class
class Container extends React.Component {
    constructor(){
        super();
        this.state = {
            NewPrespName : "",
            NewPrespDate : "",
            NewPrespAge  : "",
            DefaultSpace : "",
            NewPrespData : [],
            SaveAction   : "",
            inputStyle : {
                fontSize:"1em", padding:"12px 22px",borderRadius:"40px",border:"2px solid #2c509a",
                fontFamily: "'Lora', serif", fontWeight:"bold", backgroundColor:"#fff", color:"#000",
                outline:"none", width:"400px", marginTop:"20px", height: "3em"
            },
            IconButton : {
                marginTop:"-49px",position:"absolute",right:"-56px",borderRadius:"25px",border:"2px solid #2c509a"
            }
        }
    }
    // update Case name when the client keyup at name input field
    setNameCase(name){
        let date = Date.now(); //(Date.now()).toString().substr(0,24);
        this.setState({ NewPrespName : name , NewPrespDate : date })
    }
    // update Case age when the client keyup at age input field
    setAgeCase(age){
        this.setState({ NewPrespAge : age })
    }
    // update drug name when the client keyup at drug input field before add it
    setDefaultDrug(drug){
        this.setState({ DefaultSpace : drug })
    }
    // add new drug name to data and store it
    addNewDrug(){
        let DrugName = this.state.DefaultSpace;
        if (DrugName.length > 0){
            let DrugsData   = this.state.NewPrespData;
            let index       = DrugsData.length
            let Obj         = new Object();
            Obj.drugname    = DrugName;
            Obj.description = "";
            DrugsData[index] = Obj;
            //i dont know why 86 command line is not work, if you know please tell me
            document.getElementById("DrugName").value = "";
            this.setState({
                NewPrespData : DrugsData,
                DefaultSpace : ""
            });
        }else{
            alert('first select one drug then add !!!')
        }
    }
    // update drug description when the client keyup at drug description input field
    updateDrugDesription(event){
        let DrugsData   = this.state.NewPrespData;
        let index       = event.target.title;
        DrugsData[index].description = event.target.value;
        this.setState({ NewPrespData : DrugsData })
    }
    // remove cetain drug that you add before, when click on red cross icon
    removeDrug(event){
        let DrugsData   = this.state.NewPrespData;
        let index       = event.target.alt
        let NewDate     = [];
        DrugsData.map((drug,i)=>{ if(index != i){ NewDate.push(drug); } })
        this.setState({ NewPrespData : NewDate })
    }
    // save prescription data to firebase database and chandge UI to list of prescriiption
    saveNewPresp(){
        let year = new Date(); 
        let Name = this.state.NewPrespName;
        let Age  = this.state.NewPrespAge
        let Birth= year.getFullYear() - parseInt(Age);
        let Time  = this.state.NewPrespDate.toString();
        let Data = JSON.stringify(this.state.NewPrespData);
        if(Name.length > 0 && Age.length > 0 && Time.length > 0 && Data.length > 2){
            firebase.firestore().collection('case').add({
                birth: Birth,
                data : Data,
                date : Time,
                name : Name
            });
            alert("your new prescription is saved");
            this.setState({
                NewPrespName : "",
                NewPrespAge  : "",
                NewPrespDate : "",
                NewPrespData : [],
                DefaultSpace : "",
            });
            this.state.SaveAction = "Done";
        }else{
            alert("your new prescription is not saved, check you inserted data !!")
        }
    }

    render(){
        return(<Bulk.Consumer>{(app)=>{
            console.log(this.state);
            return(
                <React.Fragment>
                    <Contain>
                        <Div>
                            <Input type="text" placeholder="Case Full name Ex: Johne Doe Loram" onKeyUp={(event)=>{this.setNameCase(event.target.value)}} defaultValue={this.state.NewPrespName}/><br/>
                            <Input type="number" placeholder="Case Age Ex: 26" onKeyUp={(event)=>{this.setAgeCase(event.target.value)}} onChange={(event)=>{this.setAgeCase(event.target.value)}} defaultValue={this.state.NewPrespAge}/>
                            <Autocomplete title="drug" items={app.state.Drugs} onChange={(changedItem)=>{ this.setDefaultDrug(changedItem); }} >
                                    {(props) => {
                                        const { getInputProps, getRef, inputValue } = props
                                        return ( <TextInput placeholder="Type a drug name Ex: Paracetamol" value={inputValue} innerRef={getRef} {...getInputProps()} style={this.state.inputStyle} id="DrugName"/> )
                                    }}
                            </Autocomplete>
                            <IconButton icon="add" height={50} style={this.state.IconButton} onClick={()=>{this.addNewDrug()}}/>
                        </Div> 
                    </Contain>
                    <Contain1>
                        <Table><tbody>
                            <Tr1>
                                <Td1>No.</Td1>
                                <Td2>Drug name</Td2>
                                <Td3>Description</Td3>
                                <Td4>State</Td4>
                            </Tr1>
                            {this.state.NewPrespData.map((item,i)=>{
                                return (
                                    <Tr key={i}>
                                        <Td1><Img src={require("./assets/druglogo.png")} /></Td1>
                                        <Td2>{item.drugname}</Td2>
                                        <Td3><TextArea placeholder="Description" defaultValue={item.description} title={i} onKeyUp={(event)=>{ this.updateDrugDesription(event) }}></TextArea></Td3>
                                        <Td4><Img src={require("./assets/redcross.png")} alt={i} onClick={(event)=>{ this.removeDrug(event) }}/></Td4>
                                    </Tr>
                                )
                            })}
                        </tbody></Table>
                    </Contain1>
                    <Contain2>
                    `   <Button onClick={(event)=>{this.saveNewPresp(event);if(this.state.SaveAction == "Done"){app.action.setUIFun("ListPrescription")}}}>save</Button>
                    </Contain2>
                </React.Fragment>)
            }}</Bulk.Consumer>
        )
    }
}
export default Container;