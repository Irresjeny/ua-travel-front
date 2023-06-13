import {Stack} from "@mui/material";
import * as React from "react";
import logo from './logo.svg'
import {useHistory} from "react-router-dom";
import {useMediaQuery} from "react-responsive";

export default function Logo() {
    const history = useHistory();
    const isMobile = useMediaQuery({maxWidth: 600})

    const style = {
        flexDirection:'row',
        alignItems:'center'
    }

    return <Stack  onClick={()=>{history.push('/')}}>

        <img src={logo} style={{height:'51px'}} alt={'logo'}></img>
        <Stack display={isMobile?'none':'flex'} sx={{fontSize:'20px', marginLeft: '10px'}}>UA Travel</Stack>
    </Stack>
}
