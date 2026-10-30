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

    const onSubmit = async (payload: OrderFormSchema) => {
        try {
            const response = await fetch("https://terracafe-backend.onrender.com/api/encomenda/", {
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
            console.log("Encomenda enviada com sucesso:", data);
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
                    })} type="text" id='order-name' placeholder='Seu nome'/>
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
                    })} type="text" id='phone-number' placeholder='Seu número de telefone'/>
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
                    })} type="text" id='order-request' placeholder='Peça seu bolo por encomenda'/>
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