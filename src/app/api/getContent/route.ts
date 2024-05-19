import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import Content from '../../../models/Content';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextResponse) {
    await dbConnect();
    try {
        const content = await Content.findOne();
       return NextResponse.json({ content: content ? content.content : '' }, { status: 200 });
    } catch (error) {
       return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
