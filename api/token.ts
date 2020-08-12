import { NowRequest, NowResponse } from '@vercel/node';

export default (req: NowRequest, res: NowResponse) => {
  let { GH_TOKEN, PASSCODE } = process.env;
  let { p } = req.query;
  
  let token = (p === PASSCODE) ? GH_TOKEN : null
  res.status(200).json({
    status: (token) ? 'ok' : 'Error: probably wrong passcode',
    token
  })
};
