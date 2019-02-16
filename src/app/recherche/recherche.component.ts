import { Component, OnInit } from '@angular/core';

import { Pays } from '../model/pays';
import { ComapiService } from '../comapi.service';
import { Critere } from '../model/critere';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {

  nomPays : String = "";
  listePays : Pays[];
  listePaysSelectionne : Pays[];
  listeCritere : Critere[];

  constructor(private comapi : ComapiService) { }

  ngOnInit() {
    this.listeCritere = this.cloneCritere(Critere.listeStandard);
    this.comapi.getListPays().subscribe(d => {
      this.listePays = d;
      this.reloadList();
    });
    
  }
  
  fromCritere(event : String){
    var tab = event.split(";");
    switch(tab[0]){
      case "reload" : 
        this.reloadList();
        break;
      case "addCrit":
        this.addCrit(parseInt(tab[1]));
        break;
      case "supCrit":
        this.supCrit(parseInt(tab[1]));
        break;
      default :
        console.log(event);
    }
  }
  
  reloadList() {
    //on vide la liste
    this.listePaysSelectionne = [];
    var _this = this;
    
    //pour chaque pays de la liste principal
    this.listePays.forEach(function (pays) {
      var good : Boolean = false;
      var fail : Boolean = false;
      _this.listeCritere.forEach(crit => {
        if(!good){
          
          if(crit.operateur == "OU"){
            if(!fail){
              good = true;
            }else{
              fail = false;
            }
          }
          
          if(!good && !fail){
            if(!pays[crit.attribu].toLowerCase().includes(crit.valeur.toLowerCase())){
              fail = true;
            }
          }
        }
      });
      if(!fail || good)
        _this.listePaysSelectionne.push(pays);
    });
  }
  
  addCrit(num : number){
    this.listeCritere = this.listeCritere.map(c =>{
      if(c.num > num){
        c.num++;
      }
      return c;
    });
    var newCrit = {"operateur":"ET", "attribu":"name", "valeur":"", "num":num+1}
    this.listeCritere.splice(num, 0, newCrit);
  }
  
  supCrit(num : number){
    this.listeCritere = this.listeCritere.map(c =>{
      if(c.num > num){
        c.num--;
      }
      return c;
    })
    this.listeCritere.splice(num-1, 1);
  }
  
  cloneCritere(liste : Critere[]) : Critere[] {
    var result = [];
    liste.forEach(crit =>{
      result.push({"operateur":crit.operateur, "attribu":crit.attribu, "valeur":crit.valeur, "num":crit.num})
    });
    return result;
  }
}
