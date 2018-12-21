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
    console.log(this.listeRecrutement);
    for(let r of this.Recouvrement){
      if(r.etat == 0){
        this.listRecouvremet.push(r);
      } 
    }
    this.display = 1;
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
      if(r.etat == 1){
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
      if(r.etat == 2){
        this.listRecouvremet.push(r);
      }
    }
    this.display =1;
  }
  liste:number=0;
  Recouvrement = []
  getClassCSS(){
    this.getColor.bntClick=false;
    this.getColor.bntNotClick=true;
  }
  getColor = {
    'bntClick': false,
    'bntNotClick':true
  }
  nomRec :any=0;
  nomRV :any=0;
  nomFN :any=0;
  file :any;
  data:any;
  listeExcel:any = [];
  listeRecrutement:any = [];
  fileName:any;
  fileChange(event) {
    this.file= event.target.files[0];
    console.log(this.file);
    
    this.fileName = this.file.name
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      //console.log(fileReader.result);
      this.data = fileReader.result;
      let datas = new Uint8Array(this.data);
      var arr = new Array();
      for(var i = 0; i != datas.length; ++i) arr[i] = String.fromCharCode(datas[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {type:"binary"});
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      //console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
      this.listeExcel= XLSX.utils.sheet_to_json(worksheet,{raw:true})
      for(let i = 0; i < this.listeExcel.length ;++i){
        this.listeRecrutement.push(this.listeExcel[i])
        //console.log(this.listeRecrutement);
      }
      this._derService.soumettre(this.listeRecrutement).then(res=>{console.log(res);
      })
     // console.log(XLSX.read(fileReader.result, {type: 'binary', cellDates:true, cellStyles:true}));
      //console.log(XLSX.utils.sheet_to_json(fileReader));
      //console.log(data);
      //let json = XLSX.CFB.read(data)
    } 
    fileReader.readAsArrayBuffer(this.file);
    for(let i of this.listeExcel){
      console.log(i.nom);
    }
  }

  soumission(){   
    this.soumettre = 0;
  }
  lRecouvrement =[];
  lRendezVous = [];
  lFinaliser = [];
  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  constructor(private modalService: BsModalService,public _derService:HandlerService) { }
  lNewListe = [];
  newNotif:number=0;
  hideNotif(){
    this.newNotif=0;
  }
  nbRecouvrement:number=0;
  nbRV:number=0;
  nbFinalaliser:number=0;
  ngOnInit() {

    this._derService.liste().then(res =>{
     // console.log(res['message']);
      this.Recouvrement= res['message'];
      for(let i of this.Recouvrement){
        
        if(i.etat == 0){
          this.nbRecouvrement = this.nbRecouvrement +1;
          this.nomRec = this.nomRec + this.getInfo1(i.client,'montant');
        }
        if(i.etat == 1){
          this.nbRV = this.nbRV +1;
          this.nomRV = this.nomRV + this.getInfo1(i.client,'montant');
        }
        if(i.etat == 2){
          this.nbFinalaliser = this.nbFinalaliser +1;
          this.nomFN = this.nomFN + this.getInfo1(i.client,'montant');
        }
       
      }
      //this.listRecouvremet = this.Recouvrement
      console.log('Recouvrement '+this.nomRec+' Rendez vous '+this.nomRV+' Finaliser '+this.nomFN); 
      this.myChart = new Chart('myChart', {
        type: 'pie',
        data: {
            labels: ["Recouvrement", "Rendez-vous", "Finalisés"],
            datasets: [{
                label: '# of Votes',
  
                data: [this.nomRec,this.nomRV, this.nomFN],
                backgroundColor: [
                  '#A52A2A',
                  '#007bff',
                  '#FF8C00'
                ],
                borderWidth: 2
            }]
        },
       // options: {
          //events: ['click'],
          
         /* onClick: function(e) {
            var element = this.getElementAtEvent(e);
            if (element.length) {
              console.log(element[0]);
              var chartData = element[0]['_chart'].config.data;
              var idx = element[0]['_index'];
              console.log('Recouvrement '+this.nomRec+' Rendez vous '+this.nomRV+' Finaliser '+this.nomFN);
  
              console.log(idx);
              this.liste=1
              var label = chartData.labels[idx];
              var value = chartData.datasets[0].data[idx];
              var url =label + "  à  " + value;
              console.log(url);
              alert(url);
            }
          }*/
        //}
    });
    })
    setInterval(() => {
      this._derService.callPeriodicHandler().then( res => {
      //console.log(res['message']);
      if(res['code']==1){
        this.lNewListe =[]
        let id
        for(let i = 0;i <this.Recouvrement.length - 1;++i){
          id =this.Recouvrement[this.Recouvrement.length-1].id
        }
       this._derService.newListe(id).then(rep =>{
          this.lNewListe = rep['message'];
          this.newNotif =this.lNewListe.length;
          console.log(this.newNotif);
          for(let i of this.lNewListe){
            this.Recouvrement.push(i);
          }
        })
      }
     /* console.log(res['code']);
      this.code=res['code'];
      if(this.code == 1)
      { 
        this.listRemonte=res['message'];
        this.playNotif=1;
      }
      if(this.playNotif == 1){
        this.audio = new Audio();
        this.audio.src ='./assets/windows-8-sms.mp3';
        this.audio.play();  
      }*/
    } );
      
    }, 10000); 
  console.log(this.listRecouvremet);
  }
  getInfo1(requete,nom){
    let req = JSON.parse(requete);
    if(nom == "montant"){
      return req.montant ;
    }
    if(nom == "nom"){
      return req.nom;
    }
    if(nom == "prenom"){
      return req.prenom;   
    }
    if(nom == "telephone"){
      return req.telephone;   
    }
    if(nom == "adresse"){
      return req.adresse;   
    }
    return "null";
  }
}
