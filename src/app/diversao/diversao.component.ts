import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.css'],
  providers: [OfertasService] //1 - prover o serviço
})
export class DiversaoComponent implements OnInit {
  //4 - parâmetro que receberá o retorno do método do serviço
  public ofertas!: Oferta[]

  //2 - construir o serviço
  constructor(private ofertaService:OfertasService) { }

  ngOnInit(): void {
    //3 - retornar o método
    this.ofertaService.getOfertasPorCategoria('diversao')
      .then((oferta)=>{
        console.log(oferta)
        this.ofertas = oferta
      })

  }

}
