import dbConnect from '../../../utils/dbConnect';
import Content from '../../../models/Content';
import DiffMatchPatch from 'diff-match-patch';
import { NextRequest, NextResponse } from 'next/server';

const dmp = new DiffMatchPatch();

export async function POST(req: NextRequest, res: NextResponse) {
    await dbConnect();

    let diffs;
    try {
        const body = await req.json();
        diffs = body.diffs;
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: 'Invalid request body' }), { status: 400 });
    }

    try {
        let existingContent = await Content.findOne();
        if (existingContent) {
            let newContent = dmp.patch_apply(dmp.patch_make(existingContent.content, diffs), existingContent.content)[0];
            existingContent.content = newContent;
            await existingContent.save();
        } else {
            const newContent = dmp.patch_apply(dmp.patch_make('', diffs), '')[0];
            await Content.create({ content: newContent });
        }
        return new NextResponse(JSON.stringify({ message: 'Content saved' }), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: 'Failed to save content' }), { status: 500 });
    }
}
