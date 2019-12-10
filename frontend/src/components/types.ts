export interface Pokemon {
	abilities: string[];
	name: string;
	weight: number;
	ThumbnailAltText: string;
	weakness: string[];
	number: string;
	height: number;
	collectibles_slug: string;
	featured: string;
	id: number;
	ThumbnailImage: string;
	type: string[];
	slug: string;
}

export interface Categories {
	[key: string]: number[];
}
