import { Devise } from './devise';

export class Pays {
    name : string;
    topLevelDomain : string [];
    alpha2Code : string;
    alpha3Code : string;
    callingCodes : string [];
    capital : string;
    altSpellings : string [];
    region : string;
    subregion : string;
    population : number;
    latlng : number [];
    demonym : string;
    area : number;
    gini : number;
    timezones : string [];
    borders : string[];
    nativeName : string;
    numericCode : string;
    currencies : Devise [];
    languages : string [];
    translations : string [];
    flag : string;
    regionalBlocs : string [];
    cioc : string;
}
