import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from "rxjs/operators"
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas!: Observable<Oferta[]>
  //public ofertas2!: Oferta[] //substituido pelo "|async" no template
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService:OfertasService) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa.pipe(
      debounceTime(1000), //executa a ação do switcmap após 1 seg
      distinctUntilChanged(), //aguardar até que o texto de pesquisa seja digitado
      //enviar a solicitação do serviço
      switchMap((valor) => {
        //console.log('requisição http para o api')

        //retornar um observable de array vazio (assim evita que a consulta retorne tudo ao impar o campo)
        if(valor.trim() === ''){
          const myObserver = of<Oferta[]>([])
          return myObserver
        }
        return this.ofertasService.pesquisaOferta(valor)
      }),
      catchError((err:any) => {
        //console.log(err)
        return of<Oferta[]>([])
      })
    ) //retorno Oferta[]
    
    /* substituido pelo "|async" no template
    this.ofertas.subscribe((ofertas: Oferta[]) => {
      console.log(ofertas)
      this.ofertas2 = ofertas
      
      
    })
    */
  }

  /*
  public pesquisa(event:Event): void{
    console.log((<HTMLInputElement>event.target).value)
  }
  */

  public pesquisa(valorPesquisado:string): void {
    /*
    this.ofertas = this.ofertasService.pesquisaOferta(valorPesquisado)
    //console.log(this.ofertas)
    */

    /*
    this.ofertas.subscribe(
      (ofertas: Oferta[]) => console.log(ofertas)
    )
    */
    
    /*
    const myObserver = {
      next: (ofertas: Oferta[]) => console.log(ofertas),
      error: (err: Error) => console.log('Status: ',err),
      complete: () => console.log('Completado!!!!')
    }

    this.ofertas.subscribe(myObserver)
    */

    
    this.subjectPesquisa.next(valorPesquisado)
    console.log('Keyup caracter: ', valorPesquisado)

  }

  public limpaPesquisa(): void{
    this.subjectPesquisa.next('')
  }
}
