/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import debounce from 'lodash.debounce';
import katex from "katex";
import "katex/dist/katex.min.css";
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
window.katex = katex;

Quill.register('modules/imageResize', ImageResize);

const Editor = () => {
    const [editorHtml, setEditorHtml] = useState('');

    useEffect(() => {
        async function fetchContent() {
            try {
                const response = await fetch('/api/getContent');
                const data = await response.json();
                setEditorHtml(data.content || '');
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
    }, 2000), []);

    const handleChange = (newContent: string) => {
        setEditorHtml(newContent);
        saveContent(newContent);
    };

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' }
            ],
            ['link', 'image', 'video', 'formula', 'code-block'],
            ['clean'],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
        ],
        clipboard: {
            matchVisual: false
        },
        // syntax: { hljs },
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize']
        }
    };

    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'code-block',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'formula',
        'video'
    ];

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-4xl p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
                <ReactQuill
                    className="h-80"
                    theme="snow"
                    onChange={handleChange}
                    value={editorHtml}
                    modules={modules}
                    formats={formats}
                    bounds={'#root'}
                    placeholder={'Enter your content here...'}
                />
            </div>
        </div>
    );
};

export default Editor;
