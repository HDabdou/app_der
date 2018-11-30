import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HandlerService {

  //private url:string='https://sentool.bbstvnet.com/handler/';
  
  private url:string='http://localhost/crm_remonte/';
  private header :HttpHeaders;
  constructor(private http:HttpClient) {
    this.header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
   }

  
  public callPeriodicHandler(): Promise<any>{
    let params="requestParam="+(new Date()).toString();
    let link=this.url+"/periodicHandler.php";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  }

  public remonter(id,numFile,reponse,message,operateur,phone): Promise<any>{
    //let params="id="+id;
    let data = JSON.stringify({id:id,numFile:numFile,reponse:reponse,message:message,operateur:operateur,phone:phone});
    let params ='param='+data;
    let link=this.url+"/remonter.php";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res);return res} ).catch(error => {console.log(error);return 'bad' });
  }
 

}
