import {Button, Stack, TextField} from "@mui/material";
import img from "./news.png"
import {useEffect, useRef, useState} from "react";
import {useMediaQuery} from "react-responsive";



export default function News(){
    const ref = useRef(null)
    const [height, setHeight] = useState(0)
    const isMobile = useMediaQuery({ maxWidth: 600 })

    useEffect(()=>{
        if(ref.current){
            setHeight(ref.current.offsetHeight)
        }
    },[ref])

    const buttonStyle={
        position:'absolute',
        backgroundColor:'#1970F2',
        color:'white',
        fontFamily:'DniproCity',
        fontWeight:'bold',
        fontSize:isMobile?'10px':'30px',
        padding: isMobile?'4px 10px':'20px 50px',
        borderRadius: '150px',
        right:isMobile?'25%':'30%',
        top: isMobile?'60%':'65%',
        ':hover': {
            backgroundColor: '#1970F2',
            color: '#FFE545'
        }
    }

    const textFieldStyle={
        position:'absolute',
        backgroundColor:'white',
        fontFamily:'DniproCity',
        fontWeight:'bold',
        borderRadius: '150px',
        left:isMobile?'5%':'10%',
        top: isMobile?'60%':'65%',
        width:isMobile?'60%':'50%',
        height:height,

    }

    const textInputStyle={
        borderRadius: '150px',
        height:height,
        fontSize:isMobile?'12px':'18px'
    }

    return <Stack minWidth={'90%'} marginTop={'50px'} marginLeft={'5%'} marginRight={'5%'} direction={'row'} position={"relative"}>
        <img src={img} alt="banner" width={'100%'}/>
        <TextField sx={textFieldStyle} InputProps={{ sx: textInputStyle }} InputLabelProps={{sx:{paddingTop:isMobile?'0px':'4px', top:isMobile?'-28%':'0px', fontSize:isMobile?'12px':'18px'}}} label={'Введи свою пошту'} type={'email'}/>
        <Button sx={buttonStyle} ref={ref}>відправити</Button>
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
