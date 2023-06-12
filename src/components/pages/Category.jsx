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
import {AllGoods, MainGoods} from "../../data/goods";
import {allCategory} from "../../data/category";
import CategoryCard from "../CategoryCard";
import News from "./Region/News";
import GoodCard from "../GoodCard";
import CartButton from "../CartButton";
import GoodsLine from "../GoodsLine";
import MobileNavBar from "../MobileNavBar";
import * as React from "react";
import {config} from "../../config";


export default function Category() {
    const id = useParams().id;
    const history = useHistory();
    const [category, setCategory] = useState({})
    const [goods, setGoods] = useState([])
    const [num, setNum] = useState(0)
    const [sort, setSort] = useState('RateDESC')
    const [sex, setSex] = useState(-1)
    const [flag, setFlag] = useState(0)


    const isMobile = useMediaQuery({maxWidth: 600})


    useEffect(() => {
        fetch(`${config.host}/category/${id}`, {
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
        fetch(`${config.host}/goods/?category=${id}&sort=${sort}`, {
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
    }, [id, sort])


    useEffect(() => {
        if (isMobile) {
            setNum(6)
        } else {
            console.log((parseInt(window.innerWidth * 0.9 / 250) * 2))
            setNum(parseInt(window.innerWidth * 0.9 / 250) * 2)
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

    const getSex = () => {
      if(category.sex){
          return <Select
              sx={selectStyle}
              inputProps={{sx:{padding:'0 10px'}}}
              value={sex}
              onChange={(e) => {
                  setSex(e.target.value);
              }}
          >
              <MenuItem value={-1}>
                  Всі
              </MenuItem>
              <MenuItem value={0}>
                  Чьоловіча
              </MenuItem>
              <MenuItem value={1}>Жіноча</MenuItem>
              <MenuItem value={2}>Унісекс</MenuItem>
          </Select>
      }
    }

    return <Stack alignItems={"flex-start"} marginLeft={isMobile?'0':'5%'} marginRight={isMobile?'0':'5%'}>
        <MediaQuery minWidth={801}>
            <NavBar page={'Головна'}/>
        </MediaQuery>
        <MediaQuery maxWidth={800}>
            <MobileNavBar page={'Головна'}/>
        </MediaQuery>
        <GoodsLine/>

        {/*<Button onClick={()=>setFlag(flag+1)}>q</Button>*/}
        <Breadcrumbs
            marginTop={'1%'}
            separator={<NavigateNextIcon fontSize="small"/>}
            aria-label="breadcrumb"
            marginLeft={'5%'}
            fontSize={isMobile?'10px':'20px'}
        >
            <Stack sx={{cursor: 'pointer'}} onClick={() => {
                history.push(`/categories`)
            }}>
                Всі категорії
            </Stack>,
            <Stack
                fontWeight={'bold'}
            >
                {category.name}
            </Stack>,
        </Breadcrumbs>
        <Stack flexDirection={isMobile?'column':'row'} marginLeft={'5%'} marginTop={'1%'} sx={{}}>
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
            {getSex()}
        </Stack>
        <Stack marginLeft={'5%'} width={'100%'} marginTop={'5%'} flexDirection={'row'} flexWrap={'wrap'} marginRight={'5%'}
               justifyContent={isMobile ? 'center' : 'flex-start'}>
            {goods?.slice(0, num).map((good, i) => {
                return <GoodCard good={good} key={i}/>
            })}
        </Stack>
        <News/>
        <Stack marginLeft={'5%'} marginTop={'50px'} flexDirection={'row'} flexWrap={'wrap'} marginRight={'5%'}
               justifyContent={isMobile ? 'center' : 'flex-start'}>
            {goods?.slice(num).map((good, i) => {
                return <GoodCard good={good} key={i}/>
            })}
        </Stack>
    </Stack>
}
