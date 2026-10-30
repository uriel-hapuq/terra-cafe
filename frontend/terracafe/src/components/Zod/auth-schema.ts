import {z} from "zod";


export const orderFormSchema = z.object({
    nome: z.string().min(1, {message: "Campo obrigatório"}).max(20, {message: "Máximo de 20 caracteres"}).nonempty(),
    telefone: z.string().min(9, {message: "Mínimo de 9 números"}).max(15, {message: "máximo de 15 números"}).nonempty(),
    produto: z.string().max(50, {message: "Máximo de 50 caracteres"}).min(30, {message: "Detalhe melhor seu pedido"}).nonempty()
})

export type OrderFormSchema = z.infer<typeof orderFormSchema>;