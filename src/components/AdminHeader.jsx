import React from "react";
import {Stack} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import {useHistory} from "react-router-dom";


const headerStyle = {
    backgroundColor:'rgb(255,255,255)',
    height:'9%',
    minHeight:'70px',
    maxHeight:'80px',
    width:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent: 'space-between',
}

const headerTextStyle= {
    color:'black',
    fontSize:'2em',
    marginLeft:'10px',
}


export default function AdminHeader() {
    const history = useHistory();

    const logOut = () => {
        alert('+')
        // sessionStorage.setItem('token', '');
        // history.push('/admin/authentication')
    }

    return <div style={headerStyle}>
       <Stack style={headerTextStyle}>UATravel</Stack>
        <LogoutIcon onClick={() => logOut()} sx={{fontSize:'40px', marginRight:'20px',}}/>
    </div>
}
