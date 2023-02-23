import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Oferta } from "./shared/oferta.model"
import { lastValueFrom, Observable } from "rxjs" //converter em promise

import { URL_API } from "./app.api"
import { map, retry } from "rxjs/operators"

@Injectable()
export class OfertasService {


    constructor(private http:HttpClient){}

   
    public getOfertas(): Promise<Array<Oferta>> {

        //fazer uma requisição
       let chave: string = 'categoria'
       let valor: string = 'diversao'

       return lastValueFrom<any>(this.http.get(`${URL_API}/ofertas?${chave}=${valor}`))
    
    }

    public getOfertasPorCategoria(categoria:string):Promise<Array<Oferta>>{
        let chave: string = 'categoria'
        return lastValueFrom<any>(this.http.get(`${URL_API}/ofertas?${chave}=${categoria}`))
    }
                
    public getOfertaPorId(id:number):Promise<Array<Oferta>>{
        let chave: string = 'id'
        return lastValueFrom<any>(this.http.get(`${URL_API}/ofertas?${chave}=${id}`))
            .then((resposta:any)=>{
                //return resposta.shift() //alternativa
                return resposta[0]
            })
    }

    public getComoUsarOfertaPorId(id:number):Promise<string>{
        let chave: string = 'id'
        return lastValueFrom<any>(this.http.get(`${URL_API}/como-usar?${chave}=${id}`))
            .then((resposta:any)=>{
                //return resposta.shift() //alternativa
                return resposta[0].descricao
            })
    }

    public getOndeFicaOfertaPorId(id:number):Promise<string>{
        let chave: string = 'id'
        return lastValueFrom<any>(this.http.get(`${URL_API}/onde-fica?${chave}=${id}`))
            .then((resposta:any)=>{
                //return resposta.shift() //alternativa
                return resposta[0].descricao
            })
    }

    public pesquisaOferta(valor: string): Observable<Oferta[]> {
        let chave: string = 'descricao_oferta_like'
        return this.http.get(`${URL_API}/ofertas?${chave}=${valor}`, {observe: 'body'} ).pipe(
            retry(10), //tentativas de conexão
            map((resposta:any)=> resposta)
            )
    }
}