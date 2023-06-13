import {Stack} from "@mui/material";
import CarouselItem from "./Carousel/CarouselItem";
import {useState} from "react";
import {getRegionName} from "../metods/getRegionName";


export default function Carousel({data}) {
    const [index, setIndex] = useState(0)

    const nextIndex = () => {
        if (index + 1 >= data.length) {
            setIndex(0)
        } else {
            setIndex(index + 1)
        }
    }

    const prevIndex = () => {
        if (index - 1 < 0) {
            setIndex(data.length-1)
        } else {
            setIndex(index - 1)
        }
    }

    return <Stack width={'100%'} overflow={'hidden'}>
        <Stack flexDirection={'row'} sx={{transform:`translateX(-${index * 100}%)`, transition:'transform 0.3s'}}>
            {data?.map((item, i) => (
                <CarouselItem key={i} id={item.id} text={getRegionName(item.region)} title={item.name.toUpperCase()} backgroundUrl={item.image.split(/\r?\n/)[0]} famous={item.famous}
                              nextItem={nextIndex} prevItem={prevIndex}  />
            ))}
        </Stack>
    </Stack>
}
