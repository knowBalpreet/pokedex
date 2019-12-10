import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import data from '../../../assets/pokemons.json';
import logo from '../../../assets/images/logo.png';

import MainPanel from '../../components/MainPanel';
import { api } from '../../config';
const App = () => {
	const [pokemons, updatePokemons] = useState([]);
	const [categories, updateCategories] = useState([{ Action: [], Arcade: [] }]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		Promise.all([fetch(`${api}/pokemons`), fetch(`${api}/`)])
			.then(async ([pokemons, categories]) => {
				const res1 = await pokemons.json();
				const res2 = await categories.json();
				console.log('responses', res1, res2);
				updatePokemons([...res1.data.pokemons]);
				updateCategories([...res2.data.categories]);
			})
			.catch(error => message.error(error.message, 5))
			.finally(() => setLoading(false));
	}, []);
	return (
		<>
			{' '}
			<div className="text-center">
				<img src={logo} alt="" className="img-fluid mx-auto" />
			</div>
			<div className="w-75 mx-auto">
				{loading ? (
					<div className="text-center">
						<h3>Loading ...</h3>
					</div>
				) : (
					<MainPanel
						data={pokemons}
						initialState={{
							categoryModal: false,
							selectedPokemons: [],
						}}
						initialCategories={categories}
					/>
				)}
			</div>
		</>
	);
};
export default App;
