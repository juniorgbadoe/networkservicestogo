export function createSlug(text) {
  if (!text) return '';

  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 200);
}

export async function generateUniqueSlug(table, baseSlug, excludeId = null) {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const exists = await checkSlugExists(table, slug, excludeId);
    if (!exists) break;

    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

async function checkSlugExists(table, slug, excludeId) {
  const { query } = await import('../config/db.js');
  const result = await query(
    `SELECT id FROM ${table} WHERE slug = $1 AND id != $2 LIMIT 1`,
    [slug, excludeId || 0]
  );
  return result.rows.length > 0;
}