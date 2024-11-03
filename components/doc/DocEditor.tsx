'use client';

import { Block, BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import React, { useEffect, useMemo, useState } from 'react';

interface DocEditorProps {
	onChange: (jsonBlocks: Block[]) => void;
	currentEvent: any;
}

export const DocEditor = ({ onChange, currentEvent }: DocEditorProps) => {
	const [initialContent, setInitialContent] = useState<
		PartialBlock[] | undefined | 'loading'
	>('loading');
	// Creates a new editor instance.
	// We use useMemo + createBlockNoteEditor instead of useCreateBlockNote so we
	// can delay the creation of the editor until the initial content is loaded.
	const editor = useMemo(() => {
		if (initialContent === 'loading') {
			return undefined;
		}
		return BlockNoteEditor.create({ initialContent });
	}, [initialContent]);

	// Loads the previously stored editor contents.
	useEffect(() => {
		setInitialContent(
			currentEvent.doc ? JSON.parse(currentEvent.doc.data) : undefined
		);
	}, []);

	if (editor === undefined) {
		return <div>Loading content...</div>;
	}

	return (
		<BlockNoteView
			// @ts-ignore
			editor={editor as BlockNoteEditor}
			theme='light'
			onChange={() => {
				onChange(editor.document);
			}}
		/>
	);
};
