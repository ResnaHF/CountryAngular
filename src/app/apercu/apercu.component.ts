import { Component, OnInit, Input } from '@angular/core';
import { Pays } from '../model/pays'

@Component({
  selector: 'app-apercu',
  templateUrl: './apercu.component.html',
  styleUrls: ['./apercu.component.css']
})
export class ApercuComponent implements OnInit {

  @Input () pays : Pays;

  constructor() { }

  ngOnInit() {
  }

}
