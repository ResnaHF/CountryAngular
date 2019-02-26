import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,NavigationEnd } from '@angular/router';

import { Param } from '../model/param';
import { Pays } from '../model/pays';
import { Critere } from '../model/critere';
import { Attribut } from '../model/attribut';
import { Devise } from '../model/devise';
import { ComapiService } from '../comapi.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {

  nomPays : String = "";
  listePays : Pays[];
  listePaysSelectionne : Pays[] = [];
  listeCritere : Critere[];

  constructor(private comapi : ComapiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.selectCritere();
    this.comapi.getListPays().subscribe(d => {
      this.listePays = d;
      this.reloadList();
    });
    this.router.events.subscribe( val => {
      if(val instanceof NavigationEnd) {
        this.selectCritere();
        this.reloadList();
      }
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
            switch(crit.attribut.type){
              case "STRING":
                if(!pays[crit.attribut.attribut].toLowerCase().includes(crit.valeur.toLowerCase())){
                  fail = true;
                }
              case "NUMBER":
                if(pays[crit.attribut.attribut] <= crit.min){
                  fail = true;
                }
                if(crit.max > 0 && pays[crit.attribut.attribut] >= crit.max ){
                  fail = true;
                }
                break;
              case "DEVISE[]":
                var listeDevise : Devise[] = pays[crit.attribut.attribut];
                var oneGood = false;
                listeDevise.forEach(devise => {
                  if(devise.code != null && devise.code.toLowerCase().includes(crit.valeur.toLowerCase()))
                    oneGood = true;
                });
                if (!oneGood){
                  fail = true;
                }
                break;
            }
          }
        }
      });
      if(!fail || good)
        _this.listePaysSelectionne.push(pays);
    });
    
    for (let i = 0; i < Param.listeAttribut.length; i++) {
      if(Param.listeAttribut[i].selected != 'DEFAUT'){
        Param.listeAttribut[i].selected = 'NON';
        this.listeCritere.forEach(crit => {
          if(crit.attribut.attribut == Param.listeAttribut[i].attribut){
            Param.listeAttribut[i].selected = 'OUI';
          }
        })
      }
    }
    
    //vidage de la liste 
    Param.listeAttributSelectionne.length = 0;
    Param.listeAttribut.forEach(att => {
      if(att.selected != 'NON'){
        Param.listeAttributSelectionne.push(att);
      }
    });
  }
  
  addCrit(num : number){
    this.listeCritere = this.listeCritere.map(c =>{
      if(c.num > num){
        c.num++;
      }
      return c;
    });
    var newCrit = {"operateur":"ET", "attribut":Param.getAttribut("name"), "valeur":"", "min":0, "max":Number.MAX_VALUE, "num":num+1}
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
      result.push({"operateur":crit.operateur, "attribut":crit.attribut, "valeur":crit.valeur, "min":0, "max":Number.MAX_VALUE, "num":crit.num})
    });
    return result;
  }
  
  selectCritere(){
    var type : string = this.route.snapshot.paramMap.get('type');
    switch(type){
      case "EUROPE":
        this.listeCritere = this.cloneCritere(Param.listeEurope);
        break;
      case "AFRIQUE":
        this.listeCritere = this.cloneCritere(Param.listeAfrique);
        break;
      case "CAD":
        this.listeCritere = this.cloneCritere(Param.listeCAD);
        break;
      case "USD":
        this.listeCritere = this.cloneCritere(Param.listeUSD);
        break;
      case "EURO":
        this.listeCritere = this.cloneCritere(Param.listeEURO);
        break;
      default :
        this.listeCritere = this.cloneCritere(Param.listeStandard);
        break;
    }
  }
}
