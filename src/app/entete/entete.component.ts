import { Component, OnInit } from '@angular/core';
import { Attribut } from '../model/attribut';
import { Param } from '../model/param';

@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: ['./entete.component.css']
})
export class EnteteComponent implements OnInit {

  listeAttributSelectionne : Attribut[];
  pourcentage : string;
  
  constructor() { }

  ngOnInit() {
    this.listeAttributSelectionne = Param.listeAttributSelectionne;
  }

}
