import React, { useState, FC, Dispatch, SetStateAction } from 'react';
import { Modal, Radio, Select } from 'antd';
import { Categories } from './types';

const { Option } = Select;

interface CategoryModal {
	modalVisibility: boolean;
	categories: Categories;
	update: (arg0: {}) => void;
	selectedPokemons: number[];
}

const radioStyle = {
	display: 'block',
	height: '30px',
	lineHeight: '30px',
};

const CategoryModal: FC<CategoryModal> = ({ modalVisibility, categories, update, selectedPokemons }) => {
	const [newCategory, setNewCategory] = useState<boolean>(false);
	const [currentCategory, setCurrentCategory] = useState<string>(false);

	const submitCategory = (event: Event) => {
		const { category } = event.target.dataset;
		categories[category] = selectedPokemons;
		console.log('category modal', categories, category, selectedPokemons);
		update({ categories, selectedPokemons: [], categoryModal: false });
	};

	return (
		<>
			<Modal
				title={null}
				centered={true}
				visible={modalVisibility}
				footer={null}
				onCancel={() => update({ categoryModal: false })}
			>
				<Radio.Group defaultValue={1} onChange={() => setNewCategory(!newCategory)}>
					<Radio style={radioStyle} value={1}>
						Select an existing Category
					</Radio>
					<Radio style={radioStyle} value={2}>
						Or Create a new category
					</Radio>
				</Radio.Group>
				<br />
				<br />
				{newCategory ? (
					<input
						type="text"
						className="form-control form-control-sm w-100"
						onChange={e => setCurrentCategory(e.target.value)}
						placeholder="Enter a name"
					/>
				) : (
					<Select placeholder="Select category" onChange={value => setCurrentCategory(value)} style={{ width: '100%' }}>
						{Object.keys(categories).map((category, index) => (
							<Option value={category} key={index}>
								{category}
							</Option>
						))}
					</Select>
				)}
				<br />
				<br />
				<button
					data-category={currentCategory}
					onClick={submitCategory}
					type="button"
					className="btn btn-primary w-25 rounded-pill"
				>
					Save
				</button>
			</Modal>
		</>
	);
};
export default CategoryModal;
