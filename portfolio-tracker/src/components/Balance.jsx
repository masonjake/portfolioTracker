import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function Balance() {
	const [balance, setBalance] = useState(0);

	useEffect(() => {
		const network = 'goerli';

		async function getBalance() {
			const provider = new ethers.AlchemyProvider(
				network,
				import.meta.env.VITE_ALCHEMY_API_KEY
			);
			try {
				const eth = await provider.getBalance(
					'0x8dC847Af872947Ac18d5d63fA646EB65d4D99560'
				);

				setBalance(ethers.formatEther(eth));
				console.log(ethers.formatEther(eth));
			} catch (e) {
				console.log('error' + e);
			}
		}
		getBalance();
	}, []);

	return (
		<div>
			<h4>Your Balance</h4>
			<h1 id="balance">{balance}ETH</h1>
		</div>
	);
}
