import React, { useContext, useEffect, useState } from 'react';
import '../App.css';
import { UserContext } from '../App';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
const { Header } = Layout;



function MyMenu() {
    const { state } = useContext(UserContext);
    const [loggedUser,setLoggedUser]=useState("dummy12")
    

    useEffect(()=>{
       
        if(state) console.log(state.username)
    },[state])

    return (
        <Layout>
            <Header style={{ position: "fixed", zIndex: "1", width: "100%" }} className="myMenu">
                <p className="logo"> Online Voting App </p>
                {
                    !state ?
                        (
                            <Menu theme="dark" mode="horizontal">
                                <Menu.Item key="1" style={{ float: "right" }}>
                                    <Link to="/signup" > Sign Up </Link>
                                </Menu.Item>

                                <Menu.Item key="2" style={{ float: "right" }}>
                                    <Link to="/signin" > Sign In </Link>
                                </Menu.Item>
                            </Menu>
                        )
                        :
                        (
                            <Menu theme="dark" mode="horizontal">
                                <Menu.Item key="1" style={{ float: "right" }} >
                                    <Link to="/mypolls">< img alt="Profile" src="https://img.icons8.com/ultraviolet/40/000000/gender-neutral-user.png" style={{ width: "30px", height: "auto" }} /></Link>
                                </Menu.Item>

                              { (state.username==="sparsh")? <Menu.Item key="2" style={{ float: "right" }}>
                                    <Link to="/createPoll" > Create Poll </Link>
                                </Menu.Item>:<></>}

                                <Menu.Item key="3" style={{ float: "right" }}>
                                    <Link to="/discover" > Discover </Link>
                                </Menu.Item>
                            </Menu>
                        )
                }
            </Header>
        </Layout>
    )
}

export default MyMenu;