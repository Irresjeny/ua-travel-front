import {useEffect, useRef, useState} from "react";
import {Button, Menu, MenuItem, Stack} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Scrollbars from "react-custom-scrollbars-2";
import {regions} from "../../data/regions";
import {useHistory} from "react-router-dom";
import {getRegionName} from "../../metods/getRegionName";
import {useMediaQuery} from "react-responsive";





export default function RegionMenuButton({region}) {
    const [anchorEl, setAnchorEl] = useState(0)
    const buttonRef = useRef(null);
    const open = Boolean(anchorEl);
    const [width, setWidth] = useState(100);
    const history = useHistory();
    const isMobile = useMediaQuery({maxWidth: 600})

    const buttonStyle = {
        width: isMobile?'230px':'350px',
        height: '60px',
        backgroundColor: '#FFE545',
        color: 'black',
        borderRadius: '34px',
        justifyContent: 'space-around',
        textTransform: 'none',
        zIndex: 4,
        fontSize: 20,
        ':hover': {
            backgroundColor: '#ffdc00',
        }
    }

    const verticalLine = {
        borderLeft: '2px solid black',
        height: '60px',
        right:'17%',
        position: 'absolute',
    }

    useEffect(() => {
        if (buttonRef) {
            setWidth(buttonRef.current.offsetWidth)
        }
    })

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

    const getText = () =>{
        if(region >= 0){
            if (isMobile){
                return getRegionName(region).replace('область', '')
            }
            else return getRegionName(region)
        }
        else {
            if (isMobile){
                return 'Обери область'
            }
            else return 'Область для подорожі'

        }
    }

    return <Stack marginRight={'5%'}>
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
            <LocationOnIcon sx={{marginRight: '10px ', marginLeft: '10px', position:'absolute', left:isMobile?'2%':'5%'}}/>
            <Stack sx={{position:'absolute'}} fontSize={isMobile?'16px':'20px'}>
                {getText()}
            </Stack>
            <div style={verticalLine}/>
            <KeyboardArrowDownIcon sx={{fontSize: '30px!important', position:'absolute', right:'5%'}}/>
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
            sx={{top: `-20px`, zIndex: '3'}}

        >
            <Scrollbars autoHeight={true} autoHide={true} autoHeightMax={window.innerHeight / 2}>
                {regions.map((item, i) => {
                    return <MenuItem  key={i} onClick={() => {
                        history.push(`/region/${i}`)
                        setAnchorEl(null)
                    }}><Stack fontSize={isMobile?'14px':'16px'}
                        fontWeight={i === parseInt(region) ? 'bold' : 'normal'}>{item}</Stack></MenuItem>
                })}
            </Scrollbars>
        </Menu>

    </Stack>
}
