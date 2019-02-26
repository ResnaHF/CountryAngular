import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Critere } from '../model/critere';
import { Param } from '../model/param';
import { Attribut } from '../model/attribut';

@Component({
  selector: 'app-critere',
  templateUrl: './critere.component.html',
  styleUrls: ['./critere.component.css']
})
export class CritereComponent implements OnInit {

  @Input () crit : Critere;
  @Output() someEvent : EventEmitter<string> = new EventEmitter<string>();
  
  listeAttribut : Attribut[];;
  listeOperateur : string[];
  type : string;

  constructor() { }

  ngOnInit() {
    if(this.crit.num > 1){
      this.listeOperateur = ["ET", "OU"];
    }
    this.listeAttribut = Param.listeAttribut;
    this.type = this.crit.attribut.attribut;
  }
  
  onBlur(){
    this.someEvent.next('reload');
  }
  
  onBlurAttribut(){
    this.crit.attribut = Param.getAttribut(this.type);
    this.onBlur();
  }
  
  addCrit(){
    this.someEvent.next('addCrit;' + this.crit.num);
  }
  
  supCrit(){
    this.someEvent.next('supCrit;' + this.crit.num);
    this.onBlur();
  }

}
