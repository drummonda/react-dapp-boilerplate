import React, { Component } from 'react'
import { connect } from 'react-redux'
import MetamaskAlert from './metamaskAlert'
import { initializeContract, initializeAccount, initializeWeb3 } from '../store'

class Main extends Component {

	async componentDidMount() {
		const { initializeAccount, initializeWeb3 } = this.props
		await initializeWeb3()
		await initializeAccount()
	}

	render() {
		const { account, balance } = this.props
		return (
			<div id="main">
				<MetamaskAlert/>
				<h2>Welcome to a simple boilerplate for a dApp with React / Redux / Truffle</h2>
				<h4>ft. Bootstrap</h4>
				<hr/>
				<h4>If Metamask is connected, you should see an account and balance here</h4>
				<h5 id="account">Account: {account}</h5>
				<h5 id="balance">Balance: {balance} ether</h5>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	contracts: state.web3.contracts,
	account: state.web3.account,
	balance: state.web3.balance
})

const mapDispatchToProps = dispatch => ({
	initializeContract: (name, blob) => dispatch(initializeContract(name, blob)),
	initializeAccount: () => dispatch(initializeAccount()),
	initializeWeb3: () => dispatch(initializeWeb3())
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)