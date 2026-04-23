export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/studio/'], // Keep internal app routes private
      },
    ],
    sitemap: 'https://snapstudio.ai/sitemap.xml',
  };
}
