import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HandlerService } from '../service/handler.service';
import { Chart } from 'chart.js';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  soumettre:number = 0;
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
  soumettreClieck(){
    //if(this.soumettre == 0){
      this.soumettre=1
    //}
    //if(this.soumettre == 1){
    //  this.soumettre=0
   // }
    
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
    {client:'Abdou',montant:10000,type:1,date:'03/12/2018 à 15:39:15'},
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
  file :any;
  fileChange(event) {
    this.file= event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
    } 
    
    //fileReader.readAsArrayBuffer(this.file);
    console.log(XLSX.utils.sheet_to_json(this.file));
    console.log(this.file);
  }
  soumission(){
    
    this.soumettre = 0;
  }
  ngOnInit() {
    //this.listRecouvremet = this.Recouvrement;
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
          labels: ["Recouvrement", "Rendez-vous", "Finalisés"],
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
