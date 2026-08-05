// One-time / re-runnable script to populate sample products and page content
// so the website has real database-backed data to render. Safe to re-run —
// products upsert on slug, pages upsert on page_key.
//
// Usage: node src/scripts/seedSampleData.js

require('dotenv').config();
const pool = require('../config/db');

const PRODUCTS = [
  {
    name: 'Round Areca Leaf Plate',
    slug: 'round-areca-leaf-plate',
    category: 'Plates',
    description:
      'A sturdy, fully biodegradable round plate pressed from naturally fallen areca palm leaves.',
    material_specs: '100% natural areca palm leaf, no chemicals or bleaching agents',
    hsn_code: '46021990',
    moq_notes: '5000 pcs per SKU',
    variants: [
      { size: '10 inch', shape: 'Round' },
      { size: '7 inch', shape: 'Round' },
    ],
    images: [{ image_path: '/images/plate-round.jpg' }],
  },
  {
    name: 'Square Areca Leaf Plate',
    slug: 'square-areca-leaf-plate',
    category: 'Plates',
    description: 'Elegant square plate, ideal for formal catering and events.',
    hsn_code: '46021990',
    moq_notes: '5000 pcs per SKU',
    variants: [{ size: '9 inch', shape: 'Square' }],
    images: [{ image_path: '/images/plate-square.jpg' }],
  },
  {
    name: 'Areca Leaf Bowl',
    slug: 'areca-leaf-bowl',
    category: 'Cutlery',
    description: 'Deep bowl suitable for curries and wet food items.',
    hsn_code: '46021990',
    moq_notes: '5000 pcs per SKU',
    variants: [{ size: '12 oz', shape: 'Round' }],
    images: [{ image_path: '/images/plate-square.jpg' }],
  },
  {
    name: 'Compostable Paper Cup',
    slug: 'compostable-paper-cup',
    category: 'Cups',
    description: 'PLA-lined paper cup for cold and hot beverages, fully compostable.',
    material_specs: 'Food-grade paper board with a PLA biodegradable lining',
    hsn_code: '48236900',
    moq_notes: '10000 pcs per SKU',
    variants: [
      { size: '150ml', shape: null },
      { size: '250ml', shape: null },
    ],
    images: [{ image_path: '/images/cup.png' }],
  },
  {
    name: 'Wooden Disposable Fork',
    slug: 'wooden-disposable-fork',
    category: 'Cutlery',
    description: 'Smooth-finish birchwood fork, splinter-free and compostable.',
    material_specs: 'Birchwood',
    hsn_code: '44190090',
    moq_notes: '20000 pcs per SKU',
    variants: [{ size: '160mm', shape: null }],
    images: [{ image_path: '/images/cutlery.jpg' }],
  },
  {
    name: 'Biodegradable Paper Straws',
    slug: 'biodegradable-paper-straws',
    category: 'Cutlery',
    description: 'Sturdy paper straws that hold up in cold and hot beverages alike, fully compostable.',
    material_specs: 'FSC-sourced paper, food-safe non-toxic inks',
    hsn_code: '48239019',
    moq_notes: '50000 pcs per SKU',
    variants: [
      { size: '6mm x 200mm', shape: 'Regular' },
      { size: '8mm x 200mm', shape: 'Jumbo' },
    ],
    images: [{ image_path: '/images/straws.jpg' }],
  },
  {
    name: 'Wooden Coffee Stirrers',
    slug: 'wooden-coffee-stirrers',
    category: 'Cutlery',
    description: 'Splinter-free birchwood stirrers for hot and cold beverages, compostable after use.',
    material_specs: 'Birchwood',
    hsn_code: '44190090',
    moq_notes: '50000 pcs per SKU',
    variants: [{ size: '140mm', shape: null }],
    images: [{ image_path: '/images/stirrer.jpg' }],
  },
];

const PAGES = {
  home: {
    hero: {
      headline: 'Eco-Friendly Disposable Tableware, Made in India, Exported Worldwide',
      subtext:
        'Areca leaf plates and expanding eco-friendly tableware — naturally fallen leaves, no trees cut, fully biodegradable. Trusted by B2B buyers and importers at home and abroad.',
      primaryCtaLabel: 'View Products',
      primaryCtaHref: '/products',
      secondaryCtaLabel: 'Request a Quote',
      secondaryCtaHref: '/contact',
    },
    stats: {
      items: [
        { value: '5+', label: 'Years in Business' },
        { value: '10+', label: 'Countries Served' },
        { value: '3+', label: 'Product Categories' },
      ],
      note: 'Figures shown are placeholders pending confirmed company data.',
    },
    story: {
      eyebrow: 'Our Process',
      heading: 'Handcrafted From Naturally Fallen Leaves',
      body:
        'Areca leaves are collected after they fall from the palm on their own — no tree is ever cut. Each leaf is cleaned, heat-pressed into shape, and quality-checked by hand before packing, giving you tableware that is sturdy, food-safe, and fully biodegradable from source to shipment.',
      ctaLabel: 'Learn More About Us',
      ctaHref: '/about',
    },
    mission: {
      heading: 'Our Mission',
      body:
        'Every plate starts as a leaf that has already fallen from an areca palm — no tree is cut, no plastic is used. We collect, clean, press, and pack these naturally shed leaves into sturdy, fully biodegradable tableware, giving international buyers a genuine alternative to single-use plastic without compromising on strength or presentation.',
      foundingYear: 'TBD',
    },
    trustBadges: [
      { label: 'FSSAI', note: 'pending confirmation' },
      { label: 'ISO', note: 'pending confirmation' },
      { label: 'IEC / RCMC', note: 'pending confirmation' },
    ],
    whySource: [
      {
        title: 'Genuinely Sustainable',
        body: 'Areca leaf plates are made from naturally fallen leaves — no trees cut, no plastic, fully biodegradable.',
      },
      {
        title: 'Export-Ready',
        body: 'Built for international B2B buyers: HSN-coded catalog, MOQ guidance, and clear shipping terms on every product.',
      },
      {
        title: 'Direct From the Manufacturer',
        body: 'Work directly with the source — no middlemen markups, and specifications you can actually verify.',
      },
    ],
    exploreTiles: {
      heading: 'Explore Indus Impex',
      tiles: [
        {
          heading: 'Browse Our Products',
          body: 'Plates, cups, and cutlery — all HSN-coded with MOQ guidance.',
          href: '/products',
        },
        {
          heading: 'Export Info',
          body: 'FOB/CIF terms, shipping, samples, and payment — everything international buyers need.',
          href: '/export-info',
        },
        {
          heading: 'Our Sustainability Story',
          body: 'See how naturally fallen areca leaves become export-ready tableware.',
          href: '/about',
        },
        {
          heading: 'Production Gallery',
          body: 'A look at the raw material, the pressing process, and the finished product.',
          href: '/gallery',
        },
        {
          heading: 'Certifications & Trust',
          body: 'What we hold today and what is pending confirmation — no overclaiming.',
          href: '/about',
        },
        {
          heading: 'Get a Custom Quote',
          body: "Tell us your product, quantity, and destination — we'll get back with a quote.",
          href: '/contact',
        },
      ],
    },
    newsletter: {
      heading: 'Ready to Source Sustainably?',
      body:
        "Tell us what you need — product, quantity, and destination — and we'll get back to you with a quote.",
      ctaLabel: 'Request a Quote',
    },
  },
  about: {
    intro:
      'Indus Impex is an India-based manufacturer and exporter of eco-friendly disposable tableware, starting with areca leaf plates and expanding into cups, cutlery, and other biodegradable tableware. We work with both domestic and international B2B buyers and importers looking for a genuine, verifiable alternative to plastic disposables.',
    manufacturing: {
      heading: 'Manufacturing Capability',
      body:
        'Areca leaves are collected after they naturally fall from the palm, then cleaned, heat-pressed, and shaped into plates and containers — no trees are cut and no chemical bleaching is involved. Specific production capacity and facility details are being finalized and will be published here.',
    },
    certifications: [
      { label: 'FSSAI', note: 'pending confirmation' },
      { label: 'ISO', note: 'pending confirmation' },
      { label: 'IEC / RCMC (export license)', note: 'pending confirmation' },
    ],
    sustainability: {
      heading: 'Sustainability Story',
      body:
        "Every product we ship starts life as a fallen leaf, not a felled tree. Areca palm leaves are shed naturally as part of the plant's growth cycle; we simply collect what would otherwise be discarded and turn it into durable, compostable tableware. It's a sourcing model that's sustainable by design, not by marketing.",
    },
  },
  'export-info': {
    intro:
      'What international buyers typically need to know before placing an order — shipping terms, ports, samples, lead times, and payment. Figures marked TBD are placeholders pending confirmation from the business.',
    shippingTerms: [
      {
        term: 'FOB (Free On Board)',
        body:
          'We deliver the goods on board the vessel at the named port of loading. Once loaded, risk and further transport costs pass to the buyer.',
      },
      {
        term: 'CIF (Cost, Insurance & Freight)',
        body:
          "We arrange and pay for main carriage and marine insurance to the buyer's named port of destination; risk still passes once goods are loaded.",
      },
    ],
    portsShippedFrom:
      'TBD — to be confirmed by the business (commonly Nhava Sheva/JNPT, Mundra, or Chennai for Indian exporters).',
    leadTimes:
      'TBD — typical production and dispatch lead time will be published once confirmed; expect this to vary with order size.',
    samplePolicy: 'TBD — sample availability, cost, and turnaround will be confirmed here.',
    paymentTerms:
      'Standard international trade terms such as Letter of Credit (LC) and Telegraphic Transfer (TT) are typically accepted; specific terms are confirmed per order.',
  },
  gallery: {
    intro:
      'A look at the raw material, the pressing process, and the finished tableware. Real facility and packaging photos will be added as they become available.',
    items: [
      { label: 'Areca palm leaves — raw material', image: '/images/hero-leaves.jpg' },
      { label: 'Leaf plate press machine in operation', image: '/images/press.jpg' },
      { label: 'Round plates — finished product', image: '/images/plate-round.jpg' },
      { label: 'Square plates & bowls', image: '/images/plate-square.jpg' },
      { label: 'Wooden cutlery set', image: '/images/cutlery.jpg' },
      { label: 'Compostable paper cups', image: '/images/cup.png' },
      { label: 'Packaging & export cartons', image: '/images/boxes.jpg' },
    ],
  },
};

async function seedProducts(conn) {
  for (const product of PRODUCTS) {
    const [result] = await conn.query(
      `INSERT INTO products (name, slug, category, description, material_specs, hsn_code, moq_notes, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, TRUE)
       ON DUPLICATE KEY UPDATE
         name = VALUES(name), category = VALUES(category), description = VALUES(description),
         material_specs = VALUES(material_specs), hsn_code = VALUES(hsn_code), moq_notes = VALUES(moq_notes)`,
      [
        product.name,
        product.slug,
        product.category,
        product.description || null,
        product.material_specs || null,
        product.hsn_code || null,
        product.moq_notes || null,
      ]
    );

    const productId = result.insertId || (await getProductId(conn, product.slug));

    await conn.query('DELETE FROM product_variants WHERE product_id = ?', [productId]);
    if (product.variants && product.variants.length > 0) {
      const values = product.variants.map((v) => [productId, v.size || null, v.shape || null]);
      await conn.query('INSERT INTO product_variants (product_id, size, shape) VALUES ?', [values]);
    }

    await conn.query('DELETE FROM product_images WHERE product_id = ?', [productId]);
    if (product.images && product.images.length > 0) {
      const values = product.images.map((img, i) => [productId, img.image_path, i]);
      await conn.query('INSERT INTO product_images (product_id, image_path, sort_order) VALUES ?', [values]);
    }

    console.log(`Product ready: ${product.name}`);
  }
}

async function getProductId(conn, slug) {
  const [rows] = await conn.query('SELECT id FROM products WHERE slug = ?', [slug]);
  return rows[0].id;
}

async function seedPages(conn) {
  for (const [key, content] of Object.entries(PAGES)) {
    await conn.query(
      `INSERT INTO pages (page_key, content) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE content = VALUES(content)`,
      [key, JSON.stringify(content)]
    );
    console.log(`Page content ready: ${key}`);
  }
}

async function main() {
  const conn = await pool.getConnection();
  try {
    await seedProducts(conn);
    await seedPages(conn);
  } finally {
    conn.release();
  }
}

main()
  .catch((err) => {
    console.error('Failed to seed sample data:', err);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
