import './Order.css' 
import { useForm } from "react-hook-form"
import { orderFormSchema, type OrderFormSchema } from "../Schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {toast} from 'react-toastify';


function Order(){
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<OrderFormSchema>({
        resolver: zodResolver(orderFormSchema)
    });

    const API_URL = import.meta.env.VITE_API_URL

    const onSubmit = async (payload: OrderFormSchema) => {
        try {
            const response = await fetch(`${API_URL}/api/encomenda/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
        
            if (!response.ok){
                const errorData = await response.json().catch(() => null);
                console.error("Erro do servidor: ", errorData);
                throw new Error(`Erro http: ${response.status}`)
                
            }
            const data = await response .json()
            if (data.data_entrega !== data.data_recebimento) {
                const dataFormatada = data.data_entrega.split("-").reverse().join("/");
                toast.warn(
                    `Limite de 5 pedidos de hoje atingido! Sua encomenda ficou agendada para ${dataFormatada}.`,
                    { icon: () => <span>📅</span>, autoClose: 5000 }
                );
            } else{
              toast.success(
                `Encomenda recebida, ${payload.nome}! Dona Marta já anotou seu pedido.`,
                { icon: () => <span>☕</span> }
            );  
            
            }
            reset();
        } catch (error) {
            toast.error("Sem conexão com o servidor. Que tal chamar a Dona Marta no WhatsApp?", {
                    icon: () => <span>📱</span>,
                });
        }
    }

    return (
        <section id='order-section' className='order-section'>
            <h2>Faça sua encomenda</h2>
            <form onSubmit={handleSubmit(onSubmit)} 
                className='order-form'>
                <div className="order-field">
                    <label htmlFor="order-name">
                        Nome
                    </label>
                    <input {...register("nome", {
                        required: 'Informe seu nome'
                    })} type="text" id='order-name' placeholder='Ex.: Sr. Fulano da Silva'/>
                    {
       
                            <span className={`message ${errors.nome ? 'visible' : ''}`}>
                                {errors?.nome?.message}
                            </span>
                        
                    }
                </div>

                <div className="order-field">
                    <label htmlFor="order-phone">
                        Número de telefone
                    </label>
                    <input {...register("telefone", {
                        required: 'Informe seu telefone'
                    })} type="text" id='phone-number' placeholder='Ex. : 73912345678 '/>
                    {
                 
                            <span className={`message ${errors.telefone ? 'visible' : ''}`}>
                                {errors?.telefone?.message}
                            </span>
                        
                    }
                </div>

                 <div className="order-field">
                    <label htmlFor="order-request">
                        Encomenda
                    </label>
                    <input {...register("produto", {
                        required:'Informe seu pedido'
                    })} type="text" id='order-request' placeholder='Ex. : Bolo de chocolate com recheio de uva e cobertura de caramelo'/>
                    {
                            <span className={`message ${errors.produto ? 'visible' : ''}`}>
                                {errors?.produto?.message}
                            </span>
                        
                    }
                </div>
                <button type='submit' className="order-button">Fazer encomenda</button>
            </form>
        </section>
    )

}

export default Order