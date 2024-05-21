/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState, useCallback } from 'react';
import 'react-quill/dist/quill.snow.css';
import debounce from 'lodash.debounce';
import ReactQuill from 'react-quill';

const Editor = () => {
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        async function fetchContent() {
            try {
                const response = await fetch('/api/getContent');
                const data = await response.json();
                setContent(data.content || '');
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        }

        fetchContent();
    }, []);

    const saveContent = useCallback(debounce(async (diffs: string) => {
        try {
            console.log('Saving content:', diffs);
            await fetch('/api/saveContent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ diffs })
            });
        } catch (error) {
            console.error('Error saving content:', error);
        }
    }, 1500), []);

    const handleChange = (newContent: string) => {
        setContent(newContent);
        saveContent(newContent);
    };

    return (
        <div className=' mt-20'>
            <ReactQuill style={{height:300}} className=' border-solid border-2 border-purple-500' theme="snow" value={content} onChange={handleChange} />
        </div>
    );
};

export default Editor;
