import React from "react";
import {Stack} from "@mui/material";
import {Link} from "react-router-dom";
import logo from "./Menu/logo.svg";
export default function AdminNavBar({active, height}) {
    let menuStyle ={
        width: '17%',
        minWidth:'230px',
        maxWidth:'400px',
        backgroundColor:'rgb(44 140 213)',
        display:'flex',
        alignItems:'start',
        // height: document.documentElement.offsetHeight
    }
    let activeItemStyle={
        outline:'none',
        textDecoration:'none',
        color:'#FFE545',
        marginLeft:10,
        fontSize: 25,
        display:'flex',
        alignItems:'center'
    }
    let inactiveItemStyle={
        outline:'none',
        textDecoration:'none',
        color:'white',
        marginLeft:10,
        fontSize: 25,
        display:'flex',
        alignItems:'center'
    }
    return <Stack style={menuStyle}>
        <Link to="/"  style={inactiveItemStyle}>
            <img src={logo} style={{height:'51px'}} alt={'logo'}></img>
        </Link>
        <Link to="/admin/orders" style={active==='Orders'?activeItemStyle:inactiveItemStyle}> Замовлення</Link>
        <Link to="/admin/places" style={active==='Places'?activeItemStyle:inactiveItemStyle}>Пам'ятки</Link>
        <Link to="/admin/categories" style={active==='Categories'?activeItemStyle:inactiveItemStyle}> Категорії</Link>
        <Link to="/admin/goods" style={active==='Goods'?activeItemStyle:inactiveItemStyle}>Товари</Link>
    </Stack>
}
