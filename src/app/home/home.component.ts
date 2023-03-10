import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [OfertasService] //injeção de serviço onde os componentes filhos também podem acessar a mesma instancia
})

export class HomeComponent implements OnInit {

  public ofertas!: Oferta[]

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    //this.ofertas= this.ofertasService.getOfertas()
    //console.log(this.ofertas)

    this.ofertasService.getOfertas()
      .then( (ofertas:Array<Oferta>) => {
          //console.log('retorno com sucesso: ', ofertas)
         this.ofertas = ofertas //apropriando o retorno da promisse ao parâmetro
      })
      .catch( (erro:any) => {
        //console.log(erro)
      })

  }

}
