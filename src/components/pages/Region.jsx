import NavBar from "../NavBar";
import CarouselItem from "../Carousel/CarouselItem";
import {Button, Stack} from "@mui/material";
import Card from "../Card";
import Carousel from "../Carousel";
import ScrollContainer from "react-indiana-drag-scroll";
import arrowNext from "../arrowNextBlack.svg";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import Banner from "./Main/Banner";
import MediaQuery, {useMediaQuery} from "react-responsive";
import MainGoodCard from "../MainGoodCard";
import {scrollContainerStyle} from "../styles";
import WhyUs from "../WhyUs";
import {useHistory, useParams} from "react-router-dom";
import News from "./Region/News";
import {AllPlacesList, FamousPlaces, MainCarouselPlaces, RegionCarouselPlaces} from "../../data/places";
import {getRegionName} from "../../metods/getRegionName";
import {MainGoods} from "../../data/goods";
import MobileNavBar from "../MobileNavBar";
import * as React from "react";
import {config} from "../../config";


export default function Region(){
    const id = useParams().id;
    const container = useRef(null);
    const [num, setNum] = useState(0)
    const history = useHistory();
    const [carouselData, setCarouselData] = useState([])
    const [placesData, setPlacesData] = useState([])
    const [goods, setGoods] = useState([])
    const isMobile = useMediaQuery({ maxWidth: 600 })

    useEffect(()=>{
        if (id === '0'){
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
            fetch(`${config.host}/places/`, {
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
        }
        else {
            fetch(`${config.host}/places/?isRegionCarousel=true&region=${id}`, {
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
            fetch(`${config.host}/places/?region=${id}`, {
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
        }
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
        // setPlacesData(AllPlacesList)
    }, [id])

    const linkStyle = {
        textDecoration:'underline',
        ':hover':{
            color:'#1970F2',
            cursor: 'pointer'
        }
    }

    useEffect(()=>{
        if (isMobile){
            setNum(6)
        }
        else
        {
            setNum(parseInt(window.innerWidth*0.9/400)*2)
        }
    })


    return <Stack alignItems={"flex-start"}  marginLeft={isMobile?'0':'5%'} marginRight={isMobile?'0':'5%'}>
        <MediaQuery  minWidth={801}>
            <NavBar region={id} page={'Головна'}/>
        </MediaQuery>
        <MediaQuery  maxWidth={800}>
            <MobileNavBar region={id} page={'Головна'}/>
        </MediaQuery>
        <Stack marginLeft={'5%'} fontSize={isMobile?40:88} fontFamily={'DniproCity'} fontWeight={'bold'}>{getRegionName(id)}</Stack>
        <MediaQuery minWidth={801}>
            <Carousel data={carouselData} />
        </MediaQuery>
        <Stack marginLeft={'5%'} fontSize={isMobile?40:80} marginTop={'50px'} fontFamily={'DniproCity'} fontWeight={'bold'} marginBottom={'50px'} sx={linkStyle} onClick={()=>{history.push(`/allplaces/${id}`)}}>Усі місця</Stack>
        <Stack marginLeft={'5%'} marginTop={'50px'} flexDirection={'row'} flexWrap={'wrap'} style={{width:'100%'}} justifyContent={isMobile?'center':'flex-start'}>
            {placesData?.slice(0,num).map((place, i)=>{
                return <Card place={place} key={i}/>
            })}
        </Stack>
        <Stack marginLeft={'5%'} fontSize={isMobile?40:80} marginTop={'50px'} fontFamily={'DniproCity'} fontWeight={'bold'} marginBottom={'50px'} sx={linkStyle}>Тобі може знадобитися у подорожі:</Stack>
        <Stack flexDirection={'row'} style={{width:'100%'}}>
            <ScrollContainer style={scrollContainerStyle} ref={container} vertical={false}>
                {
                    goods?.map((good)=>{
                        return <MainGoodCard good={good}/>
                    })
                }
            </ScrollContainer>
        </Stack>
        <Stack marginLeft={'5%'} marginTop={'50px'} flexDirection={'row'} flexWrap={'wrap'} style={{width:'100%'}} justifyContent={isMobile?'center':'flex-start'}>
            {placesData?.slice(num, num*2).map((place, i)=>{
                return <Card place={place} key={i}/>
            })}
        </Stack>
        <News/>
        <Stack marginLeft={'5%'} marginTop={'50px'} flexDirection={'row'} flexWrap={'wrap'} style={{width:'100%'}} justifyContent={isMobile?'center':'flex-start'}>
            {placesData?.slice(num*2).map((place, i)=>{
                return <Card place={place} key={i}/>
            })}
        </Stack>
        {/*<Button  sx={buttonStyle} onClick={()=>setOffset(offset+num*2)}>Дивитись більше ></Button>*/}
    </Stack>
}
