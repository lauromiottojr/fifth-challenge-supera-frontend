import { useState, useEffect } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import DatePicker from "react-datepicker"

import statementFetch from '../../axios/config'

import './Statement.css'
import "react-datepicker/dist/react-datepicker.css"

const Statement = () => {

    const min = new Date(new Date().setDate(new Date().getDate() - 365));
    const max = new Date();

    const [minDate, setMinDate] = useState(min);
    const [maxDate, setMaxDate] = useState(max);

    const [transactions, setTransactions] = useState([])

    const getTransactions = async () => {
        try {
            const response = await statementFetch.get('/transactions')
            const data = response.data
            setTransactions(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTransactions()
    }, [])

    return (
        <>
            <div className="statementCard">
                <h2 className="statementTitle">Movimentações</h2>
                <div className='searchFormControl'>
                    <div>
                        <p>Inicio:</p>
                        <DatePicker
                            selected={minDate}
                            onChange={(date) => setMinDate(date)}
                            className="inputField"
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                    <div>
                        <p>Fim:</p>
                        <DatePicker placeholder='fim'
                            name='end' id='end'
                            selected={maxDate}
                            onChange={(date) => setMaxDate(date)}
                            className="inputField"
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Nome do operador:</label>
                        <input type="text" className='inputField' name='name' id='name' />
                    </div>
                    <div>
                        <button type='submit' className='teste'><BiSearchAlt2 /></button>
                    </div>
                </div>
                <div>
                    <div className="formControl">
                        <p>Salto total: <span>R$xxx,xx</span></p>
                        <p>Saldo no período: <span>R$xxx,xx</span></p>
                    </div>
                </div>

                <div>
                    <table className="statementBody">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Valentia</th>
                                <th>Tipo</th>
                                <th>Nome transacionado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length === 0 ? (<tr><td>Carregando...</td></tr>) : (
                                transactions.map((transaction) => (
                                    <tr key={transaction.transactionId}>
                                        <td>{transaction.transactionDate}</td>
                                        <td>{transaction.transactionAmount}</td>
                                        <td>{transaction.transactionType}</td>
                                        <td>{transaction.transactionToName ? transaction.transactionToName : (<p>N/A</p>)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}

export default Statement