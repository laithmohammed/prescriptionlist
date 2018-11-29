import React from "react";
import Styled from "styled-components";

import Bulk from "./Bulk";

let Header1 = Styled.div `top:40px;left:0px;width:80%;padding:50px 10%;align-items:center;justify-content:space-between;display:flex;`;
let Button  = Styled.button `font-size:1em;padding:12px 22px;border-radius:40px;border:2px solid #2c509a;font-family: 'Lora', serif;font-weight:bold;
                                background-color:#fff;color:#2c509a;outline:none;cursor:pointer;margin:0px 4px;text-transform:capitalize;
                            &:hover {background-color:#2c509a;color:#fff;font-weight:unset;border:2px solid #fff;}
                            &:active {background-color:#3058a9;color:#fff;font-weight:unset;border:2px solid #fff;}`;

class Header extends React.Component {
    render(){
        return(
            <Bulk.Consumer>
                {(app)=>{
                    return(
                        <React.Fragment>
                            <Header1>
                                <div>
                                    <Button onClick={()=>{ app.action.setUIFun("ListPrescription") }}>prescription list</Button>
                                </div>
                                <div>
                                    <Button onClick={()=>{ app.action.setUIFun("NewPrescription") }}>new prescription</Button>
                                </div>
                            </Header1>
                        </React.Fragment>
                    )
                }}
            </Bulk.Consumer>
        )
    }
}
export default Header;