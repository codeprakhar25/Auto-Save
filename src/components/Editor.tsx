'use client';

import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import debounce from 'lodash.debounce';
import DiffMatchPatch from 'diff-match-patch';

const dmp = new DiffMatchPatch();

const Editor = () => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [content, setContent] = useState<string>('');

    // useEffect(() => {
    //     if (editorRef.current) {
    //         const quill = new Quill(editorRef.current, {
    //             theme: 'snow'
    //         });

    //         const handleTextChange = debounce(() => {
    //             const newContent = quill.root.innerHTML;
    //             const diffs = dmp.diff_main(content, newContent);
    //             dmp.diff_cleanupSemantic(diffs);
    //             setContent(newContent);
    //             saveContent(diffs);
    //         }, 1000);

    //         quill.on('text-change', handleTextChange);

    //         async function fetchContent() {
    //             const response = await fetch('/api/getContent');
    //             const data = await response.json();
    //             quill.root.innerHTML = data.content || '';
    //             setContent(data.content || '');
    //         }

    //         fetchContent();

    //         return () => {
    //             quill.off('text-change', handleTextChange);
    //         };
    //     }
    // }, [content]);

    const saveContent = async (diffs: DiffMatchPatch.Diff[]) => {
        await fetch('/api/saveContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ diffs })
        });
    };

    return (
        <div>
            <div ref={editorRef} style={{ height: '400px' }} />
        </div>
    );
};

export default Editor;
