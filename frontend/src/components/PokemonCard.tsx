import React, { FC, useState, useEffect } from 'react';
import { Row, Col, Tag, Checkbox } from 'antd';
import { Pokemon } from './types';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface PokemonCard {
	item: Pokemon;
	update?: (arg0: []) => void;
	selectedPokemons?: number[];
}

const PokemonCard: FC<PokemonCard> = ({ item, selectedPokemons, update }) => {
	console.log('pokemon card', selectedPokemons);
	const select = (event: CheckboxChangeEvent) => {
		const { id } = event.target;
		console.log('select', selectedPokemons, id, update);
		if (selectedPokemons && update) {
			if (selectedPokemons.includes(+id)) {
				update(selectedPokemons.filter(category => category !== +id));
			} else {
				update([...selectedPokemons, +id]);
			}
		}
	};

	return (
		<Row align="middle" className="w-75">
			{selectedPokemons && (
				<Col span={1}>
					<Checkbox
						style={{ color: '#ffce31' }}
						checked={selectedPokemons.includes(item.id)}
						id={item.id}
						onChange={select}
					/>
				</Col>
			)}
			<Col span={4}>
				<img
					className="img-fluid img-thumbnail border border-dark"
					style={{ height: '100%', width: '100%' }}
					src={item.ThumbnailImage}
					alt={item.ThumbnailAltText}
				/>
			</Col>
			<Col span={18} offset={1}>
				<h4>{item.name}</h4>
				{item.type.map((type, index) => (
					<Tag className="text-capitalize" style={{ fontSize: 16 }} key={index}>
						{type}
					</Tag>
				))}
				<Row className="mt-5">
					<Col span={10}>
						<h6>Abilities</h6>
						{item.abilities.join(', ')}
					</Col>
					<Col span={10} offset={2}>
						<h6>Weakness</h6>
						{item.weakness.join(', ')}
					</Col>
				</Row>
			</Col>
		</Row>
	);
};
export default PokemonCard;
