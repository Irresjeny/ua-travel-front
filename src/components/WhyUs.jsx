import {useRef, useState} from "react";
import {Stack} from "@mui/material";
import {useMediaQuery} from "react-responsive";
import planet from "./WhyUs/planet.png"
import stars from "./WhyUs/stars.png"
import lock from "./WhyUs/lock.png"

export default function WhyUs() {
    const isMobile = useMediaQuery({maxWidth: 600})

    const imageStyle = {
        width: '200px',
    }

    return <Stack width={'90%'} marginLeft={'5%'} marginRight={'5%'} >
        <Stack fontSize={isMobile ? 40 : 80} marginTop={'50px'}
               fontFamily={'DniproCity'}
               fontWeight={'bold'} marginBottom={'50px'} alignItems={ 'flex-start'}>Чого ми?</Stack>
        <Stack minWidth={'90%'} marginTop={'50px'} direction={isMobile?'column':'row'}
               justifyContent={'space-around'} >
            <Stack direction={'column'} width={'330px'} alignItems={'center'}>
                <img src={planet} style={imageStyle}/>
                <Stack fontWeight={'bold'} fontSize={'23px'}>
                    Великий вибір
                </Stack>
                <Stack fontSize={'18px'}>
                    Ми зібрали для вас найкрутіші розважальні центри та культурні місця, щоб ваш відпочинок був
                    найвдаліший.
                </Stack>
            </Stack>
            <Stack direction={'column'} width={'330px'} alignItems={'center'}>
                <img src={stars} style={imageStyle}/>
                <Stack fontWeight={'bold'} fontSize={'23px'}>
                    Рейтинг
                </Stack>
                <Stack fontSize={'18px'}>
                    Ми додали змогу оцінки вашого “туру”, задля того, щоб всі ваші очікування виправдались.
                </Stack>
            </Stack>
            <Stack direction={'column'} width={'330px'} alignItems={'center'}>
                <img src={lock} style={imageStyle}/>
                <Stack fontWeight={'bold'} fontSize={'23px'}>
                    Надійність
                </Stack>
                <Stack fontSize={'18px'}>
                    З нашим магазином ваш відпочинок стане найнадійнішим, адже ми підготували для вас всі товари першої
                    необхідності.
                </Stack>
            </Stack>
        </Stack>
    </Stack>


}
