import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { CarrinhoService } from '../carrinho.service'
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'numero': new FormControl(null,[Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null,[Validators.required])
  })

  public idPedidoCompra!: number
  public itensCarrinho: ItemCarrinho[] = []

  constructor(
    private ordemCompraService: OrdemCompraService, 
    public carrinhoService: CarrinhoService
    ) { }

  ngOnInit() {
    
    this.itensCarrinho = this.carrinhoService.exibirItens()
    console.log(this.itensCarrinho)
  }

  public confirmarCompra(): void {

   //quando forçar quando o status do form for inválido a marcação do toque nos campos 
   if(this.formulario.status === 'INVALID'){
      //console.log('Form inválido')
      this.formulario.get('endereco')?.markAsTouched()
      this.formulario.get('numero')?.markAsTouched()
      this.formulario.get('complemento')?.markAsTouched()
      this.formulario.get('formaPagamento')?.markAsTouched()

    }else{
      //validar se existe item no carrinho
      if(this.carrinhoService.exibirItens().length === 0){
        alert('Item do carrinho não selecionado!')

      }else{
        //console.log('Form válido')
      let pedido:Pedido = new Pedido(
        this.formulario.value.endereco,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.formaPagamento,
        this.carrinhoService.exibirItens()
      )

      console.log(pedido)
      
      this.ordemCompraService.efetivarCompra(pedido)
        .subscribe( (idPedido:number) => {
          
          this.idPedidoCompra = idPedido
          //console.log(this.idPedidoCompra)
          this.carrinhoService.limparCarrinho()

        } )
      }
      

    }

   
  }

  
  public adicionarItem(item: ItemCarrinho): void {
    this.carrinhoService.somarItemCarrinho(item)
  }

  public removerItem(item: ItemCarrinho): void {
    this.carrinhoService.diminuirItemCarrinho(item)
  }
  

}
