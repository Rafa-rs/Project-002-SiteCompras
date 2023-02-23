/* exexplo de utilização de formulários

import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service';
import { Pedido } from '../shared/pedido.model';


@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  public endereco: string = ''
  public numero: string = ''
  public complemento: string= ''
  public formaPagamento: string= ''

  //controles de validação de campos
  public enderecoValido!: boolean 
  public numeroValido!: boolean 
  public complementoValido!: boolean 
  public formaPagamentoValido!: boolean

  //estados primitivos do campos (pristine)
  public enderecoEstadoPrimitivo: boolean = true
  public numeroEstadoPrimitivo: boolean = true
  public complementoEstadoPrimitivo: boolean = true
  public formaPagamentoEstadoPrimitivo: boolean = true

  //controlar estado do botão
  public formEstado: string = 'disabled'

  //Pedido
  public pedido: Pedido = new Pedido('','','','')

  //
  public idPedidoCompra!: number

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit(): void {
    //this.ordemCompraService.efetivarCompra()
  }

  public atualizaEndereco(endereco: string): void {
    this.endereco = endereco
    //console.log(this.endereco)

    this.enderecoEstadoPrimitivo=false

    //Se o campo for maior que 3 
    if(this.endereco.length > 3){
      this.enderecoValido = true
    }else {
      this.enderecoValido = false
    }

    this.habilitaForma()

  }

  public atualizaNumero(numero: string): void {
    this.numero = numero
    //console.log(this.numero)

    this.numeroEstadoPrimitivo=false

    //Se o campo for maior que 0 
    if(this.numero.length > 0){
      this.numeroValido = true
    }else {
      this.numeroValido = false
    }

    this.habilitaForma()
  }

  public atualizaComplemento(complemento: string): void {
    this.complemento = complemento
    //console.log(this.complemento)

    this.complementoEstadoPrimitivo=false

    if(this.complemento.length > 0){
      this.complementoValido = true
    }

    this.habilitaForma()
  }

  public atualizaSelectFormaPagamento(formaPagamento: string): void {
    this.formaPagamento = formaPagamento
    //console.log(this.formaPagamento)

    this.formaPagamentoEstadoPrimitivo=false

    //Se o campo for maior que 0 
    if(this.formaPagamento.length > 0){
      this.formaPagamentoValido = true
    }else {
      this.formaPagamentoValido = false
    }

    this.habilitaForma()
  }

  public habilitaForma():void{
    if(this.enderecoValido === true && this.numeroValido === true && this.formaPagamentoValido === true){
      this.formEstado=''
    }else{
      this.formEstado='disabled'
    }
       
  }

  public confirmarCompra():void{

    //populando o objeto pedido com os atributos da ordem de compra
    this.pedido.endereco = this.endereco
    this.pedido.numero = this.numero
    this.pedido.complemento = this.complemento
    this.pedido.formaPagamento = this.formaPagamento

    this.ordemCompraService.efetivarCompra(this.pedido)
      .subscribe((idPedido:number) => {
        //console.log(idPedido)
        this.idPedidoCompra = idPedido
      })
  }

}

*/