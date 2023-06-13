import {Button, Stack} from "@mui/material";
import img from "./banner.png"
import {useEffect, useRef, useState} from "react";
import {useMediaQuery} from "react-responsive";
import {useHistory} from "react-router-dom";



export default function Banner(){
    const isMobile = useMediaQuery({ maxWidth: 600 })
    const history = useHistory();

    const buttonStyle={
        position:'absolute',
        backgroundColor:'#1970F2',
        color:'white',
        fontFamily:'DniproCity',
        fontWeight:'bold',
        fontSize:isMobile?'10px':'30px',
        padding: isMobile?'4px 10px':'20px 50px',
        borderRadius: '150px',
        left:'60%',
        top: isMobile?'65%':'75%',
        ':hover': {
            backgroundColor: '#1970F2',
            color: '#FFE545'
        }
    }

    return <Stack minWidth={'90%'} marginTop={'50px'} marginLeft={'5%'} marginRight={'5%'} direction={'row'} position={"relative"}>
        <img src={img} alt="banner" width={'100%'}/>
        <Button sx={buttonStyle} onClick={()=>{history.push('/categories')}}>у магазин</Button>
        {/*<Stack position={'relative'}>*/}
        {/*    <Stack marginLeft={'-0%'} fontSize={80} marginTop={'20px'} fontFamily={'DniproCity'} fontWeight={'bold'} marginBottom={'50px'} textAlign={'left'}>*/}
        {/*        Купуй та подорожуй !*/}
        {/*    </Stack>*/}
        {/*    <Stack ref={textRef} fontSize={47} top={`calc(50% - ${width}px + 1%)`} fontFamily={'DniproCity'} fontWeight={'bold'} marginBottom={'50px'} color={'#1970F2'} position={'absolute'}>*/}
        {/*        з кожного продажу*/}
        {/*        на потреби ЗСУ*/}
        {/*    </Stack>*/}
        {/*</Stack>*/}
    </Stack>
}
