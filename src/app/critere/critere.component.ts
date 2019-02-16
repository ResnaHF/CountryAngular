import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Critere } from '../model/critere';

@Component({
  selector: 'app-critere',
  templateUrl: './critere.component.html',
  styleUrls: ['./critere.component.css']
})
export class CritereComponent implements OnInit {

  @Input () crit : Critere;
  @Output() someEvent = new EventEmitter<string>();
  
  listeOperateur : string[];

  constructor() { }

  ngOnInit() {
    if(this.crit.num > 1){
      this.listeOperateur = ["ET", "OU"];
      console.log(this.listeOperateur);
    }
  }
  
  onBlur(){
    this.someEvent.next('reload');
  }
  
  addCrit(){
    this.someEvent.next('addCrit;' + this.crit.num);
  }
  
  supCrit(){
    this.someEvent.next('supCrit;' + this.crit.num);
  }

}
