

export default async function handler(req, res) {
  const { path = "", ...params } = req.query;

  const query = new URLSearchParams(params).toString();

  const response = await fetch(
   `https://marvel-server-zeta.vercel.app/${path}?${query}`
  );

  const data = await response.json();

  res.status(200).json(data);
}
