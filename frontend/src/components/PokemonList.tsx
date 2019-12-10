import React, { FC } from 'react';
import { List } from 'antd';
import { Pokemon } from './types';
import PokemonCard from './PokemonCard';
import { FixedSizeList as VList } from 'react-window';

interface Props {
	data: Pokemon[];
	selectedPokemons?: number[];
	updateSelectedPokemons?: (arg0: {}) => void;
}

const PokemonList: FC<Props> = ({ data, selectedPokemons, updateSelectedPokemons }) => {
	console.log('pokemon list', data);
	const Row = ({ index, style }) => {
		const item = data[index];

		return (
			<List.Item key={index} style={style}>
				<PokemonCard selectedPokemons={selectedPokemons} update={updateSelectedPokemons} item={item} />
			</List.Item>
		);
	};
	return (
		<>
			<List dataSource={undefined}>
				<VList
					overscanCount={3}
					height={window.innerHeight}
					width={window.innerWidth}
					itemCount={data.length}
					itemSize={250}
				>
					{Row}
				</VList>
			</List>
		</>
	);
};
export default PokemonList;
