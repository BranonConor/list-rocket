import { useState } from 'react';
import styled from 'styled-components';
import { SecondaryButton } from '../buttons/SecondaryButton';

export const AddListItemForm = () => {
	const [isAddItemClicked, setIsAddItemClicked] = useState<boolean>(false);
	const [titleValue, setTitleValue] = useState<string>('');

	const handleClick = () => {
		setIsAddItemClicked(true);
	};

	return isAddItemClicked ? (
		<StyledForm>
			<StyledInput
				value={titleValue}
				placeholder='Add a title'
				name='title'
				required
			/>
		</StyledForm>
	) : (
		<SecondaryButton
			variant='fullSmall'
			content='Add item'
			onClick={handleClick}
		/>
	);
};

const StyledForm = styled.form`
	width: 100%;
`;
const StyledInput = styled.input`
	width: 100%;
`;
