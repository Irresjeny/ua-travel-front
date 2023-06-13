import NavBar from "../NavBar";
import CarouselItem from "../Carousel/CarouselItem";
import {Breadcrumbs, Button, Link, MenuItem, Select, Stack, Typography} from "@mui/material";
import Card from "../Card";
import ScrollContainer from "react-indiana-drag-scroll";
import {useEffect, useLayoutEffect, useRef, useState} from "react";

import MediaQuery, {useMediaQuery} from "react-responsive";
import MainGoodCard from "../MainGoodCard";
import {scrollContainerStyle} from "../styles";
import {useHistory, useParams} from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {getRegionName} from "../../metods/getRegionName";
import {AllPlacesList} from "../../data/places";
import {MainGoods} from "../../data/goods";
import {allCategory} from "../../data/category";
import CategoryCard from "../CategoryCard";
import MobileNavBar from "../MobileNavBar";
import * as React from "react";
import {config} from "../../config";


export default function AllCategories() {
    const history = useHistory();
    const [categories, setCategories] = useState([])


    const isMobile = useMediaQuery({maxWidth: 600})


    useEffect(() => {
        fetch(`${config.host}/category/`, {
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setCategories(data.category)
                })
            }
        })
        // setCategories(allCategory)
    }, [])



    return <Stack alignItems={"flex-start"} marginLeft={isMobile?'0':'5%'} marginRight={isMobile?'0':'5%'}>
        <MediaQuery minWidth={801}>
            <NavBar page={'Головна'}/>
        </MediaQuery>
        <MediaQuery maxWidth={800}>
            <MobileNavBar page={'Головна'}/>
        </MediaQuery>
        <Stack marginLeft={'5%'} fontSize={isMobile?40:80} marginTop={'50px'} fontFamily={'DniproCity'} fontWeight={'bold'} marginBottom={'50px'}>Всі категорії</Stack>
        <Stack marginLeft={'5%'} marginTop={'50px'} flexDirection={'row'} flexWrap={'wrap'} marginRight={'5%'}
               justifyContent={isMobile ? 'center' : 'flex-start'}>
                {
                    categories.map((category, i) => {
                        return <CategoryCard category={category} key={i}/>
                    })
                }
        </Stack>
    </Stack>
}
