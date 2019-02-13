// for working with contract instances
import contract from 'truffle-contract'
// import web3
import Web3 from 'web3'
// instantiate our web3 with the provider
let web3 = null

/*
 * 	ACTION TYPES
 */
const ADD_CONTRACT = 'ADD_CONTRACT'
const SET_ACCOUNT = 'SET_ACCOUNT'
const SET_ACCOUNT_BALANCE = 'SET_ACCOUNT_BALANCE'
const WEB3_PRESENT = 'WEB3_PRESENT'


/*
 * 	ACTION CREATORS
 */
const addContract = (name, instance) => ({
	type: INITIALIZE,
	name,
	instance
})

const setAccount = (account, balance) => ({
	type: SET_ACCOUNT,
	account,
	balance
})

export const web3Present = bool => ({
	type: WEB3_PRESENT,
	bool
})


/*
 * 	THUNK CREATORS
 */
export const initializeWeb3 = () => async dispatch => {
	// if there is a web3 instance present in the window, set it
	if(window.web3) {
		web3 = new Web3(window.web3.currentProvider)
	}
	dispatch(web3Present(window.web3 !== undefined))
}

export const initializeContract = (name, blob) => async dispatch => {
	try {
		// create a contract instance from the json blob
		const contractInstance = contract(blob);
		// set the provider of the contract instance
		contractInstance.setProvider(window.web3.currentProvider);
		// find our deployed instance
		const deployedInstance = await contractInstance.deployed();
		// dispatch the action creator to update our state
		dispatch(addContract(name, deployedInstance))
	} catch (err) {
		console.error(err)
	}
}

export const initializeAccount = () => async dispatch => {
	try {
		// grab the accounts array from the current provider
		const accounts = await web3.eth.getAccounts()
		// set the current account
		const account = accounts[0]
		// grab the account balance and address
		const balance = await web3.utils.fromWei(await web3.eth.getBalance(account))
		// update our redux store
		dispatch(setAccount(account, balance))
	} catch (err) {
		console.error(err)
	}
}


/*
 * 	INITIAL STATE
 */
const initialState = {
	contracts: new Map(),
	account: "No account found, make sure you are connected to a network",
	balance: 0,
	metamask: true
}


/*
 * 	REDUCER
 */
const reducer = (state=initialState, action) => {
	switch(action.type) {
		case ADD_CONTRACT:
			return { ...state, contracts: contracts.set(action.name, action.instance) }

		case SET_ACCOUNT:
			return { ...state, account: action.account, balance: action.balance }

		case WEB3_PRESENT:
			return { ...state, metamask: action.bool }

		default:
			return state
	}
}

export default reducer