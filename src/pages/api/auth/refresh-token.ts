import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { tokenApi } from '@/services/apiServices';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST') {
        return res.status(405).json({
            error: `${req.method} method is not allowed!`,
            data: null
        });
    };

    try {
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const access = cookies.access ?? false;
        const refresh = cookies.refresh ?? false;
        if(access) return res.status(200).json({});
        if(!access && !refresh) return res.status(401).json({'error': 'Token Expired/Not Found. Login Again'});

        const apiRes = await tokenApi.post('/auth/token/verify', {token: refresh});
        if(apiRes.status!==200) return res.status(401).json({});

        const refreshApi = await tokenApi.post('/auth/token/refresh', {refresh: refresh});
        if(refreshApi.status !== 200) return res.status(401).json({});

        res.setHeader('Set-Cookie', cookie.serialize(
            'access', refreshApi.data.access, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'production',
                maxAge: 5 * 60,
                sameSite: 'strict',
                path: '/'
            }
        ));

        return res.status(200).json({});

    } catch(err: any) {
        return res.status(500).json({
            error: err.response.data.detail,
            data: null
        });
    };
};