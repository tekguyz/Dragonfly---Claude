export type MenuItem = {
  id: string;
  name: string;
  nameEs?: string;
  description: string;
  descriptionEs?: string;
  category: string;
  tag?: "Signature" | "Popular" | "Chef's Pick" | "New";
  isVegetarian?: boolean;
  isSpicy?: boolean;
  imageUrl: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  emoji: string;
  items: MenuItem[];
};

export const MENU: MenuCategory[] = [
  {
    id: "sushi",
    label: "Sushi",
    emoji: "🍣",
    items: [
      {
        id: "sushi-1",
        name: "Yummy Roll",
        nameEs: "Rollo Yummy",
        description: "Crispy tempura shrimp, cream cheese, and avocado, draped in delicate slices of fresh tuna and drizzled with a sweet eel reduction.",
        descriptionEs: "Camarón tempura crujiente, queso crema y aguacate, cubierto con finas láminas de atún fresco y reducción de anguila.",
        category: "Sushi",
        tag: "Popular",
        imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80"
      },
      {
        id: "sushi-2",
        name: "JB Tempura",
        nameEs: "JB Tempura",
        description: "A decadent tempura-fried roll featuring premium salmon, rich cream cheese, and scallions, served with a bright ponzu dipping sauce.",
        descriptionEs: "Un indulgente rollo frito en tempura con salmón premium, queso crema y cebollín, servido con una vibrante salsa ponzu.",
        category: "Sushi",
        tag: "Signature",
        imageUrl: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&q=80"
      },
      {
        id: "sushi-3",
        name: "Dragonfly Signature Roll",
        nameEs: "Rollo Insignia Dragonfly",
        description: "Our namesake creation. Spicy tuna and cucumber topped with torched salmon, spicy mayo, and a sprinkle of tempura flakes.",
        descriptionEs: "Nuestra creación homónima. Atún picante y pepino coronado con salmón flambeado, mayonesa picante y hojuelas de tempura.",
        category: "Sushi",
        tag: "Chef's Pick",
        isSpicy: true,
        imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80"
      },
      {
        id: "sushi-4",
        name: "Volcano Roll",
        nameEs: "Rollo Volcán",
        description: "A dramatic presentation of baked crab and scallop salad cascading over a classic California roll, finished with spicy mayo.",
        descriptionEs: "Una presentación dramática de ensalada de cangrejo y vieiras horneadas cayendo sobre un clásico rollo California, terminado con mayonesa picante.",
        category: "Sushi",
        isSpicy: true,
        imageUrl: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=800&q=80"
      },
      {
        id: "sushi-5",
        name: "Spicy Tuna Crunch",
        nameEs: "Atún Picante Crujiente",
        description: "Hand-chopped yellowfin tuna tossed in our house-made chili oil, paired with cucumber and crispy panko.",
        descriptionEs: "Atún aleta amarilla picado a mano y mezclado con nuestro aceite de chile casero, acompañado de pepino y panko crujiente.",
        category: "Sushi",
        isSpicy: true,
        imageUrl: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800&q=80"
      }
    ]
  },
  {
    id: "starters",
    label: "Appetizers & Starters",
    emoji: "🥟",
    items: [
      {
        id: "starter-1",
        name: "Tuna Nachos",
        nameEs: "Nachos de Atún",
        description: "Sashimi-grade tuna tartare served over crispy wonton chips, garnished with fresh jalapeño, avocado mousse, and a sesame-soy glaze.",
        descriptionEs: "Tartar de atún calidad sashimi servido sobre crujientes chips de wonton, adornado con jalapeño fresco, mousse de aguacate y glaseado de sésamo y soya.",
        category: "Appetizers & Starters",
        tag: "Signature",
        imageUrl: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&q=80"
      },
      {
        id: "starter-2",
        name: "Copa Camarón",
        nameEs: "Copa Camarón",
        description: "Plump, chilled Pacific shrimp elegantly presented in a classic coupe, accompanied by a zesty, house-crafted cocktail sauce.",
        descriptionEs: "Jugosos camarones del Pacífico fríos presentados elegantemente en una copa clásica, acompañados de una vibrante salsa cóctel artesanal.",
        category: "Appetizers & Starters",
        tag: "Popular",
        imageUrl: "https://images.unsplash.com/photo-1559742811-822873691df8?w=800&q=80"
      },
      {
        id: "starter-3",
        name: "Edamame Truffle",
        nameEs: "Edamame Trufado",
        description: "Steamed young soybeans tossed in white truffle oil and coarse Himalayan pink salt.",
        descriptionEs: "Frijoles de soya tiernos al vapor mezclados con aceite de trufa blanca y sal rosada del Himalaya.",
        category: "Appetizers & Starters",
        isVegetarian: true,
        imageUrl: "https://images.unsplash.com/photo-1590759668628-05b0fc342fac?w=800&q=80"
      },
      {
        id: "starter-4",
        name: "Pork Gyoza",
        nameEs: "Gyoza de Cerdo",
        description: "Pan-seared artisanal dumplings filled with heritage pork and aromatics, served with a black vinegar and ginger dipping sauce.",
        descriptionEs: "Empanadillas artesanales selladas a la sartén, rellenas de cerdo y aromáticos, servidas con salsa de vinagre negro y jengibre.",
        category: "Appetizers & Starters",
        imageUrl: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&q=80"
      },
      {
        id: "starter-5",
        name: "Crispy Calamari",
        nameEs: "Calamares Crujientes",
        description: "Lightly dusted and flash-fried calamari rings, served with a vibrant yuzu aioli and fresh lime.",
        descriptionEs: "Anillos de calamar ligeramente empanizados y fritos rápidamente, servidos con un vibrante alioli de yuzu y lima fresca.",
        category: "Appetizers & Starters",
        imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80"
      }
    ]
  },
  {
    id: "mains",
    label: "Mains",
    emoji: "🥩",
    items: [
      {
        id: "main-1",
        name: "Tomahawk Steak",
        nameEs: "Corte Tomahawk",
        description: "A majestic, bone-in ribeye, perfectly charred and rested, served with roasted garlic butter and a trio of artisanal salts.",
        descriptionEs: "Un majestuoso ribeye con hueso, perfectamente asado y reposado, servido con mantequilla de ajo asado y un trío de sales artesanales.",
        category: "Mains",
        tag: "Signature",
        imageUrl: "https://images.unsplash.com/photo-1594046243098-0fceea9d451e?w=800&q=80"
      },
      {
        id: "main-2",
        name: "Filet Mignon",
        nameEs: "Filet Mignon",
        description: "Tender, center-cut beef tenderloin pan-seared to your exact preference, accompanied by a rich truffle demi-glace.",
        descriptionEs: "Tierno lomo de res corte centro sellado a su preferencia exacta, acompañado de un rico demi-glace de trufa.",
        category: "Mains",
        tag: "Popular",
        imageUrl: "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80"
      },
      {
        id: "main-3",
        name: "Teriyaki Glazed Salmon",
        nameEs: "Salmón Glaseado Teriyaki",
        description: "Pan-roasted Atlantic salmon brushed with our signature ginger-soy glaze, served over a bed of wok-tossed seasonal greens.",
        descriptionEs: "Salmón del Atlántico asado a la sartén y barnizado con nuestro glaseado insignia de jengibre y soya, servido sobre una cama de verduras de temporada salteadas al wok.",
        category: "Mains",
        imageUrl: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800&q=80"
      },
      {
        id: "main-4",
        name: "Wok-Fired Pad Thai",
        nameEs: "Pad Thai al Wok",
        description: "A refined take on the street food classic. Rice noodles wok-tossed with tamarind, fresh shrimp, crushed peanuts, and vibrant herbs.",
        descriptionEs: "Una versión refinada del clásico de comida callejera. Fideos de arroz salteados al wok con tamarindo, camarones frescos, maní triturado y hierbas vibrantes.",
        category: "Mains",
        tag: "Chef's Pick",
        imageUrl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80"
      }
    ]
  },
  {
    id: "pizza-burgers",
    label: "Pizza & Burgers",
    emoji: "🍕",
    items: [
      {
        id: "pb-1",
        name: "Truffle Mushroom Pizza",
        nameEs: "Pizza de Champiñones Trufada",
        description: "Artisan thin-crust pizza topped with wild mushrooms, fior di latte mozzarella, and a decadent drizzle of white truffle oil.",
        descriptionEs: "Pizza artesanal de masa fina cubierta con champiñones silvestres, mozzarella fior di latte y un indulgente toque de aceite de trufa blanca.",
        category: "Pizza & Burgers",
        isVegetarian: true,
        tag: "Popular",
        imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80"
      },
      {
        id: "pb-2",
        name: "Prosciutto & Arugula Pizza",
        nameEs: "Pizza de Prosciutto y Rúcula",
        description: "Wood-fired crust layered with San Marzano tomato sauce, fresh mozzarella, aged prosciutto di Parma, and peppery arugula.",
        descriptionEs: "Masa a la leña con salsa de tomate San Marzano, mozzarella fresca, prosciutto di Parma añejado y rúcula.",
        category: "Pizza & Burgers",
        imageUrl: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800&q=80"
      },
      {
        id: "pb-3",
        name: "The Dragonfly Wagyu Burger",
        nameEs: "Hamburguesa Wagyu Dragonfly",
        description: "A half-pound Wagyu beef patty, caramelized onions, melted gruyère, and black garlic aioli on a toasted brioche bun.",
        descriptionEs: "Media libra de carne Wagyu, cebollas caramelizadas, queso gruyère derretido y alioli de ajo negro en un pan brioche tostado.",
        category: "Pizza & Burgers",
        tag: "Signature",
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
      },
      {
        id: "pb-4",
        name: "Spicy Tuna Crispy Rice Burger",
        nameEs: "Hamburguesa de Arroz Crujiente y Atún Picante",
        description: "An innovative fusion creation featuring a spicy tuna patty, avocado, and unagi sauce sandwiched between crispy rice buns.",
        descriptionEs: "Una innovadora creación fusión que presenta una hamburguesa de atún picante, aguacate y salsa unagi entre panes de arroz crujiente.",
        category: "Pizza & Burgers",
        tag: "New",
        isSpicy: true,
        imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"
      }
    ]
  },
  {
    id: "drinks",
    label: "Drinks & Cocktails",
    emoji: "🍸",
    items: [
      {
        id: "drink-1",
        name: "Lychee Martini",
        nameEs: "Martini de Lichi",
        description: "A sophisticated blend of premium vodka, fresh lychee purée, and a hint of elderflower liqueur, served up.",
        descriptionEs: "Una sofisticada mezcla de vodka premium, puré de lichi fresco y un toque de licor de flor de saúco, servido en copa martini.",
        category: "Drinks & Cocktails",
        tag: "Popular",
        imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80"
      },
      {
        id: "drink-2",
        name: "Smoked Old Fashioned",
        nameEs: "Old Fashioned Ahumado",
        description: "A theatrical twist on the classic. Japanese whisky, Okinawa brown sugar, and aromatic bitters, smoked with cherry wood.",
        descriptionEs: "Un giro teatral al clásico. Whisky japonés, azúcar morena de Okinawa y amargos aromáticos, ahumado con madera de cerezo.",
        category: "Drinks & Cocktails",
        tag: "Signature",
        imageUrl: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=800&q=80"
      },
      {
        id: "drink-3",
        name: "Dragon Fruit Margarita",
        nameEs: "Margarita de Pitahaya",
        description: "Vibrant and refreshing. Silver tequila, fresh lime, agave, and muddled dragon fruit with a chili-salt rim.",
        descriptionEs: "Vibrante y refrescante. Tequila blanco, lima fresca, agave y pitahaya machacada con un borde de sal y chile.",
        category: "Drinks & Cocktails",
        imageUrl: "https://images.unsplash.com/photo-1587223075055-82e9a937ddff?w=800&q=80"
      },
      {
        id: "drink-4",
        name: "Matcha Highball",
        nameEs: "Highball de Matcha",
        description: "A crisp, effervescent mix of Roku gin, ceremonial grade matcha, and premium tonic water.",
        descriptionEs: "Una mezcla crujiente y efervescente de ginebra Roku, matcha de grado ceremonial y agua tónica premium.",
        category: "Drinks & Cocktails",
        tag: "New",
        imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80"
      },
      {
        id: "drink-5",
        name: "Artisan Sake Flight",
        nameEs: "Cata de Sake Artesanal",
        description: "A curated tasting of three premium Japanese sakes, ranging from crisp and dry to rich and unfiltered.",
        descriptionEs: "Una degustación curada de tres sakes japoneses premium, que van desde crujientes y secos hasta ricos y sin filtrar.",
        category: "Drinks & Cocktails",
        tag: "Chef's Pick",
        imageUrl: "https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?w=800&q=80"
      }
    ]
  }
];
