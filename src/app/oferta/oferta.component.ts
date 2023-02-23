import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {



  public oferta!: Oferta

  constructor(
    private route:ActivatedRoute, 
    private ofertasService:OfertasService, 
    private carrinhoService:CarrinhoService
    ) {
    
   }

  ngOnInit(): void {

    //console.log('Oferta component: ',this.carrinhoService.exibirItens())

    this.route.params.subscribe((parametros:Params) => {
      
      this.ofertasService.getOfertaPorId(parametros['id'])
      .then((oferta:Oferta | any)=>{
        //console.log(this.oferta = oferta)
        this.oferta = oferta
      })

    })

    //console.log(this.route.snapshot.params['id'])
    
  }

  ngOnDestroy(): void {
      
  }

  public adicionarItemCarrinho(oferta:Oferta): void {
    this.carrinhoService.incluirItem(this.oferta)
    console.log(this.carrinhoService.exibirItens())
    //console.log(this.oferta)
  }
}
