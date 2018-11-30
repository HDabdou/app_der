import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccueilComponent } from '../accueil/accueil.component';
import { HandlerService } from '../service/handler.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  loginTest:string='admin';
  passwordTest:string='passer';
  login:string='';
  password:string='';
  onConnect(){
   console.log('ok');
    if(this.login==this.loginTest && this.password==this.passwordTest){
      this.router.navigate(['/accueil']);
      console.log(this.router)
    }else{
      alert("ko")
    }
      
   
  }
  constructor(private router: Router,public accueilService:HandlerService) { }

  ngOnInit() {
  }

}
