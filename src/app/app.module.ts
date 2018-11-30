import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { Routes, RouterModule} from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccueilComponent } from './accueil/accueil.component';
import { HandlerService } from './service/handler.service';
import { HttpClientModule} from '@angular/common/http';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {NgPipesModule} from 'ngx-pipes';

const routes:Routes=[  {path:'accueil', component:AccueilComponent},
  {path:'login', component:ConnexionComponent},
  {path:'',redirectTo:'/login' ,pathMatch:'full'},
];
@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ModalModule.forRoot(),
    HttpClientModule,
    TabsModule.forRoot(),
    NgPipesModule
  ],
  providers: [
    HandlerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
