import {regions} from "../data/regions";

export const getRegionName = (id) => {
    const region = regions[id]
    if (region === 'Вся Україна' || region === 'Севастополь' || region === 'AP Крим'){
        return region
    }
    else {
        return `${region} область`
    }
}
