import React, {useEffect, useState } from 'react'
import './styles.css'
import api from '../../services/api'

export default function Cadastro(){

    const [type, setType] = useState('')
    const [name, setName] = useState('')
    const [documentNumber, setDocumentNumber] = useState('')
    const [maxLength, setMaxLength] = useState('')
    const [minLength, setMinLength] = useState('')

    const [clients, setClients] = useState([])
    const [accounts, setAccounts] = useState([])
    const [cards, setCards] = useState([])
    

    useEffect(()=>{
        loadListClients()
        loadListAccounts()
        loadListCards()
    },[])

    async function handleCadastro(e){
        e.preventDefault()
       const document = formatCpfOrCnpj(documentNumber)
        

        const data = {
            type,
            name,
            document    
        }

        try{
           const response = await api.post('/client', data)
            handleCreateAccount(response.data.type, response.data.id, response.data.score)
            loadListClients()
        }catch(err){
            alert(err.response.data)
        }
    }
  
    async function handleCreateAccount(type, id, score){
        let agency = '8519-6'
        let client_id = id

        const data={
            agency,
            client_id,
            type,
            score
        }

        try{
            const response = await api.post('/account', data)
            handleCard(response.data.limit_credit, response.data.id)
            loadListAccounts()
            
        }catch(err){
            alert(err.response.data)
        }


    }

    async function handleCard(limit_credit, account_id){
        const data={
            limit_credit,
            account_id
        }

        try{
            const response = await api.post('/account/card',data)
            loadListCards()
        }catch(err){
            alert(err.response.data)
        }

    }

    const loadListClients=()=>{
        api.get('/client')
        .then(response =>{
            console.log(response.data)
            setClients(response.data)
        })
    }

    const loadListAccounts = ()=>{
        api.get('/account')
        .then(response =>{
            console.log(response.data)
            setAccounts(response.data)
        })
    }

    const loadListCards =()=>{
        api.get('/account/card')
        .then(response=>{
            console.log(response.data)
            setCards(response.data)
        })
    }  

    const list=(value)=>{
        if(value === 'clientes'){
            return clients.map((cliente, index)=>(
                <tr key={index}>
                    <td>{cliente.id}</td>
                    <td>{cliente.name}</td>
                    <td>{cliente.document}</td>
                    <td>{cliente.type}</td>
                    <td>{cliente.score}</td>
                </tr>
            ))
        } 
        else if(value === 'contas'){
            return accounts.map((conta, index)=>(
                <tr key={index}>
                    <td>{conta.id}</td>
                    <td>{conta.number}</td>
                    <td>{conta.agency}</td>
                    <td>{conta.type_account}</td>
                    <td>{conta.client_id}</td>
                    <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(conta.overdraft)}</td>
                </tr>
                
            ))
        }
        else if(value === 'catoes'){
            return cards.map((card, index)=>(
                <tr key={index}>
                    <td>{card.id}</td>
                    <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(card.limit_credit)}</td>
                    <td>{card.account_id}</td>
                </tr>
            ))
           
        }
    }

    const setMaxCaractere =(value)=>{
        if(value === 'pf'){
            setMaxLength(11)
            setMinLength(11)
        }
       else if(value === 'pj'){
            setMaxLength(14)
            setMinLength(14)
       }
       
           
    }

    const formatCpfOrCnpj = value => {

        if (value.length === 11){
            return value
            .replace(/\D/g, '') 
            .replace(/(\d{3})(\d)/, '$1.$2') 
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1') 
        }  
        else if (value.length === 14) {  
            return value           
            .replace(/(\d{2})(\d)/, "$1.$2")           
            .replace(/(\d{2})\.(\d{3})(\d)/, "$1 $2 $3")            
            .replace(/\.(\d{3})(\d)/, ".$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2") 
        } 
      



      }

    return(
        <div className='cadastro-container'>
            <form onSubmit={handleCadastro}>
                <fieldset className='fieldset'>
                    <legend>Cadastro De Cliente</legend>

                    <fieldset className='fieldset' id='fieldset-box-01'>

                        <label htmlFor='nome'>Nome:</label>
                        <input  placeholder='Informe Seu Nome' 
                                id='nome'
                                type='text'
                                value={name}
                                onChange={e => setName(e.target.value)} 
                                pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$"
                                />

                           
                            <fieldset className='fieldset' id='fieldset-box-02'>
                                 <legend>Tipo De Pessoa</legend>
                                    <label>
                                        <input  type='radio' 
                                                name='tipo' 
                                                value='pf'
                                                onClick={e => setMaxCaractere(e.target.value)}
                                                onChange={e => setType(e.target.value)}/>
                                        Física
                                    </label>

                                    <label>
                                        <input  type='radio' 
                                                name='tipo' 
                                                value='pj'
                                                onClick={e => setMaxCaractere(e.target.value)}
                                                onChange={e => setType(e.target.value)}/>
                                        Juridica
                                    </label>
                            </fieldset>

                            <label htmlFor='documento' >Documento:</label>
                            <input  placeholder='Informe o Numero do Seu CPF ou CNPJ'
                                    id='documento' 
                                    type='text'
                                    value={documentNumber}
                                    onChange={e => setDocumentNumber(e.target.value)}
                                    pattern="[0-9]+$"
                                    minLength={minLength}
                                    maxLength={maxLength}
                                />
                    </fieldset>               
                </fieldset>
                <input className='btn enviar' type="submit" value="Enviar "/>
                <input className='btn resetar' type="reset" value="Limpar"/>
            </form>

            <div className='container-list'>
                <div className='container-table'>
                <div className='theade'>              
                        <div className='theade-th'>Cliente_Id</div>
                        <div className='theade-th'>Nome</div>
                        <div className='theade-th'>Documento</div>
                        <div className='theade-th'>Tipo</div> 
                        <div className='theade-th'>Score</div>                            
                    </div>
                    <div className='scroll-table'>
                        <table className='table'>
                            <tbody>
                                {list('clientes')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='container-table'>
                <div className='theade'>              
                        <div className='theade-th'>Conta_Id</div>
                        <div className='theade-th'>Numero</div>
                        <div className='theade-th'>Agência</div>
                        <div className='theade-th'>Tipo_Conta</div> 
                        <div className='theade-th'>Client_Id</div> 
                        <div className='theade-th'>Cheque_Especial</div>                                        
                    </div>
                    <div className='scroll-table'>
                        <table className='table'>
                            <tbody>
                                {list('contas')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='container-table'>
                <div className='theade'>              
                        <div className='theade-th'>Cartao_Id</div>
                        <div className='theade-th'>Limite</div>
                        <div className='theade-th'>Conta_Id</div>                                 
                    </div>
                    <div className='scroll-table'>
                        <table className='table'>
                            <tbody>
                                {list('catoes')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
