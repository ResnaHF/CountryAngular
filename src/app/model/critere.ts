import { Attribut } from '../model/attribut';

export class Critere {
    operateur : string;
    attribut : Attribut;
    valeur : string;
    min : number;
    max : number;
    num : number;
}