import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers:[OfertasService]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar!:string

  constructor(private route: ActivatedRoute, private ofertasService:OfertasService) { }

  ngOnInit(): void {
    
    
    this.route.parent?.params.subscribe((parametro:Params)=>{

      this.ofertasService.getComoUsarOfertaPorId(parametro['id']) //recuperar parametro da rota pai 'parent'
      .then((resposta:string)=>{
        //console.log(resposta)
        this.comoUsar= resposta
      })

    })
    
    //console.log(this.route.parent?.snapshot.params['id'])

    
    /*
    this.ofertasService.getComoUsarOfertaPorId(this.route.parent?.snapshot.params['id']) //recuperar parametro da rota pai 'parent'
      .then((resposta:string)=>{
        //console.log(resposta)
        this.comoUsar= resposta
      })
    */
  }

}
