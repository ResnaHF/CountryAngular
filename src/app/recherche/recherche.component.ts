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
    this.comapi.getListPays().subscribe(d => {
      this.listePays = d;
      this.listePaysSelectionne = d;
    });
    
    this.listeCritere = [];
    var var1 = new Critere();
    var1.operateur = "ET";
    var1.attribu = "name";
    var1.valeur="";
    this.listeCritere.push(var1);
    
    var var2 = new Critere();
    var2.operateur = "OU";
    var2.attribu = "name";
    var2.valeur="";
    this.listeCritere.push(var2);
    
    
    
    console.log(this.listeCritere);
  }
  
  onClick () {
    
    
  }
  
  onBlur() {
    console.log('test');
    this.listePaysSelectionne = [];
    
    var _this = this;
    this.listePays.forEach(function (pays) {
      var good : Boolean = false;
      var fail : Boolean = false;
      _this.listeCritere.forEach(function(crit){
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

}
