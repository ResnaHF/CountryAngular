import { Critere } from './critere';
import { Save } from './save';
import { Attribut } from './attribut';

export class Param{
  static save : Save;
  
  static listeAttribut : Attribut[] = [
    {"attribut" : "name", "nomAttribut" : "nom du Pays", "type" : "STRING", "selected" : "DEFAUT"},
    {"attribut" : "region", "nomAttribut" : "Continent", "type" : "STRING", "selected" : "NON"},
    {"attribut" : "capital", "nomAttribut" : "Capitale", "type" : "STRING",  "selected" : "NON"},
    {"attribut" : "population", "nomAttribut" : "Population", "type" : "NUMBER",  "selected" : "NON"},
    {"attribut" : "area", "nomAttribut" : "Surface", "type" : "NUMBER",  "selected" : "NON"}
    ];
    
    
  static getAttribut(attribut : string) : Attribut {
    var result : Attribut;
    Param.listeAttribut.forEach(att => {
      if( att.attribut == attribut){
        result = att;
      }
    });
    return result;
  }
  
  static listeStandard : Critere[] = [{"operateur":"", "attribut":Param.getAttribut("name"), "valeur":"", "min":0, "max":Number.MAX_VALUE, "num":1}];
  static listeFrance : Critere[] = [{"operateur":"", "attribut":Param.getAttribut("name"), "valeur":"France", "min":0, "max":Number.MAX_VALUE, "num":1}];

  
}