import NavBar from "../NavBar";
import {Stack} from "@mui/material";
import Card from "../Card";
import Carousel from "../Carousel";
import ScrollContainer from "react-indiana-drag-scroll";
import {useEffect, useRef, useState} from "react";
import Banner from "./Main/Banner";
import MediaQuery, {useMediaQuery} from "react-responsive";
import MainGoodCard from "../MainGoodCard";
import {scrollContainerStyle} from "../styles";
import WhyUs from "../WhyUs";
import {FamousPlaces, MainCarouselPlaces} from "../../data/places";
import {MainGoods} from "../../data/goods";
import {useHistory} from "react-router-dom";
import MobileNavBar from "../MobileNavBar";
import * as React from "react";
import {config} from "../../config";




export default function Main(){
    const container = useRef(null);
    const [carouselData, setCarouselData] = useState([])
    const [placesData, setPlacesData] = useState([])
    const [goods, setGoods] = useState([])
    const history = useHistory();

    const isMobile = useMediaQuery({ maxWidth: 600 })

    const linkStyle = {
        textDecoration:'underline',
        ':hover':{
            color:'#1970F2',
            cursor: 'pointer'
        }
    }


    useEffect(()=>{
        fetch(`${config.host}/places/?isMainCarousel=true`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        }).then((response) => {
            if (response.status === 200) {
                console.log(response)
                response.text().then((data) => {
                    console.log(data)
                    let res = JSON.parse(data.replace(/\bNaN\b/g, "null"));
                    setCarouselData(res.places)
                })
            } else if (response.status === 401) {
                history.push('/admin/authentication', {from: "/admin/places"})
            }
        })
        fetch(`${config.host}/places/?famous=true`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        }).then((response) => {
            if (response.status === 200) {
                console.log(response)
                response.text().then((data) => {
                    console.log(data)
                    let res = JSON.parse(data.replace(/\bNaN\b/g, "null"));
                    setPlacesData(res.places)
                })
            } else if (response.status === 401) {
                history.push('/admin/authentication', {from: "/admin/places"})
            }
        })
        fetch(`${config.host}/goods/?isMain=true`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        }).then((response) => {
            if (response.status === 200) {
                console.log(response)
                response.text().then((data) => {
                    console.log(data)
                    let res = JSON.parse(data.replace(/\bNaN\b/g, "null"));
                    // setPlacesData(res.places)
                    setGoods(res.goods)
                })
            } else if (response.status === 401) {
                history.push('/admin/authentication', {from: "/admin/places"})
            }
        })

    },[])

    useEffect(()=>{

    })


    return <Stack alignItems={"flex-start"} marginLeft={isMobile?'0':'10%'} marginRight={isMobile?'0':'10%'}>
        <MediaQuery minWidth={801}>
            <NavBar page={'Головна'}/>
        </MediaQuery>
        <MediaQuery maxWidth={800}>
            <MobileNavBar page={'Головна'}/>
        </MediaQuery>
        <Stack marginLeft={'5%'} fontSize={isMobile?40:88} fontFamily={'DniproCity'} fontWeight={'bold'}>Подорожуй Україною з нами</Stack>
        <MediaQuery minWidth={801}>
            <Carousel data={carouselData} />
        </MediaQuery>
        <Stack marginLeft={'5%'} fontSize={isMobile?40:80} marginTop={'50px'} fontFamily={'DniproCity'} fontWeight={'bold'} marginBottom={'50px'}>Популярне</Stack>
        <Stack flexDirection={'row'} style={{width:'100%'}}>
            <ScrollContainer style={scrollContainerStyle} vertical={false}>
                {placesData?.map((place, i)=>{
                    return <Card place={place} key={i}/>
                })}

            </ScrollContainer>
            {/*<img src={arrowNext} onClick={()=> scroll()} style={{color:'black', marginRight:'150px'}}/>*/}
        </Stack>
        <Banner/>
        <Stack marginLeft={'5%'} fontSize={isMobile?40:80} marginTop={'50px'} fontFamily={'DniproCity'}
               fontWeight={'bold'} marginBottom={'50px'}
               sx={linkStyle} onClick={()=>{history.push('/categories')}}>Купуй зараз найнеобхідніше:</Stack>
        <Stack flexDirection={'row'} style={{ width:'100%'}}>
            <ScrollContainer style={scrollContainerStyle} vertical={false}>
                {
                    goods?.map((good)=>{
                        return <MainGoodCard good={good}/>
                    })
                }
            </ScrollContainer>
            {/*<img src={arrowNext} onClick={()=> scroll()} style={{color:'black', marginRight:'150px'}}/>*/}
        </Stack>
        <WhyUs/>
    </Stack>
}
