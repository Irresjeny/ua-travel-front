import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Main from "./components/pages/Main";
import NotFound from "./components/pages/NotFound";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Scrollbars from "react-custom-scrollbars-2";
import {useRef} from "react";
import Region from "./components/pages/Region";
import AllPlaces from "./components/pages/AllPlaces";
import Place from "./components/pages/Place";
import AllCategories from "./components/pages/AllCategories";
import Category from "./components/pages/Category";
import Good from "./components/pages/Good";
import Cart from "./components/pages/Cart";
import Registration from "./components/pages/Registration";
import Categories from "./components/pages/Categories";
import Goods from "./components/pages/Goods";
import Places from "./components/pages/Places";
import Orders from "./components/pages/Orders";
import Authentication from "./components/pages/Authentication";

const theme  = createTheme({
    typography: {
        allVariants: {
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '500',
            lineHeight: '24px',
        },
    },
    palette:{
        neutral: {
            main: '#fff',
            contrastText: '#64748B',
        },
    }
});

function App() {
    const windowHeight = useRef(window.innerHeight);

    return (
        <div className="App">
            <Scrollbars autoHeightMin={windowHeight.current} autoHeight={true} autoHide={true}>
                <ThemeProvider  theme={theme}>
                    <Router>
                        <Switch>
                            <Route path='/' component={Main} exact/>
                            <Route path='/categories' component={AllCategories} exact/>
                            <Route path='/cart' component={Cart} exact/>
                            <Route path='/registration' component={Registration} exact/>
                            <Route path='/category/:id' component={Category} exact/>
                            <Route path='/good/:id' component={Good} exact/>
                            <Route path='/region/:id' component={Region} exact/>
                            <Route path='/allplaces/:id' component={AllPlaces} exact/>
                            <Route path='/place/:id' component={Place} exact/>
                            <Route path='/admin/categories' component={Categories} exact/>
                            <Route path='/admin/goods' component={Goods} exact/>
                            <Route path='/admin/places' component={Places} exact/>
                            <Route path='/admin/orders' component={Orders} exact/>
                            <Route path='/admin/authentication' component={Authentication} exact/>
                            <Route path='/notfound' component={NotFound} exact/>
                            <Redirect from={"*"} to="/notfound"/>
                        </Switch>
                    </Router>
                </ThemeProvider >
            </Scrollbars>
        </div>
    );
}

export default App;
