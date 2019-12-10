import React, { FunctionComponent, ReactNode } from 'react';
import { Spin } from 'antd';

interface Props {
	spinning: boolean;
	title: string;
	children?: ReactNode;
}

/**
 * Functional component to represent Loading...
 */
const Loading: FunctionComponent<Props> = ({ spinning = true, children, title = 'Loading ...' }) => (
	<Spin spinning={spinning} size="large" tip={title}>
		{children}
	</Spin>
);

export default Loading;
