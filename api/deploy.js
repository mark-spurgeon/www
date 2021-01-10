import fetch from 'isomorphic-fetch'

export default async (req, res) => {
  let { VC_HOOK } = process.env;
  let hooked = await fetch(VC_HOOK, { method: 'POST' }).then(r => r.json());
  // hooked = hooked.json();
  res.status(202);
  res.json(hooked)
}