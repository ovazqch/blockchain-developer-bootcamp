import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import Spinner from './spinner'
import { 
	loadBalances,
	depositEther,
	withdrawEther
} from '../store/interactions'

import {
	web3Selector,
	exchangeSelector,
	tokenSelector,
	accountSelector,
	etherBalanceSelector,
	tokenBalanceSelector,
	exchangeEtherBalanceSelector,
	exchangeTokenBalanceSelector,
	balancesLoadingSelector,
	etherDepositAmountSelector,
	etherWithdrawAmountSelector
} from '../store/selectors'
import { 
	etherDepositAmountChanged,
	etherWithdrawAmountChanged
} from '../store/actions'

const showForm = (props) => {
	const {
		etherBalance,
		exchangeEtherBalance,
		tokenBalance,
		exchangeTokenBalance,
		dispatch,
		etherDepositAmount,
		exchange,
		token,
		account,
		web3,
		etherWithdrawAmount
	} = props 

	return(
		<Tabs defaultActiveKey="deposit" className="bg-dark text-white">

      <Tab eventKey="deposit" title="Deposit" className="bg-dark">
	      <table className="table table-dark table-sm small">
	          <thead>
	            <tr>
	              <th>Token</th>
	              <th>Wallet</th>
	              <th>Exchange</th>
	            </tr>
	          </thead>
	          <tbody>
	            <tr>
	              <td>ETH</td>
	              <td>{etherBalance}</td>
	              <td>{exchangeEtherBalance}</td>
	            </tr>
	          </tbody>
	        </table>

	        <form className="row" onSubmit={(event) => {
          event.preventDefault()
          depositEther(dispatch, exchange, web3, etherDepositAmount, account)
        }}>
          <div className="col-12 col-sm pr-sm-2">
            <input
            type="text"
            placeholder="ETH Amount"
            onChange={(e) => dispatch( etherDepositAmountChanged(e.target.value))}
            className="form-control form-control-sm bg-dark text-white"
            required />
          </div>
          <div className="col-12 col-sm-auto pl-sm-0">
            <button type="submit" className="btn btn-primary btn-block btn-sm">Deposit</button>
          </div>
        </form>

	        <table className="table table-dark table-sm small">
          <tbody>
            <tr>
              <td>AMIG</td>
              <td>{tokenBalance}</td>
              <td>{exchangeTokenBalance}</td>
            </tr>
          </tbody>
        </table>

        
			</Tab>

			<Tab eventKey="withdraw" title="Withdraw" className="bg-dark">
			<table className="table table-dark table-sm small">
	          <thead>
	            <tr>
	              <th>Token</th>
	              <th>Wallet</th>
	              <th>Exchange</th>
	            </tr>
	          </thead>
	          <tbody>
	            <tr>
	              <td>ETH</td>
	              <td>{etherBalance}</td>
	              <td>{exchangeEtherBalance}</td>
	            </tr>
	          </tbody>
	        </table>

	        <form className="row" onSubmit={(event) => {
          event.preventDefault()
          withdrawEther(dispatch, exchange, web3, etherWithdrawAmount, account)
        }}>
          <div className="col-12 col-sm pr-sm-2">
            <input
            type="text"
            placeholder="ETH Amount"
            onChange={(e) => dispatch( etherWithdrawAmountChanged(e.target.value) )}
            className="form-control form-control-sm bg-dark text-white"
            required />
          </div>
          <div className="col-12 col-sm-auto pl-sm-0">
            <button type="submit" className="btn btn-primary btn-block btn-sm">Withdraw</button>
          </div>
        </form>
	        
	        <table className="table table-dark table-sm small">
          <tbody>
            <tr>
              <td>AMIG</td>
              <td>{tokenBalance}</td>
              <td>{exchangeTokenBalance}</td>
            </tr>
          </tbody>
        </table>

        

			</Tab>

		</Tabs>
	)
}

class Balance extends Component{
	componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const { dispatch, web3, exchange, token, account  } = this.props
    await loadBalances(dispatch, web3, exchange, token, account)
  }

	render(){
		return (
			<div className="card bg-dark text-white">
				<div className="card-header">
					Balance  
				</div>
				<div className="card-body">
					{showForm(this.props)}
					{/*{this.props.showForm ? showForm(this.props) : <Spinner />} // TODO: Revisar por que no carga propiedades*/}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	const balancesLoading = balancesLoadingSelector(state)
	// console.log({
	// 	account: accountSelector(state),
	// 	exchange: exchangeSelector(state),
	// 	token: tokenSelector(state),
	// 	web3: web3Selector(state),
	// 	etherBalance: etherBalanceSelector(state),
	// 	tokenBalance: tokenBalanceSelector(state),
	// 	exchangeEtherBalance: exchangeEtherBalanceSelector(state),
	// 	exchangeTokenBalance: exchangeTokenBalanceSelector(state)
	// })

	return{
		account: accountSelector(state),
    exchange: exchangeSelector(state),
    token: tokenSelector(state),
    web3: web3Selector(state),
    etherBalance: etherBalanceSelector(state),
    tokenBalance: tokenBalanceSelector(state),
    exchangeEtherBalance: exchangeEtherBalanceSelector(state),
    exchangeTokenBalance: exchangeTokenBalanceSelector(state),
    balancesLoading,
    showForm: !balancesLoading,
    etherDepositAmount: etherDepositAmountSelector(state),
    etherWithdrawAmount: etherWithdrawAmountSelector(state)
	}
}

export default connect(mapStateToProps)(Balance)