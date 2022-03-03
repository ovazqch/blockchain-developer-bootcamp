import React from 'react'

export default function ({ type }) {
	if(type === 'table') {
		return(<tbody className="spinner-border text-ligth text-center"></tbody>)
	} else {
		return(<div className="spinner-border text-ligth text-center"></div>)
	}
}
