import NavBar from "../NavBar";
import CarouselItem from "../Carousel/CarouselItem";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Breadcrumbs,
    Button,
    Link, Rating,
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
import {AllGoods, MainGoods} from "../../data/goods";
import {getRegionName} from "../../metods/getRegionName";
import MiniCarousel from "../MiniCarousel";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GoodCard from "../GoodCard";
import {allCategory} from "../../data/category";
import GoodsLine from "../GoodsLine";
import MobileNavBar from "../MobileNavBar";
import * as React from "react";
import {config} from "../../config";


export default function Good() {
    const id = useParams().id;
    const history = useHistory();
    const [goods, setGoods] = useState([])
    const [good, setGood] = useState({specification: '', rate: 0})
    const [images, setImages] = useState([])
    const [expandWarranty, setExpandWarranty] = useState(false)
    const [expandSpecification, setExpandSpecification] = useState(false)
    const [expandRate, setExpandRate] = useState(false)
    const [category, setCategory] = useState({})
    const [flag, setFlag] = useState(0)

    const isMobile = useMediaQuery({maxWidth: 600})

    const linkStyle = {
        textDecoration: 'underline',
        ':hover': {
            color: '#1970F2',
            cursor: 'pointer'
        }
    }

    useEffect(() => {
        fetch(`${config.host}/goods/${id}`, {
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setGood(data.category)
                    setImages(data.category.image.split(/\r?\n/))
                    fetch(`${config.host}/category/${data.category.category}`, {
                        headers: {
                            'accept': 'text/plain',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                    }).then((response) => {
                        if (response.status === 200) {
                            response.json().then((data) => {
                                setCategory(data.category)
                            })
                        }
                    })
                    fetch(`${config.host}/goods/?category=${data.category.category}`, {
                        headers: {
                            'accept': 'text/plain',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                    }).then((response) => {
                        if (response.status === 200) {
                            response.json().then((data) => {
                                setGoods(data.goods)
                            })
                        }
                    })
                })
            }
        })

        // setImages(AllGoods[id-1].image.split(/\r?\n/))
    }, [id])


    const buttonStyle = {
        backgroundColor: '#1970F2',
        color: 'white',
        fontFamily: 'DniproCity',
        fontWeight: 'bold',
        fontSize: isMobile ? '10px' : '18px',
        padding: isMobile ? '4px 20px' : '10px 25px',
        borderRadius: '150px',
        // left:isMobile?'90px':'140px',
        ':hover': {
            backgroundColor: '#1970F2',
            color: '#FFE545'
        }
    }

    const buyHandle = () => {
        let items = JSON.parse(localStorage.getItem('cart'))
        items.push({id: good.id, count:1})
        localStorage.setItem('cart', JSON.stringify(items))
        setFlag(flag + 1)
    }

    return <Stack alignItems={"flex-start"}  marginLeft={isMobile?'0':'5%'} marginRight={isMobile?'0':'5%'}>
        <MediaQuery minWidth={801}>
            <NavBar page={'Головна'}/>
        </MediaQuery>
        <MediaQuery maxWidth={800}>
            <MobileNavBar page={'Головна'}/>
        </MediaQuery>
        <GoodsLine flag={flag}/>
        <Breadcrumbs
            marginTop={'1%'}
            separator={<NavigateNextIcon fontSize="small"/>}
            aria-label="breadcrumb"
            marginLeft={'5%'}
            fontSize={isMobile ? '10px' : '20px'}
        >
            <Stack sx={{cursor: 'pointer'}} onClick={() => {
                history.push(`/categories`)
            }}>
                Всі категорії
            </Stack>
            <Stack onClick={() => {
                history.push(`/category/${category.id}`)
            }}>
                {category.name}
            </Stack>
            <Stack
                fontWeight={'bold'}
            >
                {good?.name}
            </Stack>
        </Breadcrumbs>
        <Stack marginLeft={'5%'} width={'90%'} border={'1px solid #2D2B2A'} borderRadius={'40px'}
               marginTop={'1%'} flexDirection={'row'}
               alignItems={'flex-start'} paddingBottom={'30px'} fontSize={isMobile ? '12px' : '16px'}>
            <MiniCarousel data={images} width={'40%'} bigArrow={true} height={isMobile ? '200px' : '600px'}/>
            <Stack width={'55%'} minHeight={isMobile ? '200px' : '600px'}>
                <Stack marginBottom={'3%'}>
                    <Stack marginLeft={'5%'} flexDirection={'row'} marginTop={'5%'}>
                        <Stack fontWeight={'bold'} fontSize={'24px'}>
                            {good?.name}
                        </Stack>
                    </Stack>
                    <Stack marginLeft={'5%'} flexDirection={'row'} marginTop={'3%'}>
                        <Stack fontWeight={'bold'}>
                            Оцінка:&nbsp;
                        </Stack>
                        <Stack>
                            <Rating size={isMobile ? 'small' : ''} value={good?.rate} precision={0.1} readOnly/>
                        </Stack>
                    </Stack>
                    <Accordion sx={{
                        marginLeft: '5%',
                        marginTop: '3%',
                        width: '90%',
                        borderRadius: expandSpecification ? '40px' : '100px',
                        '::before': {display: 'none'}
                    }} disableGutters={true} square={true}
                               onChange={() => (setExpandSpecification(!expandSpecification))}>
                        <AccordionSummary
                            sx={{marginLeft: "2%", marginRight: "2%"}}
                            expandIcon={<ExpandMoreIcon/>}
                        >
                            <Stack>Характеристики </Stack>
                        </AccordionSummary>
                        <AccordionDetails sx={{marginLeft: '5%', width: '80%'}}>
                            <Stack alignItems={'flex-start'}>
                                {good?.specification.replaceAll('\n', '\\n').split('\\n').map((item, i) => {
                                    return <Stack key={i}>{item}</Stack>
                                })}
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disabled={true} sx={{
                        marginLeft: '5%',
                        marginTop: '3%',
                        width: '90%',
                        borderRadius: expandWarranty ? '40px' : '100px',
                        '::before': {display: 'none'}
                    }} disableGutters={true} square={true} onChange={() => setExpandWarranty(!expandWarranty)}>
                        <AccordionSummary
                            sx={{marginLeft: "2%", marginRight: "2%"}}
                            expandIcon={<ExpandMoreIcon/>}
                        >
                            <Stack>Гарантія</Stack>
                        </AccordionSummary>
                        <AccordionDetails sx={{marginLeft: '5%', width: '80%'}}>
                            <Stack>
                                {good?.warranty}
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disabled={true} sx={{
                        marginLeft: '5%',
                        marginTop: '3%',
                        width: '90%',
                        borderRadius: expandRate ? '40px' : '100px',
                        '::before': {display: 'none'}
                    }} disableGutters={true} square={true} onChange={() => setExpandRate(!expandRate)}>
                        <AccordionSummary
                            sx={{marginLeft: "2%", marginRight: "2%"}}
                            expandIcon={<ExpandMoreIcon/>}
                        >
                            <Stack>Відгуки (0)</Stack>
                        </AccordionSummary>
                        <AccordionDetails sx={{marginLeft: '5%', width: '80%'}}>
                            <Stack>

                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                </Stack>
                <Stack marginTop={'auto'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}
                       marginLeft={'5%'} marginRight={'5%'}>
                    <Stack fontSize={'24px'}>
                        {good?.price} ₴
                    </Stack>
                    <Button sx={buttonStyle} onClick={()=>buyHandle()}>купити</Button>
                </Stack>
            </Stack>
        </Stack>
        <Stack marginLeft={'5%'} fontSize={isMobile ? 40 : 80} marginTop={'50px'} fontFamily={'DniproCity'}
               fontWeight={'bold'} marginBottom={'50px'}>Схожі товари</Stack>
        <Stack flexDirection={'row'} style={{width: '100%'}}>
            <ScrollContainer style={scrollContainerStyle} vertical={false}>
                {goods.map((item, i) => {
                    return <GoodCard good={item} key={i}/>
                })}

            </ScrollContainer>
            {/*<img src={arrowNext} onClick={()=> scroll()} style={{color:'black', marginRight:'150px'}}/>*/}
        </Stack>
    </Stack>
}
