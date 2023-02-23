import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'

import { URL_API } from './app.api'
import { map, retry } from "rxjs/operators"

import { Pedido } from "./shared/pedido.model"

@Injectable()
export class OrdemCompraService {

    constructor(private http:HttpClient){}

    public efetivarCompra(pedido:Pedido): Observable<number>{
        
        let headers: HttpHeaders = new HttpHeaders()
        
        headers.append('Content-type', 'application/json')

        return this.http.post(
            `${URL_API}/pedidos`,
            pedido, /* JSON.stringify(pedido)*/
            {headers: headers, observe: 'response'}
                        
        ).pipe(
            map( (resposta: HttpResponse<any>)=> resposta.body.id )
        )
    }

}