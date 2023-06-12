import * as React from 'react';
import {Stack} from "@mui/material";
import RegionMenuButton from "./Menu/RegionMenuButton";
import Logo from "./Menu/Logo";
import ContactsMenuButton from "./Menu/ContactsMenuBatton";
import {useHistory} from "react-router-dom";




export default function NavBar({region, page}) {
    const history = useHistory();
    return <Stack flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'} marginTop={'10px'} borderBottom={'3px solid #828282'} paddingBottom={'20px'} width={'100%'}>
        <Logo/>
        <Stack sx={{textDecoration:page==='Головна'?'underline black':'', textUnderlineOffset: '2px', cursor:page==='Головна'?'default':'pointer'}}  fontSize={20} onClick={()=>{history.push('/')}}>Головна</Stack>
        <Stack sx={{textDecoration:page==='Магазин'?'underline black':'', textUnderlineOffset: '2px', cursor:page==='Магазин'?'default':'pointer'}} fontSize={20} onClick={()=>{history.push('/categories')}}>Магазин</Stack>
        <ContactsMenuButton/>
        <RegionMenuButton region={region}/>
    </Stack>
}
