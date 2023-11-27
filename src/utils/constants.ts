export const ONE_DAY = 24 * 60 * 60 * 1000;

export const WEEKDAY_LABEL: Record<number, string> = {
  0: "Mon",
  1: "Tue",
  2: "Wed",
  3: "Thu",
  4: "Fri",
  5: "Sat",
  6: "Sun"
};

export const PRESET_CATEGORIES = [
  {
    name: "Food & drinks",
    icon: "mdi-food-fork-drink",
    color: "#f90000",
    children: [
      {
        name: "Restaurant, fast-food",
        icon: "mdi-food-fork-drink",
        color: "#f90000"
      },
      {
        name: "Bar, cafe",
        icon: "mdi-glass-cocktail",
        color: "#f90000"
      },
      {
        name: "Groceries",
        icon: "mdi-cart",
        color: "#f90000"
      }
    ]
  },
  {
    name: "Shopping",
    icon: "mdi-basket",
    color: "#1188ff",
    children: [
      {
        name: "Clothes and shoes",
        icon: "mdi-tshirt-crew",
        color: "#1188ff"
      },
      {
        name: "Drug-store, chemist",
        icon: "mdi-pill",
        color: "#1188ff"
      },
      {
        name: "Electronics, accessories",
        icon: "mdi-laptop",
        color: "#1188ff"
      },
      {
        name: "Free time",
        icon: "mdi-emoticon",
        color: "#1188ff"
      },
      {
        name: "Gifts, joy",
        icon: "mdi-gift",
        color: "#1188ff"
      },
      {
        name: "Health and beauty",
        icon: "mdi-bottle-tonic-plus",
        color: "#1188ff"
      },
      {
        name: "Home, garden",
        icon: "mdi-home",
        color: "#1188ff"
      },
      {
        name: "Home, garden",
        icon: "mdi-home",
        color: "#1188ff"
      },
      {
        name: "Jewels, accessories",
        icon: "mdi-diamond-stone",
        color: "#1188ff"
      },
      {
        name: "Kids",
        icon: "mdi-baby-carriage",
        color: "#1188ff"
      },
      {
        name: "Pets, animals",
        icon: "mdi-paw",
        color: "#1188ff"
      },
      {
        name: "Stationery, tools",
        icon: "mdi-hammer-screwdriver",
        color: "#1188ff"
      }
    ]
  },
  {
    name: "Housing",
    icon: "mdi-home",
    color: "#f95500",
    children: [
      {
        name: "Energy, utilities",
        icon: "mdi-lightbulb",
        color: "#f95500"
      },
      {
        name: "Maintenance, repairs",
        icon: "mdi-hammer",
        color: "#f95500"
      },
      {
        name: "Mortgage",
        icon: "mdi-bank-plus",
        color: "#f95500"
      },
      {
        name: "Property insurance",
        icon: "mdi-shield-bonus",
        color: "#f95500"
      },
      {
        name: "Rent",
        icon: "mdi-key-variant",
        color: "#f95500"
      },
      {
        name: "Services",
        icon: "mdi-home-circle-outline",
        color: "#f95500"
      }
    ]
  },
  {
    name: "Transportation",
    icon: "mdi-bus",
    color: "#00ff22",
    children: [
      {
        name: "Business trips",
        icon: "mdi-bag-suitcase",
        color: "#00ff22"
      },
      {
        name: "Long distance",
        icon: "mdi-airplane",
        color: "#00ff22"
      },
      {
        name: "Public transport",
        icon: "mdi-tram",
        color: "#00ff22"
      },
      {
        name: "Taxi",
        icon: "mdi-taxi",
        color: "#00ff22"
      }
    ]
  },
  {
    name: "Vehicle",
    icon: "mdi-car",
    color: "#3949AB",
    children: [
      {
        name: "Fuel",
        icon: "mdi-fuel",
        color: "#3949AB"
      },
      {
        name: "Leasing",
        icon: "mdi-car",
        color: "#3949AB"
      },
      {
        name: "Parking",
        icon: "mdi-parking",
        color: "#3949AB"
      },
      {
        name: "Rentals",
        icon: "mdi-key",
        color: "#3949AB"
      },
      {
        name: "Vehicle insurance",
        icon: "mdi-shield-car",
        color: "#3949AB"
      },
      {
        name: "Vehicle maintenance",
        icon: "mdi-tools",
        color: "#3949AB"
      }
    ]
  },
  {
    name: "Life & entertainment",
    icon: "mdi-account",
    color: "#EC407A",
    children: [
      {
        name: "Active sport, fitness",
        icon: "mdi-dumbbell",
        color: "#EC407A"
      },
      {
        name: "Alcohol, tobacco",
        icon: "mdi-cup",
        color: "#EC407A"
      },
      {
        name: "Books, audio, subscription",
        icon: "mdi-book-open-variant",
        color: "#EC407A"
      },
      {
        name: "Education, development",
        icon: "mdi-school",
        color: "#EC407A"
      },
      {
        name: "Health care, doctor",
        icon: "mdi-doctor",
        color: "#EC407A"
      },
      {
        name: "Hobbies",
        icon: "mdi-heart",
        color: "#EC407A"
      },
      {
        name: "Holiday, trips, hotels",
        icon: "mdi-palm-tree",
        color: "#EC407A"
      },
      {
        name: "Life events",
        icon: "mdi-cake",
        color: "#EC407A"
      },
      {
        name: "Lottery, gambling",
        icon: "mdi-dice-5",
        color: "#EC407A"
      },
      {
        name: "TV, Streaming",
        icon: "mdi-television-classic",
        color: "#EC407A"
      },
      {
        name: "Wellness, beauty",
        icon: "mdi-flower",
        color: "#EC407A"
      },
      {
        name: "Culture, sports events",
        icon: "mdi-basketball",
        color: "#EC407A"
      }
    ]
  },
  {
    name: "Communication, PC",
    icon: "mdi-laptop",
    color: "#9575CD",
    children: [
      {
        name: "Internet",
        icon: "mdi-wifi",
        color: "#9575CD"
      },
      {
        name: "Phone, cell phone",
        icon: "mdi-phone",
        color: "#9575CD"
      },
      {
        name: "Postal services",
        icon: "mdi-email",
        color: "#9575CD"
      },
      {
        name: "Software, apps, games",
        icon: "mdi-controller-classic",
        color: "#9575CD"
      }
    ]
  },
  {
    name: "Financial expenses",
    icon: "mdi-currency-usd",
    color: "#00ACC1",
    children: [
      {
        name: "Advisory",
        icon: "mdi-account-alert",
        color: "#00ACC1"
      },
      {
        name: "Charges, fees",
        icon: "mdi-comment-remove",
        color: "#00ACC1"
      },
      {
        name: "Child support",
        icon: "mdi-account-child",
        color: "#00ACC1"
      },
      {
        name: "Fines",
        icon: "mdi-alert-circle",
        color: "#00ACC1"
      },
      {
        name: "Insurances",
        icon: "mdi-card-bulleted",
        color: "#00ACC1"
      },
      {
        name: "Loan, interests",
        icon: "mdi-cards",
        color: "#00ACC1"
      },
      {
        name: "Taxes",
        icon: "mdi-content-cut",
        color: "#00ACC1"
      }
    ]
  },
  {
    name: "Investments",
    icon: "mdi-chart-line",
    color: "#FFCA28",
    children: [
      {
        name: "Collections",
        icon: "mdi-image",
        color: "#FFCA28"
      },
      {
        name: "Financial investments",
        icon: "mdi-chart-multiple",
        color: "#FFCA28"
      },
      {
        name: "Realty",
        icon: "mdi-domain",
        color: "#FFCA28"
      },
      {
        name: "Savings",
        icon: "mdi-account-cash",
        color: "#FFCA28"
      },
      {
        name: "Vehicles, chattels",
        icon: "mdi-car",
        color: "#FFCA28"
      }
    ]
  },
  {
    name: "Income",
    icon: "mdi-currency-usd",
    color: "#FBC02D",
    children: [
      {
        name: "Checks, coupons",
        icon: "mdi-newspaper",
        color: "#FBC02D"
      },
      {
        name: "Child support",
        icon: "mdi-account-child",
        color: "#FBC02D"
      },
      {
        name: "Dues & grants",
        icon: "mdi-check-decagram",
        color: "#FBC02D"
      },
      {
        name: "Interests, dividends",
        icon: "mdi-ticket-percent",
        color: "#FBC02D"
      },
      {
        name: "Lending, renting",
        icon: "mdi-currency-usd",
        color: "#FBC02D"
      },
      {
        name: "Lottery, gambling",
        icon: "mdi-dice-5",
        color: "#FBC02D"
      },
      {
        name: "Refunds (tax, purchase)",
        icon: "mdi-undo",
        color: "#FBC02D"
      },
      {
        name: "Rental income",
        icon: "mdi-home",
        color: "#FBC02D"
      },
      {
        name: "Sale",
        icon: "mdi-sale",
        color: "#FBC02D"
      },
      {
        name: "Wage, invoices",
        icon: "mdi-currency-usd",
        color: "#FBC02D"
      }
    ]
  },
  {
    name: "Others",
    icon: "mdi-account-question",
    color: "#424242",
    children: [
      {
        name: "Missing",
        icon: "mdi-help-circle",
        color: "#424242"
      }
    ]
  }
];
