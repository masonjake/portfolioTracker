import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Balance from './Balance';

export default function Search() {
	const [value, setValue] = useState('');
	const [clicked, setClicked] = useState(false);
	const [address, setAddress] = useState('');
	const [balance, setBalance] = useState(0);

	useEffect(() => {
		const network = 'mainnet';

		async function getBalance() {
			const provider = new ethers.AlchemyProvider(
				network,
				import.meta.env.VITE_ALCHEMY_API_KEY
			);
			try {
				const eth = await provider.getBalance(address);

				setBalance(ethers.formatEther(eth));
				console.log(ethers.formatEther(eth));
			} catch (e) {
				console.log('error' + e);
			}
		}
		getBalance();
	}, [address]);

	function handleClick() {
		setClicked(!clicked);
	}
	function handleChange(event) {
		setValue(event.target.value);
	}
	function handleSubmit(event) {
		event.preventDefault();
		setAddress(value);
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				{clicked ? (
					<input
						value={value}
						onChange={handleChange}
						type="text"
						placeholder="enter address"
					></input>
				) : (
					<div value={value} onClick={handleClick}>
						Click here to enter search query:
					</div>
				)}
			</form>
			<Balance balance={balance} />
		</>
	);
}
