import { Component, OnInit } from '@angular/core';
import { Pays } from '../model/pays';
import { ComapiService } from '../comapi.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {

  nomPays : String = "";
  listePays : Pays[];

  constructor(private comapi : ComapiService) { }

  ngOnInit() {
  }
  
  onClick () {
    this.comapi.getListPays().subscribe(d => {
      console.log(d);
      this.listePays = d;
      console.log(this.listePays);
    });
    
  }

}
