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
import MobileNavBar from "../MobileNavBar";
import * as React from "react";
import {config} from "../../config";


export default function AllPlaces() {
    const id = useParams().id;
    const [num, setNum] = useState(0)
    const history = useHistory();
    const [placesData, setPlacesData] = useState([])
    const [goods, setGoods] = useState([])
    const [sort, setSort] = useState('RateDESC')
    const [filter, setFilter] = useState(0)


    const isMobile = useMediaQuery({maxWidth: 600})

    const linkStyle = {
        textDecoration: 'underline',
        ':hover': {
            color: '#1970F2',
            cursor: 'pointer'
        }
    }

    useEffect(() => {
        let type = ''
        if (filter !== 0){
            type = `&type=${filter}`
        }
        if (id === '0'){
            fetch(`${config.host}/places/?sort=${sort}${type}`, {
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
            fetch(`${config.host}/places/?region=${id}&sort=${sort}${type}`, {
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
    }, [id, sort, filter])

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
    }, [id])


    useEffect(() => {
        if (isMobile) {
            setNum(6)
        } else {
            setNum(parseInt(window.innerWidth * 0.9 / 400) * 2)
        }
    }, [isMobile])

    const selectStyle ={
        marginRight:'5%',
        borderRadius: '150px',
        width: '230px',
        marginTop: isMobile?'1%':0,
        marginBottom: isMobile?'1%':0,
        fontSize: '16px'
    }

    return <Stack alignItems={"flex-start"}  marginLeft={isMobile?'0':'5%'} marginRight={isMobile?'0':'5%'}>
        <MediaQuery minWidth={801}>
            <NavBar region={id} page={'Головна'}/>
        </MediaQuery>
        <MediaQuery maxWidth={800}>
            <MobileNavBar region={id} page={'Головна'}/>
        </MediaQuery>
        <Breadcrumbs
            marginTop={'1%'}
            separator={<NavigateNextIcon fontSize="small"/>}
            aria-label="breadcrumb"
            marginLeft={'5%'}
            fontSize={isMobile?'10px':'20px'}
        >
            <Stack sx={{cursor: 'pointer'}} onClick={() => {
                history.push(`/region/${id}`)
            }}>
                {getRegionName(id)}
            </Stack>,
            <Stack
                fontWeight={'bold'}
            >
                Усі місця
            </Stack>,
        </Breadcrumbs>
        <Stack flexDirection={isMobile?'column':'row'} marginLeft={'5%'} marginTop={'1%'}>
            <Select
                sx={selectStyle}
                inputProps={{sx:{padding:'0 10px'}}}
                value={sort}
                onChange={(e) => {
                    setSort(e.target.value);
                }}
            >
                <MenuItem value={'RateDESC'}>
                    За рейтингом
                </MenuItem>
                <MenuItem value={'priceASC'}>Від дешевих до дорогих</MenuItem>
                <MenuItem value={'priceDESC'}>Від дорогих до дешевих</MenuItem>
            </Select>
            <Select
                sx={selectStyle}
                inputProps={{sx:{padding:'0 10px'}}}
                value={filter}
                onChange={(e) => {
                    setFilter(e.target.value);
                }}
            >
                <MenuItem value={0}>
                    Всі місця
                </MenuItem>
                <MenuItem value={1}>Парки</MenuItem>
                <MenuItem value={2}>Пам’ятники</MenuItem>
                <MenuItem value={3}>Музеї</MenuItem>
                <MenuItem value={4}>Театри</MenuItem>
                <MenuItem value={5}>Архітектура</MenuItem>
                <MenuItem value={6}>Розваги</MenuItem>
                <MenuItem value={7}>Зелені зони</MenuItem>
            </Select>
        </Stack>
        <Stack marginLeft={'5%'} marginTop={'5%'} flexDirection={'row'} flexWrap={'wrap'} style={{width: '100%'}}
               justifyContent={isMobile ? 'center' : 'flex-start'}>
            {placesData.slice(0, num)?.map((place, i) => {
                return <Card place={place} key={i}/>
            })}
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
        <Stack marginLeft={'5%'} marginTop={'50px'} flexDirection={'row'} flexWrap={'wrap'} style={{width: '100%'}}
               justifyContent={isMobile ? 'center' : 'flex-start'}>
            {placesData.slice(num)?.map((place, i) => {
                return <Card place={place} key={i}/>
            })}
        </Stack>
    </Stack>
}
