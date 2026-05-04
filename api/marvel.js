

export default async function handler(req, res) {
  const { path = "" } = req.query;

  const response = await fetch(
  `https://marvel-server-zeta.vercel.app/${path}`
  );

  const data = await response.json();

  res.status(200).json(data);
}
