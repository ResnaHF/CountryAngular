import { Component, OnInit, Input } from '@angular/core';
import { Pays } from '../model/pays';
import { Param } from '../model/param';
import { Attribut } from '../model/attribut';

@Component({
  selector: 'app-apercu',
  templateUrl: './apercu.component.html',
  styleUrls: ['./apercu.component.css']
})
export class ApercuComponent implements OnInit {

  @Input () pays : Pays;
  listeAttributSelectionne : Attribut[];

  constructor() { }

  ngOnInit() {
    this.listeAttributSelectionne = Param.listeAttributSelectionne;
  }

}
