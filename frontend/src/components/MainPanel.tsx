import React, { FunctionComponent, useState } from 'react';
import { Pokemon, Categories } from './types';
import { Tabs, Popconfirm, Spin } from 'antd';
import PokemonList from './PokemonList';
import CategoryModal from './CategoryModal';
import PokemonSortList from './PokemonSortList';
import { usePersistentState, useUndo, useFetch } from './hooks';
import { api } from '../config';
const { TabPane } = Tabs;

// TODO:
// 3. integrate APIs

interface Props {
	data: Pokemon[];
	initialState: State;
	initialCategories: Categories[];
}

interface State {
	categoryModal: boolean;
	selectedPokemons: number[];
}

const MainPanel: FunctionComponent<Props> = ({ data, initialState, initialCategories }) => {
	const [state, setState] = usePersistentState<State>('data', { ...initialState });
	const [loading, setLoading] = useState<boolean>(false);
	const [categories, setCategories, undoCategories, redoCategories, history] = useUndo(useState(initialCategories));

	const updateState = (newState: Partial<State>) => {
		setState({ ...state, ...newState });
	};

	const syncCategories = async (updatedCategories: Categories) => {
		// Hit api to sync categories
		setLoading(true);

		const res = await fetch(`${api}/`, {
			method: 'POST',
			cache: 'no-cache',
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify({ categories: [...history, updatedCategories] }),
		});
		const data = res.json();
		console.log('daataa', data);
		setCategories({ ...updatedCategories });
		updateState({ selectedPokemons: [] });
		setLoading(false);
	};

	const deleteCategory = (category: string, categories: Categories) => {
		const { [category]: toBeRemoved, ...updatedCategories } = categories;
		syncCategories(updatedCategories);
	};

	const updateCategory = (pokemonIds: number[], category: string, categories: Categories) => {
		const updatedCategories = { ...categories, [category]: pokemonIds };
		syncCategories(updatedCategories);
	};

	console.log('state', state, initialCategories, categories);

	return (
		<Spin spinning={loading} tip="Loading ...">
			<div className="shadow-lg bg-white p-3" style={{ maxHeight: '80vh', overflowY: 'scroll', borderRadius: 16 }}>
				{' '}
				<Tabs defaultActiveKey="all">
					<TabPane tab="All" key="all" style={{ position: 'relative' }}>
						<PokemonList
							data={data}
							updateSelectedPokemons={selectedPokemons => updateState({ selectedPokemons })}
							selectedPokemons={state.selectedPokemons}
						/>
					</TabPane>
					{Object.keys(categories).map((category, index) => (
						<TabPane tab={category} key={category}>
							{history.length > 1 && (
								<span onClick={undoCategories} className="text-info" style={{ cursor: 'pointer' }}>
									Undo Reorder
								</span>
							)}
							&nbsp; &nbsp; &nbsp;
							<Popconfirm
								title="Are you sure delete this category?"
								onConfirm={() => deleteCategory(category, categories)}
								onCancel={() => console.log('fail')}
								okText="Yes"
								cancelText="No"
							>
								<span style={{ cursor: 'pointer' }} className="text-danger">
									Delete Category
								</span>
							</Popconfirm>
							<PokemonSortList
								data={data}
								categoryPokemonsIds={categories[category]}
								updateCategory={(pokemonIds: number[]) => updateCategory(pokemonIds, category, categories)}
							/>
						</TabPane>
					))}
				</Tabs>
				{state.selectedPokemons.length > 0 && (
					<div className="w-75 text-center">
						<button
							type="button"
							className="btn btn-primary rounded-pill p-3 px-5"
							style={{ position: 'absolute', bottom: '5vh' }}
							onClick={() => updateState({ categoryModal: true })}
						>
							Add to Category
						</button>
					</div>
				)}
				{state.categoryModal && (
					<CategoryModal
						modalVisibility={state.categoryModal}
						selectedPokemons={state.selectedPokemons}
						categories={categories}
						update={(state: Partial<State>) => updateState({ ...state })}
					/>
				)}
			</div>
		</Spin>
	);
};
export default MainPanel;
