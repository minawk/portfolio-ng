const FILE_NAME = 'benjamina-randrianasolo-cv.pdf';

interface GeoContext {
  geo?: { country?: { code?: string } };
}

/**
 * Serves the CV under a single public file name.
 * Language comes from the URL (`/en/...` = English), format from the visitor's
 * country (Canada gets the Canadian CV, everyone else the European one).
 * `?download` forces a download; otherwise the PDF opens in the browser viewer.
 */
export default async function handler(request: Request, context: GeoContext): Promise<Response> {
  const url = new URL(request.url);
  const lang = url.pathname.startsWith('/en/') ? 'en' : 'fr';
  const format = context.geo?.country?.code === 'CA' ? 'canada' : 'europe';

  const file = await fetch(new URL(`/cv/${format}-${lang}.pdf`, url.origin));
  if (!file.ok || !file.body) {
    return new Response('Not found', { status: 404 });
  }

  const disposition = url.searchParams.has('download') ? 'attachment' : 'inline';
  return new Response(file.body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `${disposition}; filename="${FILE_NAME}"`,
      'Cache-Control': 'private, no-store',
    },
  });
}

// Netlify reads this statically at build time: plain string literals only.
export const config = {
  path: ['/benjamina-randrianasolo-cv.pdf', '/en/benjamina-randrianasolo-cv.pdf'],
};
