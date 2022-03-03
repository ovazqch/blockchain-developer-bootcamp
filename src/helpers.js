export const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'
export const GREEN = 'success'
export const RED = 'danger'


export const DECIMALS = (10**18)

// Shortcut to avoid passing around web3 connection
export const ether = (wei) => {
	if(wei){
		return(wei / DECIMALS)
	}
}

// Tokens and ether have same decimal resolution
export const tokens = ether