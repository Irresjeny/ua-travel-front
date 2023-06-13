import {useEffect, useRef, useState} from "react";
import {Button, Menu, MenuItem, Stack} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Scrollbars from "react-custom-scrollbars-2";
import {regions} from "../../data/regions";
import {useHistory} from "react-router-dom";
import {allCategory} from "../../data/category";
import {useMediaQuery} from "react-responsive";
import {config} from "../../config";




const verticalLine = {
    borderLeft: '2px solid black',
    height: '60px',
    right: '17%',
    position: 'absolute',
}
export default function CategoryButton({region}) {
    const [anchorEl, setAnchorEl] = useState(0)
    const buttonRef = useRef(null);
    const open = Boolean(anchorEl);
    const [width, setWidth] = useState(100);
    const history = useHistory();
    const [categories, setCategories] = useState([])

    const isMobile = useMediaQuery({maxWidth: 600})

    const buttonStyle = {
        width: isMobile?'200px':'350px',
        height: '60px',
        backgroundColor: '#1970F2',
        color: 'black',
        borderRadius: '34px',
        justifyContent: 'space-around',
        textTransform: 'none',
        zIndex: 2,
        fontSize: 20,
        ':hover': {
            backgroundColor: '#1970F2',
        }
    }

    useEffect(() => {
        if (buttonRef) {
            setWidth(buttonRef.current.offsetWidth)
        }
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
    }, [])


    const handleClick = (e) => {
        if (open) {
            setAnchorEl(null);
        } else {
            setAnchorEl(e.currentTarget);
        }

    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return <Stack>
        {/*{region}*/}
        <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={buttonStyle}
            ref={buttonRef}
        >
            <LocationOnIcon sx={{marginRight: '10px ', marginLeft: '10px', position: 'absolute', left: '5%'}}/>
            <Stack sx={{position: 'absolute'}}>
                Категорії
            </Stack>
            <div style={verticalLine}/>
            <KeyboardArrowDownIcon sx={{fontSize: '30px!important', position: 'absolute', right: '5%'}}/>
        </Button>

        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
                'sx': {'minWidth': `${width}px`, 'maxWidth': `${width}px`, paddingTop: `25px`},
            }}
            sx={{top: `-20px`, zIndex: '1'}}
        >
            <Scrollbars autoHeight={true} autoHide={true} autoHeightMax={window.innerHeight / 2}>
                {categories.map((item, i) => {
                    return <MenuItem  key={i} onClick={() => {
                        history.push(`/category/${item.id}`)
                        setAnchorEl(null)
                    }}><Stack
                        fontWeight={i === parseInt(region) ? 'bold' : 'normal'}>{item.name}</Stack></MenuItem>
                })}
            </Scrollbars>
        </Menu>

    </Stack>
}
