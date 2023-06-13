import NavBar from "../NavBar";
import CarouselItem from "../Carousel/CarouselItem";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Breadcrumbs,
    Button,
    Link,
    Stack,
    Typography
} from "@mui/material";
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
import {regions} from "../../data/regions";
import News from "./Region/News";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {AllPlacesList, FamousPlaces} from "../../data/places";
import {MainGoods} from "../../data/goods";
import {getRegionName} from "../../metods/getRegionName";
import MiniCarousel from "../MiniCarousel";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MobileNavBar from "../MobileNavBar";
import * as React from "react";
import {config} from "../../config";


export default function Place() {
    const id = useParams().id;
    const history = useHistory();
    const [placesData, setPlacesData] = useState([])
    const [goods, setGoods] = useState([])
    const [place, setPlace] = useState([])
    const [images, setImages] = useState([])
    const [expandDescription, setExpandDescription] = useState(false)
    const [expandRate, setExpandRate] = useState(false)

    const isMobile = useMediaQuery({maxWidth: 600})

    const linkStyle = {
        textDecoration: 'underline',
        ':hover': {
            color: '#1970F2',
            cursor: 'pointer'
        }
    }

    useEffect(() => {
        fetch(`${config.host}/places/${id}`, {
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
                    setPlace(res.category)
                    setImages(res.category.image.split(/\r?\n/))
                    fetch(`${config.host}/places/?type=${res.category.type}`, {
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
                })
            } else if (response.status === 401) {
                history.push('/admin/authentication', {from: "/admin/places"})
            }
        })
    }, [id])

    useEffect(() => {
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
    }, [])


    return <Stack alignItems={"flex-start"}  marginLeft={isMobile?'0':'5%'} marginRight={isMobile?'0':'5%'}>
        <MediaQuery  minWidth={801}>
            <NavBar region={place?.region} page={'Головна'}/>
        </MediaQuery>
        <MediaQuery maxWidth={800}>
            <MobileNavBar region={place?.region} page={'Головна'}/>
        </MediaQuery>
        <Breadcrumbs
            marginTop={'1%'}
            separator={<NavigateNextIcon fontSize="small"/>}
            aria-label="breadcrumb"
            marginLeft={'5%'}
            fontSize={isMobile ? '10px' : '20px'}
        >
            <Stack sx={{cursor: 'pointer'}} onClick={() => {
                history.push(`/region/${place?.region}`)
            }}>
                {getRegionName(place?.region)}
            </Stack>,
            <Stack sx={{cursor: 'pointer'}} onClick={() => {
                history.push(`/allplaces/${place?.region}`)
            }}
            >
                Усі місця
            </Stack>,
            <Stack
                fontWeight={'bold'}
            >
                {place?.name}
            </Stack>,
        </Breadcrumbs>
        <Stack marginLeft={'5%'} width={'90%'} border={'1px solid #2D2B2A'} borderRadius={'40px'} marginTop={'1%'}
               alignItems={'flex-start'} paddingBottom={'30px'} fontSize={isMobile ? '12px' : '16px'}>
            <MiniCarousel data={images} height={isMobile?'200px':'750px'}/>
            <Stack marginLeft={'5%'} flexDirection={'row'}>
                <Stack fontWeight={'bold'}>
                    Адреса:&nbsp;
                </Stack>
                <Stack>
                    {place?.address}
                </Stack>
            </Stack>
            <Stack marginLeft={'5%'} flexDirection={'row'}>
                <Stack fontWeight={'bold'}>
                    Ціна:&nbsp;
                </Stack>
                <Stack>
                    Для дорослих - {place?.priceAdult} грн, для дітей шкільного віку - {place.priceChild} грн
                </Stack>
            </Stack>
            <Stack marginLeft={'5%'}  flexDirection={'row'}>
                <Stack fontWeight={'bold'}>
                    Розклад роботи:&nbsp;
                </Stack>
                <Stack>
                    {place?.workSchedule}
                </Stack>
            </Stack>
            <Stack marginLeft={'5%'} flexDirection={'row'}>
                <Stack fontWeight={'bold'}>
                    Контакти:&nbsp;
                </Stack>
                <Stack>
                    {place?.contacts}
                </Stack>
            </Stack>
            <Accordion sx={{
                marginLeft: '5%',
                width: '90%',
                borderRadius: expandDescription ? '40px' : '100px',
                '::before': {display: 'none'}
            }} disableGutters={true} square={true} onChange={() => setExpandDescription(!expandDescription)}>
                <AccordionSummary
                    sx={{marginLeft: "2%", marginRight: "2%"}}
                    expandIcon={<ExpandMoreIcon/>}
                >
                    <Stack>Опис місця</Stack>
                </AccordionSummary>
                <AccordionDetails sx={{marginLeft: '5%', width: '80%'}}>
                    <Stack>
                        {place?.description}
                    </Stack>
                </AccordionDetails>
            </Accordion>
            <Accordion disabled={true} sx={{
                marginLeft: '5%',
                width: '90%',
                borderRadius: expandRate ? '40px' : '100px',
                marginTop: '1%',
                '::before': {display: 'none'}
            }} disableGutters={true} square={true} onChange={() => setExpandRate(!expandRate)}>
                <AccordionSummary
                    sx={{marginLeft: "2%", marginRight: "2%"}}
                    expandIcon={<ExpandMoreIcon/>}
                >
                    <Stack>Оцінка місця: {place?.rate} ⭐ (базується на основі 0 відгуків)</Stack>
                </AccordionSummary>
                <AccordionDetails sx={{marginLeft: '5%', width: '80%'}}>
                    <Stack>

                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Stack>
        <Stack marginLeft={'5%'} fontSize={isMobile ? 40 : 80} marginTop={'50px'} fontFamily={'DniproCity'}
               fontWeight={'bold'} marginBottom={'50px'} sx={linkStyle}>Тобі може знадобитися у подорожі:</Stack>
        <Stack flexDirection={'row'} style={{width: '100%'}}>
            <ScrollContainer style={scrollContainerStyle} vertical={false}>
                {
                    goods?.map((good, i) => {
                        return <MainGoodCard good={good} key={i}/>
                    })
                }
            </ScrollContainer>
        </Stack>
        <Stack marginLeft={'5%'} fontSize={isMobile ? 40 : 80} marginTop={'50px'} fontFamily={'DniproCity'}
               fontWeight={'bold'} marginBottom={'50px'} >Схожі місця</Stack>
        <Stack flexDirection={'row'} style={{width:'100%'}}>
            <ScrollContainer style={scrollContainerStyle} vertical={false}>
                {placesData?.map((place, i)=>{
                    return <Card place={place} key={i}/>
                })}

            </ScrollContainer>
            {/*<img src={arrowNext} onClick={()=> scroll()} style={{color:'black', marginRight:'150px'}}/>*/}
        </Stack>
    </Stack>
}
