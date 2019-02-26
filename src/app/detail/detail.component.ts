import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,NavigationEnd } from '@angular/router';

import { Pays } from '../model/pays';
import { ComapiService } from '../comapi.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  pays : Pays = new Pays();
  paysFrontaliers : string[];

  constructor(private comapi : ComapiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.recupDonnePays();
    this.router.events.subscribe( val => {
      if(val instanceof NavigationEnd) {
        this.recupDonnePays();
      }
    });
  }
  
  recupDonnePays(){
    var _this = this;
    this.comapi.getPays(this.route.snapshot.paramMap.get('name')).subscribe(p => {
      this.pays = p[0];
      console.log(this.pays);
      this.paysFrontaliers = []; 
      this.pays.borders.forEach(str =>{
        this.comapi.getPaysAlpha3(str).subscribe(p => {
          _this.paysFrontaliers.push(p.name);
        });
      });
    });
  }
}
