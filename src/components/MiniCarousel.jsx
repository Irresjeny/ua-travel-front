import {Stack} from "@mui/material";
import CarouselItem from "./Carousel/CarouselItem";
import {useState} from "react";
import {getRegionName} from "../metods/getRegionName";
import arrowBack from "./arrowBackBlack.svg";
import arrowNext from "./arrowNextBlack.svg";
import {useMediaQuery} from "react-responsive";


export default function MiniCarousel({data, width='90%', height='60%', bigArrow=false}) {
    const [index, setIndex] = useState(0)

    const nextIndex = () => {
        if (index + 1 >= data.length) {
            setIndex(0)
        } else {
            setIndex(index + 1)
        }
    }

    const isMobile = useMediaQuery({ maxWidth: 600 })

    const prevIndex = () => {
        if (index - 1 < 0) {
            setIndex(data.length-1)
        } else {
            setIndex(index - 1)
        }
    }

    return <Stack width={width}  height={height} overflow={'hidden'} marginLeft={'auto'} marginRight={'auto'} marginTop={'1%'} borderRadius={'40px'}>
        <Stack height={'95%'} flexDirection={'row'} sx={{transform:`translateX(-${index * 100}%)`, transition:'transform 0.3s'}}>
            {data.map((item, i) => (
                    <Stack minWidth={'100%'} key={i}  height={'95%'} sx={{background: `url(${item}) no-repeat center center`, backgroundSize:'contain'}} borderRadius={'40px'}/>
            ))}

        </Stack>
        <Stack display={data.length>1?'flex':'none'} flexDirection={'row'} justifyContent={'space-between'}>
            <img color={'black'}  src={arrowBack} onClick={prevIndex} style={{cursor: 'pointer'}} width={isMobile?'30%':bigArrow?'30%':'10%'}/>
            <img  src={arrowNext} onClick={nextIndex} style={{cursor: 'pointer'}}  width={isMobile?'30%':bigArrow?'30%':'10%'}/>
        </Stack>
    </Stack>
}
