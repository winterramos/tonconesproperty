export default async function handler(req, res) {
  try {
    const host = req.headers.host;
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const sourceUrl = `${proto}://${host}/index.html`;
    const response = await fetch(sourceUrl, {
      headers: {
        'user-agent': req.headers['user-agent'] || 'DiscoverTroncones',
        'accept': 'text/html,application/xhtml+xml'
      }
    });

    const html = await response.text();
    const enhancementTag = '<script src="/homepage-enhancements.js" defer></script>';
    const output = html.includes('</body>')
      ? html.replace('</body>', `${enhancementTag}</body>`)
      : `${html}${enhancementTag}`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=300');
    res.status(response.status).send(output);
  } catch (error) {
    console.error('Homepage enhancement proxy failed:', error);
    res.status(500).send('Unable to load homepage');
  }
}
