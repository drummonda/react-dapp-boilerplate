// for working with contract instances
import contract from 'truffle-contract'

/*
 * 	HELPER FUNCTIONS
 */
const initializeContract = async (name, blob) => {
	// create a contract instance from the json blob
	const contractInstance = contract(blob);
	// set the provider of the contract instance
	contractInstance.setProvider(window.web3.currentProvider);
	// find our deployed instance
	const deployedInstance = await contractInstance.deployed();

}


/*
 * 	ACTION TYPES
 */
const INITIALIZE_CONTRACT = 'INITIALIZE_CONTRACT'


/*
 * 	ACTION CREATORS
 */
const initializeContract = (name, blob) => ({
	type: INITIALIZE,
	name,
	blob
})


/*
 * 	THUNK CREATORS
 */
// const initializeContract = (name, blob) => ({
// 	type: INITIALIZE,
// 	name,
// 	blob
// })


/*
 * 	INITIAL STATE
 */
const initialState = {
	contracts: new Map()

}


/*
 * 	REDUCER
 */
const reducer = (state=initialState, action) => {
	switch(action.type) {
		case INITIALIZE_CONTRACT:
			

		default:
			return initialState
	}
}

export default reducer