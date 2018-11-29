import React from "react"
import Styled from "styled-components";

import Paper from "./File";
//element style
let Div   = Styled.div `position:absolute;opacity:0;z-index:-3;top:0px;`;
let Main  = Styled.div `width:700px;height:1000px;padding:50px;background-color:white;position:absolute;top:0px;left:0px;border-right:1px solid black;`;
let Cover = Styled.div `font-size:1em;padding:12px 22px;border-radius:40px;border:2px solid #2c509a;font-weight:bold;background-color:#fff;color:#2c509a;outline:none;cursor:pointer;margin:0px 4px;text-transform:capitalize;`
let Logo  = Styled.img `position:absolute;top:550px;left:400px;transform:translate(-50%,-50%);width:400px;opacity:0.3;`;
let Text1 = Styled.div `width:100%;text-align:center;font-weight:bolder;padding-top:20px;font-size:2em;`;
let Info  = Styled.div `width:100%;text-align:left;font-size:1.2em;padding-top:20px;`;
let Table = Styled.table `background-color:#eee;margin-top:40px;`;
let Tr    = Styled.tr `background-color:white;`;
let Tr1   = Styled.tr `background-color:#efefef;border:0px;margin:0px;`;
let Td1   = Styled.td `padding:1em;font-weight:bold;font-size:1em;position:relative;vertical-align:top;border-bottom:2px solid black;width:5%;`;
let Td2   = Styled.td `padding:1em;font-weight:bold;font-size:1em;position:relative;vertical-align:top;border-bottom:2px solid black;width:30%;`;
let Td3   = Styled.td `padding:1em;font-weight:bold;font-size:1em;position:relative;vertical-align:top;border-bottom:2px solid black;width:65%;`;
let Signature = Styled.div `position:absolute;top:900px;left:550px;`
let Text2     = Styled.div `font-weight:bolder;font-size:1.2em;`
let SignImg   = Styled.img `width:150px;`
let Close     = Styled.img `width:40px;position:absolute;left:780px;top:30px;z-index:5;cursor: pointer;`

class PdfGenerator extends React.Component {
    render(){
        return(
        <Paper.Consumer>
            {(app)=>{
                let D = new Date();
                let age = D.getFullYear() - parseInt(app.state.birth);
                let data = JSON.parse(app.state.data);
                console.log(data)
                return (
                    <Div id="View">
                        <Close src={require("./assets/redcross.png")} alt="close icon" onClick={()=>{app.action.ClosePaperFun()}}/>
                        <Main id="pdfDemo">
                            <Cover>doctorpiea app</Cover>
                            <Text1>Prescription List</Text1>
                            <Info>
                                <div><b>For : </b>{app.state.name}</div>
                                <div><b>Age : </b>{age} years</div>
                                <div><b>Date : </b>{app.state.date}</div>
                            </Info>
                            <Table><tbody>
                                    <Tr1>
                                        <Td1>No.</Td1>
                                        <Td2>Drug name</Td2>
                                        <Td3>Description</Td3>
                                    </Tr1>
                                    {data.map((item,i)=>{
                                        return(
                                            <Tr key={i}>
                                                <Td1>{i+1}</Td1>
                                                <Td2>{item.drugname}</Td2>
                                                <Td3>{
                                                    item.description.split('\n').map((line, i) => {
                                                        return <span key={i}>{line}<br/></span>
                                                      })
                                                }</Td3>
                                            </Tr>
                                        )
                                    })}
                                    
                            </tbody></Table> 
                            <Signature>
                                <SignImg src={require("./assets/sign.png")} alt="signature" />
                                <Text2>Dr. Johne Doe silva</Text2>
                            </Signature>
                            <Logo src={require("./assets/logo1.png")} alt="logo" />
                        </Main>
                    </Div>
                )
            }}
        </Paper.Consumer>
        )
    }
}

export default PdfGenerator;