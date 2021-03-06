import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RechercheComponent } from './recherche/recherche.component';
import { DetailComponent } from './detail/detail.component';
import { CritereComponent } from './critere/critere.component';
import { ApercuComponent } from './apercu/apercu.component';
import { MenuComponent } from './menu/menu.component';
import { EnteteComponent } from './entete/entete.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RechercheComponent,
    DetailComponent,
    CritereComponent,
    ApercuComponent,
    MenuComponent,
    EnteteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
