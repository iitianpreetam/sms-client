import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { tokenApi } from '@/services/apiServices';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST') {
        return res.status(405).json({
            error: `${req.method} method is not allowed`,
            data: null
        });
    };

    try {
        const body = req.body;
        const apiRes = await tokenApi.post('/auth/token', body);
        if(apiRes.status!==200) {
            return res.status(apiRes.status).json({
                error: apiRes.data.error,
                data: null
            });
        };
        res.setHeader('Set-Cookie', [
            cookie.serialize(
                'access', apiRes.data.access, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'production',
                    maxAge: 5 * 60,
                    sameSite: 'strict',
                    path: '/'
                }
            ),
            cookie.serialize(
                'refresh', apiRes.data.refresh, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'production',
                    maxAge: 7 * 24 * 60 * 60,
                    sameSite: 'strict',
                    path: '/'
                }
            )
        ]);
        return res.status(200).json({
            success: 'Authentication Success!',
            data: apiRes.data
        });
    } catch(err: any) {
        return res.status(500).json({
            error: err.response.data.detail,
            data: null
        });
    };
};