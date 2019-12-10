import React, { useState, FC } from 'react';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Icon, List } from 'antd';
import { Pokemon } from './types';
import PokemonCard from './PokemonCard';
import { FixedSizeList as VList } from 'react-window';

const DragHandle = sortableHandle(() => <Icon style={{ fontSize: 24 }} type="drag" />);

const SortableItem = sortableElement(({ item }) => (
	<div className="d-flex w-100 align-items-center">
		<DragHandle />
		&nbsp; &nbsp; &nbsp;
		<PokemonCard item={item} />
	</div>
));

const Row = ({ index, style, data }) => {
	const item = data[index];

	return (
		<List.Item key={index} style={style}>
			<SortableItem key={item.id} item={item} index={index} />
		</List.Item>
	);
};

const SortableContainer = sortableContainer(({ data }) => {
	return (
		<List dataSource={undefined}>
			<VList
				height={window.innerHeight}
				width={window.innerWidth}
				itemData={data}
				itemCount={data.length}
				itemSize={250}
				overscanCount={3}
			>
				{Row}
			</VList>
		</List>
	);
});

interface Props {
	data: Pokemon[];
	categoryPokemonsIds: number[];
	updateCategory: (arg0: number[]) => void;
}

const PokemonSortList: FC<Props> = ({ data, categoryPokemonsIds, updateCategory }) => {
	const pokemons: Pokemon[] = [];
	categoryPokemonsIds.forEach(id => {
		pokemons.push(data.find(pokemon => pokemon.id === id));
	});
	// const pokemons = data.filter(pokemon => categoryPokemonsIds.includes(pokemon.id));

	const onSortEnd = ({ oldIndex, newIndex }) => {
		const category = arrayMove(categoryPokemonsIds, oldIndex, newIndex);
		console.log('onsortend', categoryPokemonsIds, oldIndex, newIndex, category);
		updateCategory(category);
	};
	return <SortableContainer onSortEnd={onSortEnd} useDragHandle={true} data={pokemons} />;
};

export default PokemonSortList;
