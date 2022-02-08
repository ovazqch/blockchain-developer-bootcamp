pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

//openzeppelin-contracts/blob/master/contracts/utils/math/Math.sol

contract Token {
	using SafeMath for uint;
	// aqui utilizamos el script importado arriba para realizar operaciones
	// matematicas seguras bajo el protocolo para smart contract

	//Variables
	string public name = "Amigo Token";
	string public symbol = "AMIG";
	uint256 public decimals = 18;
	uint256 public totalSupply;
	// Track balances
	// tenemos que alamacenenar los balances, este smart contract almacena informacion e implementa comportamiento
	// la informacion se almacena directamente en el blockchain.

	mapping(address => uint256) public balanceOf;
	// la funcion mapping funciona como un tipo de array, donde asocias
	// key value pairs, en este caso asociamos el addres con el balance de Tokens.
	mapping(address => mapping(address => uint256)) public allowance;


	//Events
	event Transfer(address indexed from, address indexed to, uint256 value);
	event Approval(address indexed owner, address indexed spender, uint256 value);

	// Send tokens
	constructor() public {
		totalSupply = 1000000 * (10 ** decimals);
		balanceOf[msg.sender] = totalSupply;
		//Utiliza el metodo mapping creado en la linea 14.
		//dentro de los corchetes se establece el usuario al que pertenecen
		//en este caso corresponden al usuario que despliega el token dado
		//el codigo msg.sender.
	}

	function transfer(address _to, uint256 _value) public returns (bool success){
		require(balanceOf[msg.sender] >= _value);
		_transfer(msg.sender, _to, _value);
		return true;
	}

	function _transfer(address _from, address _to, uint256 _value) internal {
		require(_to != address(0));
		balanceOf[_from] = balanceOf[_from].sub(_value);
		balanceOf[_to] = balanceOf[_to].add(_value);
		emit Transfer(_from, _to, _value);
	}

	// Approve tokens
	function approve(address _spender, uint256 _value) public returns (bool success) {
		require(_spender != address(0));
		allowance[msg.sender][_spender] = _value;
		emit Approval(msg.sender, _spender, _value);
		return true;
	}

	// Transfer from
	function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
		require(_value <= balanceOf[_from]);
		require(_value <= allowance[_from][msg.sender]);
		allowance[_from][msg.sender] = allowance[_from][msg.sender].sub(_value);
		_transfer(_from, _to, _value);
		return true;
	}




}