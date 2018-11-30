import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HandlerService } from '../service/handler.service';
import { Chart } from 'chart.js';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  reponse:string='';
  message:string='';
  listRecouvremet:any=[];
  indice:number;
  myChart:any;
  display:number=0;
  tabRecouvrement(){
    this.listRecouvremet =[];
    for(let r of this.Recouvrement){
      if(r.type == 1){
        this.listRecouvremet.push(r);
      }
    }
    this.display =1;
  }
  tabRendezVous(){
    this.listRecouvremet =[];
    for(let r of this.Recouvrement){
      if(r.type == 2){
        this.listRecouvremet.push(r);
      }
    }
    this.display =1;
  }
  tabTout(){
    this.listRecouvremet = this.Recouvrement;
  }
  home(){
    //this.getClassCSS();
    this.display = 0;
  }
  tabFinaliser(){
    this.listRecouvremet =[];
    for(let r of this.Recouvrement){
      if(r.type == 3){
        this.listRecouvremet.push(r);
      }
    }
    this.display =1;
  }
  Recouvrement = [
    {client:'Abdou',montant:10000,type:1,date:new Date().toLocaleString()},
    {client:'Ablaye',montant:20000,type:2,date:new Date().toLocaleString()},
    {client:'Fatou',montant:12000,type:3,date:new Date().toLocaleString()},
    {client:'Maguette',montant:10000,type:1,date:new Date().toLocaleString()},
    {client:'Awa',montant:30000,type:2,date:new Date().toLocaleString()},
    {client:'Adama',montant:10000,type:3,date:new Date().toLocaleString()},
    {client:'Astou',montant:10000,type:1,date:new Date().toLocaleString()},
    {client:'Coumba',montant:10000,type:2,date:new Date().toLocaleString()},
    {client:'FAllou',montant:10000,type:1,date:new Date().toLocaleString()},
  ]
  getClassCSS(){
    this.getColor.bntClick=false;
    this.getColor.bntNotClick=true;
  }
  getColor = {
    'bntClick': false,
    'bntNotClick':true
  }
  nomRec :any;
  nomRV :any;
  nomFN :any;
  ngOnInit() {
    this.listRecouvremet = this.Recouvrement;
   // console.log(this.listRecouvremet);
    
    this.nomRec =0;
    this.nomRV =0;
    this.nomFN =0;
    for(let r of this.Recouvrement){
      if(r.type == 1){
        this.nomRec=this.nomRec+r.montant;
      }
      if(r.type == 2){
        this.nomRV=this.nomRV+r.montant;
      }
      if(r.type == 3){
        this.nomFN=this.nomFN+r.montant;
      }
    }
    this.myChart = new Chart('myChart', {
      type: 'pie',
      data: {
          labels: ["Recouvrement", "Rendez-vous", "Finaliser"],
          datasets: [{
              label: '# of Votes',
              data: [this.nomRec,this.nomRV, this.nomFN],
              backgroundColor: [
                'red',
                'green',
                'blue'
              ],
             
              borderWidth: 2
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:false
                  }
              }]
          }
      }
  });
 
    
  }
 
  }
