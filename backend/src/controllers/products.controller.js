const pool = require('../config/db');

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

// Validates the request body for create/update. Returns an array of error messages.
function validateProductPayload(body) {
  const errors = [];

  if (!isNonEmptyString(body.name)) {
    errors.push('name is required and must be a non-empty string');
  } else if (body.name.length > 255) {
    errors.push('name must be at most 255 characters');
  }

  if (body.slug !== undefined && body.slug !== null && body.slug !== '') {
    if (typeof body.slug !== 'string' || !SLUG_PATTERN.test(body.slug)) {
      errors.push('slug must contain only lowercase letters, numbers and hyphens');
    } else if (body.slug.length > 255) {
      errors.push('slug must be at most 255 characters');
    }
  }

  const maxLengths = { category: 100, hsn_code: 20, moq_notes: 255 };
  for (const [field, max] of Object.entries(maxLengths)) {
    const value = body[field];
    if (value !== undefined && value !== null) {
      if (typeof value !== 'string') {
        errors.push(`${field} must be a string`);
      } else if (value.length > max) {
        errors.push(`${field} must be at most ${max} characters`);
      }
    }
  }

  for (const field of ['description', 'material_specs']) {
    const value = body[field];
    if (value !== undefined && value !== null && typeof value !== 'string') {
      errors.push(`${field} must be a string`);
    }
  }

  if (body.is_active !== undefined && typeof body.is_active !== 'boolean') {
    errors.push('is_active must be a boolean');
  }

  if (body.images !== undefined) {
    if (!Array.isArray(body.images)) {
      errors.push('images must be an array');
    } else {
      body.images.forEach((image, i) => {
        if (!image || typeof image !== 'object' || !isNonEmptyString(image.image_path)) {
          errors.push(`images[${i}].image_path is required and must be a non-empty string`);
        } else if (image.image_path.length > 500) {
          errors.push(`images[${i}].image_path must be at most 500 characters`);
        }
        if (
          image &&
          image.sort_order !== undefined &&
          image.sort_order !== null &&
          !Number.isInteger(image.sort_order)
        ) {
          errors.push(`images[${i}].sort_order must be an integer`);
        }
      });
    }
  }

  if (body.variants !== undefined) {
    if (!Array.isArray(body.variants)) {
      errors.push('variants must be an array');
    } else {
      body.variants.forEach((variant, i) => {
        if (!variant || typeof variant !== 'object') {
          errors.push(`variants[${i}] must be an object`);
          return;
        }
        for (const field of ['size', 'shape']) {
          const value = variant[field];
          if (value !== undefined && value !== null) {
            if (typeof value !== 'string') {
              errors.push(`variants[${i}].${field} must be a string`);
            } else if (value.length > 100) {
              errors.push(`variants[${i}].${field} must be at most 100 characters`);
            }
          }
        }
        if (!isNonEmptyString(variant.size) && !isNonEmptyString(variant.shape)) {
          errors.push(`variants[${i}] must have at least one of size or shape`);
        }
      });
    }
  }

  return errors;
}

// Fetch images and variants for a set of product ids, grouped by product id.
async function fetchRelations(conn, productIds) {
  const images = new Map();
  const variants = new Map();
  if (productIds.length === 0) return { images, variants };

  const [imageRows] = await conn.query(
    'SELECT id, product_id, image_path, sort_order FROM product_images WHERE product_id IN (?) ORDER BY sort_order, id',
    [productIds]
  );
  for (const row of imageRows) {
    if (!images.has(row.product_id)) images.set(row.product_id, []);
    images.get(row.product_id).push(row);
  }

  const [variantRows] = await conn.query(
    'SELECT id, product_id, size, shape FROM product_variants WHERE product_id IN (?) ORDER BY id',
    [productIds]
  );
  for (const row of variantRows) {
    if (!variants.has(row.product_id)) variants.set(row.product_id, []);
    variants.get(row.product_id).push(row);
  }

  return { images, variants };
}

async function fetchProductById(conn, id) {
  const [rows] = await conn.query('SELECT * FROM products WHERE id = ?', [id]);
  if (rows.length === 0) return null;
  const product = rows[0];
  const { images, variants } = await fetchRelations(conn, [product.id]);
  product.images = images.get(product.id) || [];
  product.variants = variants.get(product.id) || [];
  return product;
}

async function insertRelations(conn, productId, images, variants) {
  if (Array.isArray(images) && images.length > 0) {
    const values = images.map((img, i) => [
      productId,
      img.image_path,
      Number.isInteger(img.sort_order) ? img.sort_order : i,
    ]);
    await conn.query(
      'INSERT INTO product_images (product_id, image_path, sort_order) VALUES ?',
      [values]
    );
  }
  if (Array.isArray(variants) && variants.length > 0) {
    const values = variants.map((v) => [productId, v.size || null, v.shape || null]);
    await conn.query('INSERT INTO product_variants (product_id, size, shape) VALUES ?', [values]);
  }
}

// GET /api/products?category=&is_active=
exports.list = async (req, res, next) => {
  try {
    const conditions = [];
    const params = [];

    if (req.query.category) {
      conditions.push('category = ?');
      params.push(req.query.category);
    }
    if (req.query.is_active !== undefined) {
      conditions.push('is_active = ?');
      params.push(req.query.is_active === 'true' || req.query.is_active === '1' ? 1 : 0);
    }

    const where = conditions.length ? ` WHERE ${conditions.join(' AND ')}` : '';
    const [products] = await pool.query(
      `SELECT * FROM products${where} ORDER BY created_at DESC, id DESC`,
      params
    );

    const { images, variants } = await fetchRelations(
      pool,
      products.map((p) => p.id)
    );
    for (const product of products) {
      product.images = images.get(product.id) || [];
      product.variants = variants.get(product.id) || [];
    }

    res.json(products);
  } catch (err) {
    next(err);
  }
};

// GET /api/products/:slug — accepts a slug or a numeric id
exports.getBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const [rows] = /^\d+$/.test(slug)
      ? await pool.query('SELECT * FROM products WHERE id = ?', [Number(slug)])
      : await pool.query('SELECT * FROM products WHERE slug = ?', [slug]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const product = rows[0];
    const { images, variants } = await fetchRelations(pool, [product.id]);
    product.images = images.get(product.id) || [];
    product.variants = variants.get(product.id) || [];

    res.json(product);
  } catch (err) {
    next(err);
  }
};

// POST /api/products
exports.create = async (req, res, next) => {
  const errors = validateProductPayload(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const slug = isNonEmptyString(req.body.slug) ? req.body.slug : slugify(req.body.name);
    const [result] = await conn.query(
      `INSERT INTO products (name, slug, category, description, material_specs, hsn_code, moq_notes, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.body.name.trim(),
        slug,
        req.body.category || null,
        req.body.description || null,
        req.body.material_specs || null,
        req.body.hsn_code || null,
        req.body.moq_notes || null,
        req.body.is_active === undefined ? true : req.body.is_active,
      ]
    );

    await insertRelations(conn, result.insertId, req.body.images, req.body.variants);
    await conn.commit();

    const product = await fetchProductById(conn, result.insertId);
    res.status(201).json(product);
  } catch (err) {
    await conn.rollback();
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'A product with this slug already exists' });
    }
    next(err);
  } finally {
    conn.release();
  }
};

// PUT /api/products/:id — replaces images/variants when the arrays are provided
exports.update = async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: 'id must be a positive integer' });
  }

  const errors = validateProductPayload(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const slug = isNonEmptyString(req.body.slug) ? req.body.slug : slugify(req.body.name);
    const [result] = await conn.query(
      `UPDATE products
       SET name = ?, slug = ?, category = ?, description = ?, material_specs = ?, hsn_code = ?, moq_notes = ?, is_active = ?
       WHERE id = ?`,
      [
        req.body.name.trim(),
        slug,
        req.body.category || null,
        req.body.description || null,
        req.body.material_specs || null,
        req.body.hsn_code || null,
        req.body.moq_notes || null,
        req.body.is_active === undefined ? true : req.body.is_active,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      await conn.rollback();
      return res.status(404).json({ message: 'Product not found' });
    }

    if (req.body.images !== undefined) {
      await conn.query('DELETE FROM product_images WHERE product_id = ?', [id]);
    }
    if (req.body.variants !== undefined) {
      await conn.query('DELETE FROM product_variants WHERE product_id = ?', [id]);
    }
    await insertRelations(conn, id, req.body.images, req.body.variants);

    await conn.commit();

    const product = await fetchProductById(conn, id);
    res.json(product);
  } catch (err) {
    await conn.rollback();
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'A product with this slug already exists' });
    }
    next(err);
  } finally {
    conn.release();
  }
};

// DELETE /api/products/:id — images/variants are removed via ON DELETE CASCADE
exports.remove = async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: 'id must be a positive integer' });
  }

  try {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
