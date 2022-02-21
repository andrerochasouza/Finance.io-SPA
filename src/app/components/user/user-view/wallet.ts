import { App } from './app';

export interface Wallet {
  idUser?: number
  walletValue: number
  nameUser: string
  aplicationsDTO: App[]
}
