import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers:[OfertasService]
})
export class OndeFicaComponent implements OnInit {

  public ondeFica!:string

  constructor(private route: ActivatedRoute, private ofertasService:OfertasService) { }

  ngOnInit(): void {
    
    // a cada modificação de parametro na rota, dispara a promisse e atualiza o atributo "ondefica"
    this.route.parent?.params.subscribe((parametro:Params)=>{

      this.ofertasService.getOndeFicaOfertaPorId(parametro['id']) //recuperar parametro da rota pai 'parent'
      .then((resposta:string)=>{
        this.ondeFica=resposta      
      })

    })
    
    //console.log(this.route.parent?.snapshot.params['id'])
    /*
    this.ofertasService.getOndeFicaOfertaPorId(this.route.parent?.snapshot.params['id']) //recuperar parametro da rota pai 'parent'
      .then((resposta:string)=>{
        //console.log(resposta)
        this.ondeFica= resposta
      })
    */
    
  }

}
