export const SERVICES = [
  {
    id: 'dry-cleaning',
    name: 'Dry Cleaning',
    tagline: 'Gentle solvent cleaning for delicate fabrics & couture',
    category: 'Delicates',
    pricePerKg: 12.0,
    priceUnit: 'kg',
    unitLabel: 'Kg',
    defaultQty: 2,
    turnaround: '24-48 Hours',
    popular: true,
    rating: 4.9,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=800&auto=format&fit=crop',
    description: 'Specialized chemical solvent cleaning without water to protect fibers from shrinkage, fiber distortion, and color bleeding. Ideal for wool suits, silk dresses, cashmere, and designer garments.',
    features: [
      'Eco-friendly hydrocarbon solvent',
      'Hand-finished collar and sleeve pressing',
      'Complimentary stain pretreatment',
      'Breathable garment cover included'
    ],
    recommendedFor: ['Suits & Blazers', 'Silk & Satin Gowns', 'Cashmere Sweaters', 'Wool Coats']
  },
  {
    id: 'steam-ironing',
    name: 'Steam Ironing & Pressing',
    tagline: 'Crisp, wrinkle-free finishing with high-temp micro-steam',
    category: 'Everyday',
    pricePerKg: 5.0,
    priceUnit: 'piece',
    unitLabel: 'Pieces',
    defaultQty: 5,
    turnaround: 'Same Day / 12 Hours',
    popular: false,
    rating: 4.8,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?q=80&w=800&auto=format&fit=crop',
    description: 'High-temperature industrial steam press removes every crease while sanitizing fabric fibers. Delivers a boardroom-sharp finish with customized crease lines according to your preference.',
    features: [
      'Precision temperature control',
      'Disinfecting deep-steam penetration',
      'Sturdy wooden hanger return',
      'Zero scorch guarantee'
    ],
    recommendedFor: ['Dress Shirts', 'Trousers', 'Linen Outfits', 'Pleated Skirts']
  },
  {
    id: 'wash-fold',
    name: 'Wash & Fold Laundry',
    tagline: 'Everyday laundry sorted, sanitized, folded and closet-ready',
    category: 'Everyday',
    pricePerKg: 4.5,
    priceUnit: 'kg',
    unitLabel: 'Kg',
    defaultQty: 6,
    turnaround: '24 Hours',
    popular: true,
    rating: 5.0,
    reviewsCount: 540,
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=800&auto=format&fit=crop',
    description: 'Complete everyday washing with hypoallergenic botanical detergents, separate color temperature cycles, gentle tumble dry, and crisp Marie-Kondo style folding.',
    features: [
      'Separate dark/light washing cycles',
      'Hypoallergenic fragrance-free option',
      'Soft fabric conditioners applied',
      'Vacuum-sealed or stack-folded bags'
    ],
    recommendedFor: ['T-shirts & Polos', 'Casual Shorts & Jeans', 'Undergarments & Socks', 'Activewear']
  },
  {
    id: 'curtain-cleaning',
    name: 'Curtain & Drapery Cleaning',
    tagline: 'Deep dust and allergen extraction without fiber shrinkage',
    category: 'Home Care',
    pricePerKg: 15.0,
    priceUnit: 'kg',
    unitLabel: 'Kg',
    defaultQty: 3,
    turnaround: '48-72 Hours',
    popular: false,
    rating: 4.7,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    description: 'Heavy drapes, blackout curtains, and sheer linens are meticulously tested for fabric shrinkage before undergoing low-moisture vacuum extraction and thermal deodorization.',
    features: [
      'Pleat preservation treatment',
      'Dust mite & allergen eradication',
      'UV fade resistant gentle care',
      'Optional hanging & re-installation support'
    ],
    recommendedFor: ['Blackout Drapes', 'Velvet Hangings', 'Linen Sheers', 'Roman Shades']
  },
  {
    id: 'blanket-cleaning',
    name: 'Blanket & Comforter Care',
    tagline: 'Fluffy, sanitized, fresh and hygienically allergen-free',
    category: 'Home Care',
    pricePerKg: 14.0,
    priceUnit: 'piece',
    unitLabel: 'Pieces',
    defaultQty: 2,
    turnaround: '48 Hours',
    popular: true,
    rating: 4.9,
    reviewsCount: 289,
    image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=800&auto=format&fit=crop',
    description: 'Oversized commercial drum washers and low-heat humidity-controlled dryers restore maximum loft and softness to down, synthetic, and wool duvet inserts and heavy quilts.',
    features: [
      'Feather & down rejuvenation',
      'Anti-bacterial ozone rinse',
      'Zero residue rinse cycle',
      'Airtight seasonal storage bag'
    ],
    recommendedFor: ['Goose Down Duvets', 'Heavy Winter Quilts', 'Fleece Blankets', 'Mattress Toppers']
  },
  {
    id: 'shoe-cleaning',
    name: 'Sneaker & Shoe Restoration',
    tagline: 'Hand-detailed scrubbing restoring sole color, texture & shine',
    category: 'Footwear',
    pricePerKg: 18.0,
    priceUnit: 'pair',
    unitLabel: 'Pairs',
    defaultQty: 1,
    turnaround: '48-72 Hours',
    popular: false,
    rating: 4.9,
    reviewsCount: 195,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
    description: 'Precision artisan cleaning covering suede, premium leather, canvas, and mesh. Includes midsole unyellowing, lace deep-cleansing, internal deodorization, and water-repellent sealing.',
    features: [
      'Multi-brush hand detail cleaning',
      'Midsole whitening & unyellowing',
      'Antibacterial interior UV sanitization',
      'Hydrophobic nano-coating shield'
    ],
    recommendedFor: ['Designer Sneakers', 'Leather Loafers & Boots', 'Suede Dress Shoes', 'Running Footwear']
  }
];

export const HERO_SLIDES = [
  {
    id: 1,
    tag: 'Artisanal Fabric Care',
    title: 'Your Wardrobe, Treated with Haute Couture Precision',
    description: 'Discover LuxeFabric’s sustainable, fiber-first laundry and dry-cleaning services. Free doorstep pickup & prompt return.',
    ctaText: 'Book a Pickup Now',
    ctaLink: '/book',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1400&auto=format&fit=crop',
    stat: '99.4%',
    statLabel: 'Stain Removal Rate'
  },
  {
    id: 2,
    tag: 'Fast & Reliable Express Turnaround',
    title: 'Wrinkle-Free Steam Pressing for Busy Professionals',
    description: 'Boardroom-sharp shirts, crisp suits, and evening gowns ready in as fast as 12 hours. Never worry about garment prep again.',
    ctaText: 'Explore Ironing Care',
    ctaLink: '/services',
    image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?q=80&w=1400&auto=format&fit=crop',
    stat: 'Same Day',
    statLabel: 'Express Delivery Available'
  },
  {
    id: 3,
    tag: 'Bedding & Home Textile Sanitization',
    title: 'Rejuvenate Heavy Quilts, Comforters & Luxury Linens',
    description: 'Deep ozone sanitization that lifts microscopic dust and revives down feathers to cloud-like fullness.',
    ctaText: 'Schedule Home Linen Care',
    ctaLink: '/book',
    image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=1400&auto=format&fit=crop',
    stat: '100% Eco',
    statLabel: 'Non-Toxic Botanicals'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Eleanor Vance',
    role: 'Fashion Stylist & Curator',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    comment: 'LuxeFabric handled my vintage silk dresses and cashmere coats with unmatched delicacy. The pickup was right on time and packaging felt like high-end retail.',
    rating: 5,
    location: 'Manhattan, NY'
  },
  {
    id: 2,
    name: 'David Sterling',
    role: 'Corporate Managing Director',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    comment: 'The weekly Wash & Fold subscription has saved me hours every week. My shirts come crisp, cleanly folded, and smelling fresh with zero chemical odor.',
    rating: 5,
    location: 'Downtown Financial Dist.'
  },
  {
    id: 3,
    name: 'Sophia Chen',
    role: 'Interior Architect',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    comment: 'Our 14-foot custom linen curtains had absorbed dust during renovation. LuxeFabric picked them up, cleaned them flawlessly without any shrinkage. Exceptional!',
    rating: 5,
    location: 'Brooklyn Heights'
  }
];

export const FAQS = [
  {
    q: 'How does pickup and delivery scheduling work?',
    a: 'Simply choose your preferred pickup date, time window, and address through our booking form. Our concierge driver arrives with reusable eco-hampers, verifies your count, and tags each garment safely.'
  },
  {
    q: 'What solvents and detergents do you use?',
    a: 'We strictly use 100% biodegradable, hypoallergenic liquid detergents and gentle hydrocarbon dry cleaning methods. Safe for sensitive baby skin, delicate woolens, and our planet.'
  },
  {
    q: 'How do you calculate the final pricing?',
    a: 'Our app gives you an instant estimated price based on service type and weight/quantity. When garments arrive at our cleaning hub, items are weighed on certified optical scales, and your confirmation receipt reflects exact weights.'
  },
  {
    q: 'Can I track the progress of my laundry in real-time?',
    a: 'Yes! Every booking receives a unique tracking number (e.g. LUX-8924). You can track each milestone: Scheduled, In Wash, Steam Finishing, and Out for Delivery from the "Track Order" or "My Bookings" page.'
  }
];
