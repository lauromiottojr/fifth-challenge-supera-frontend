import { useState, useEffect } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { RxReset } from 'react-icons/rx'
import DatePicker from "react-datepicker"

import statementFetch from '../../axios/config'

import './Statement.css'
import "react-datepicker/dist/react-datepicker.css"

const Statement = () => {

    const [minDate, setMinDate] = useState();
    const [maxDate, setMaxDate] = useState();
    const [name, setName] = useState("");

    const [totalAmount, setTotalAmount] = useState(0);

    const [transactions, setTransactions] = useState([])

    const getTransactions = async () => {
        try {
            let total = 0;
            const response = await statementFetch.get('/transactions')
            const data = response.data
            data.map((amount) => {
                total = total + amount.transactionAmount;
            })
            const currencyFormat = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            setTotalAmount(currencyFormat)
            setTransactions(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getSearchTransactions = async (event) => {
        event.preventDefault();
        const dmin = minDate ? minDate.toISOString().slice(0, 10) : "";
        const dmax = maxDate ? maxDate.toISOString().slice(0, 10) : "";
        try {
            const response = await statementFetch.get(`/transactions/search?minDate=${dmin}&maxDate=${dmax}&name=${name}`)
            const data = response.data
            setTransactions(data)
        } catch (error) {
            console.log(error)
        }
    }

    const cleanPage = () => {
        document.getElementById('start').value = '';
        document.getElementById('end').value = '';
        document.getElementById('name').value = '';
        setMinDate("")
        setMaxDate("")
        setName("")        
        getTransactions()
    }

    useEffect(() => {
        getTransactions()
        getPeriodBalance()
    }, [])

    const getPeriodBalance = () => {
        let internSum = 0;
        transactions.map((transaction) => {
            internSum = internSum + transaction.transactionAmount;
        })
        const currencyFormat = internSum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return currencyFormat;
    }

    let periodBalance = getPeriodBalance();

    return (
        <>
            <div className="statementCard">
                <h2 className="statementTitle">Movimentações</h2>
                <div className='searchFormControl'>
                    <div>
                        <p>Inicio:</p>
                        <DatePicker
                            name='start' id='start'
                            selected={minDate}
                            onChange={(date) => setMinDate(date)}
                            className="inputField"
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                    <div>
                        <p>Fim:</p>
                        <DatePicker
                            name='end' id='end'
                            selected={maxDate}
                            onChange={(date) => setMaxDate(date)}
                            className="inputField"
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Nome do operador:</label>
                        <input type="text" className='inputField' name='name' id='name' onChange={e => setName(e.target.value)} />
                    </div>
                    <div className='btnContainer'>
                        <button type='submit' className='btnIcon' onClick={getSearchTransactions}><BiSearchAlt2 /></button>
                        <button type='submit' className='btnIcon' onClick={cleanPage}><RxReset /></button>
                    </div>
                </div>
                <div>
                    <div className="formControl">
                        <p>Salto total: <span>R${totalAmount}</span></p>
                        <p>Saldo no período: <span>{periodBalance}</span></p>
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
                            {(
                                transactions.map((transaction) => (
                                    <tr key={transaction.transactionId}>
                                        <td>{transaction.transactionDate}</td>
                                        <td>{transaction.transactionAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
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