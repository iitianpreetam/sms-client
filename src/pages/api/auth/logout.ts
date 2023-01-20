import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST') {
        return res.status(405).json({
            error: `${req.method} method is not allowed!`,
            data: null
        });
    };
    res.setHeader('Set-Cookie', [
        cookie.serialize(
            'access', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'production',
                expires: new Date(0),
                sameSite: 'strict',
                path: '/'
            }
        ),
        cookie.serialize(
            'refresh', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'production',
                expires: new Date(0),
                sameSite: 'strict',
                path: '/'
            }
        )
    ]);
    return res.status(200).json({
        success: 'Logged out successfully!',
        data: null
    });
};