import { NonNullableFormBuilder } from '@angular/forms'
import { ItemCarrinho } from './shared/item-carrinho.model'
import { Oferta } from './shared/oferta.model'

class CarrinhoService {

    public itens: ItemCarrinho[] = []

    public exibirItens(): ItemCarrinho[] {
        return this.itens
    }

    public incluirItem(oferta:Oferta): void {
        //console.log('Carrinho oferta: ', oferta )
        let itemCarrinho: ItemCarrinho = new ItemCarrinho (
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        )
        
        
        //verificar se o item não exite em this.itens
        
        let itemCarrinhoEncontrado = this.itens.find((item:ItemCarrinho) => item.id === itemCarrinho.id)
               
        if(itemCarrinhoEncontrado){
            itemCarrinhoEncontrado.quantidade += 1
        }else{
            this.itens.push(itemCarrinho)
        }
        
    }

    public totalCarrinhoCompras(): number{
        
        let total: number = 0

        this.itens.map((item: ItemCarrinho) => {
            total= total + (item.valor * item.quantidade)
        })

        return total
    }

    public somarItemCarrinho(item: ItemCarrinho): void {
        //console.log(item)
        
        item.quantidade += 1
    }

    public diminuirItemCarrinho(itemCarrinho: ItemCarrinho): void {
        
        let itemCarrinhoEncontrado = this.itens.find((item:ItemCarrinho) => item.id === itemCarrinho.id)
               
        if(itemCarrinhoEncontrado){
            itemCarrinhoEncontrado.quantidade -= 1

            //Se igual a zero remover item do array
            if(itemCarrinhoEncontrado.quantidade === 0){
                this.itens.splice( this.itens.indexOf(itemCarrinhoEncontrado), 1)
            }
        }
           
    }

    public limparCarrinho():void{
        this.itens = []
    }
}

export { CarrinhoService }

