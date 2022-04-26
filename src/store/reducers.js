import { combineReducers } from 'redux';

function web3(state = {}, action){
	switch(action.type){
		case 'WEB3_LOADED':
			return {...state, connection: action.connection }
		case 'WEB3_ACCOUNT_LOADED':
			return {...state, account: action.account }
		case 'ETHER_BALANCE_LOADED':
			return{...state, balance: action.balance}
		default:
			return state
	}
}

function token(state = {}, action){
	switch(action.type){
		case 'TOKEN_LOADED':
			return {...state, loaded: true, contract: action.contract }
		case 'TOKEN_BALANCE_LOADED':
			return {...state, balance: action.balance}
		default:
			return state
	}
}

function exchange(state = {}, action){
	let index, data
	switch(action.type){
		case 'EXCHANGE_LOADED':
			return {...state, loaded: true, contract: action.contract }
		case 'CANCELLED_ORDERS_LOADED':
			return {...state, cancelledOrders: { loaded: true, data: action.cancelledOrders } }
		case 'FILLED_ORDERS_LOADED':
			return {...state, filledOrders: { loaded: true, data: action.filledOrders } }
		case 'ALL_ORDERS_LOADED':
			return {...state, allOrders: { loaded: true, data: action.allOrders } }
		case 'ORDER_CANCELLING':
			return { ...state, orderCancelling: true }
		case 'ORDER_CANCELLED':
			return {
				...state,
				orderCancelling: false,
				cancelledOrders: {
					...state.cancelledOrders,
				data: [
					...state.cancelledOrders.data,
					action.order
					]
				}
			}
		case 'ORDER_FILLED':
			//Prevent duplicate orders
			index = state.filledOrders.data.findIndex(order => order.id === action.order.id)

			if (index === -1){
				data = [...state.filledOrders.data, action.order]
			}else {
				data = state.filledOrders.data
			}
			return { 
				...state,
				orderFilling: false,
				filledOrders: {
					...state.filledOrders,
					data
				}
			}
		case 'ORDER_FILLING':
			return { ...state, orderFilling: true }

		case 'EXCHANGE_ETHER_BALANCE_LOADED':
			return {... state, etherBalance: action.balance}

		case 'EXCHANGE_TOKEN_BALANCE_LOADED':
			return {... state, tokenBalance: action.balance}

		case 'BALANCES_LOADING':
			return {... state, balancesLoading: true}

		case 'BALANCES_LOADED':
			return {... state, balancesLoaded: false}

		default:
			return state
	}
}

const rootReducer = combineReducers({
	web3,
	token,
	exchange
})

export default rootReducer