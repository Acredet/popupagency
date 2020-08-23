
export default {
  welcome: 'HEllo',
  link: '/',
  actions: {
    actions: 'Åtgärder',
    edit: 'Redigera',
    add: 'Lägg till',
    deleteConfimrMessage: 'Är du säker på att du vill ta bort',
    delete: 'Radera',
    confirm: 'Bekräfta',
    cancle: 'Avbryt',
    submit: 'Skicka in'
  },
  forms: {
    valid: 'Bra att gå.',
    required: 'Obligatoriskt.',
    atLeast8: 'At Minst 8 charchters.',
    notMatch: 'Detta ska matcha med lösenordet',
    somethingWrong: 'Det är något fel',
    forgotPassword: 'Har du glömt ditt lösenord?',
    email: {
      title: 'E-post:',
      holder: 'Ange din e-post'
    },
    password: {
      title: 'Passwrod:',
      holder: 'Ange ditt lösenord'
    },
    match: 'matchade',
    name: {
      title: 'namn',
      holder: 'Ange ditt namn',
      desc: 'Namnet är hur det ser ut på din webbplats.'
    },
    parent: {
      title: 'Förälder:',
      desc: 'Tilldela en överordnad term för att skapa en hierachy. Termen Jazz, till exempel, skulle vara föräldrar till Bebop och Big Band. '
    },
    decription: {
      title: 'Beskrivning',
      holder: 'Ange din beskrivning',
      desc: 'Beskrivningen är inte framträdande som standard; howerver, vissa teman kan visa det. '
    }
  },
  tables: {
    actions: 'Åtgärder',
    edit: 'Redigera',
    delete: 'Radera',
    sort: {
      by: 'Sortera efter:',
      direction: 'Sortera riktning:',
      descending: 'Fallande',
      ascending: 'Stigande'
    },
    pagenation: {
      perPage: 'Per sida:'
    },
    name: 'namn',
    description: 'Beskrivning',
    parent: 'Förälder'
  },
  login: {
    welcome: 'Välkommen tillbaka!',
    signIn: 'Logga in för att fortsätta till adminpanelen.'
  },
  adminHeader: {
    login: 'Logga in',
    profile: 'Profil',
    logout: 'Logga ut',
    languages: 'språk'
  },
  adminSidebar: {
    main: 'Main',
    listing: {
      text: 'Listning',
      addNewListing: 'Lägg till ny lista',
      allListings: 'Alla listor',
      region: 'Region',
      tags: 'Taggar',
      categories: 'Kategorier'
    },
    users: {
      text: 'Användare',
      allUsers: 'Alla användare',
      addUser: 'Lägg till användare'
    },
    siteSettings: {
      text: 'webbplatsinställningar'
    }
  },
  mainFooter: {
    aboutUS: {
      label: 'Om oss',
      text: 'Popup Agency är en nytänkande uthyrningskonsult som på ett roligt och otraditionellt arbetssätt möter framtidens krav inom handeln med korttidsavtal och popup butiker.',
      boldText: 'Vi är matchmakern som hjälper dig från idé till popup.'
    },
    links: {
      text: 'Quick links',
      home: 'Hem',
      coworker: 'Medarbetare',
      aboutUs: 'Om oss',
      freeJobs: 'Lediga jobb',
      rentAPopup: 'Hyr en popup',
      popupNews: 'Popup News',
      rentOutYourPremises: 'Hyr ut din lokal',
      handlingOfPersonalData: 'Hantering av personuppgifter',
      availableFacilities: 'Lediga lokaler'
    },
    contactInfo: 'Kontaktinfo'
  },
  mainNavbar: {
    contactUs: 'Kontakta oss',
    services: 'Tjänster',
    allServices: 'Alla tjänster',
    rentAPopupLocally: 'Hyr en popup lokal',
    rentOutYourPremises: 'Hyr ut din lokal',
    aboutUs: 'Om oss',
    whoAreThePopupAgency: 'Vilka är Popup Agency',
    whatIsAPopup: 'Vad är en popup?',
    contact: 'Kontakt',
    blogAndPress: 'Blogg och press',
    freePopups: 'Lediga popups',
    seeAllCities: 'Se alla städer',
    howDoesPopupWork: 'Hur fungerar popup?'
  },
  chooseParent: 'Välj förälder ..',
  region: {
    title: 'Regions:',
    editModal: {
      title: 'Redigera Region:'
    },
    deleteModal: {
      title: 'Radera Region:'
    },
    addBtn: 'Lägg till Regions',
    toast: {
      add: 'Region tillagd framgångsrikt',
      edit: 'Region redigerad framgångsrikt',
      delete: 'Region har raderats',
      justDeleted: 'Du har precis raderat',
      justEdited: 'Du har just redigerat',
      justAdded: 'Du har precis lagt till',
      error: 'Någonting är fel'
    }
  },
  tag: {
    title: 'Tags:',
    editModal: {
      title: 'Redigera Tag:'
    },
    deleteModal: {
      title: 'Radera Tag:'
    },
    addBtn: 'Lägg till Tags',
    toast: {
      add: 'Tag tillagd framgångsrikt',
      edit: 'Tag redigerad framgångsrikt',
      delete: 'Tag har raderats',
      justDeleted: 'Du har precis raderat',
      justEdited: 'Du har just redigerat',
      justAdded: 'Du har precis lagt till',
      error: 'Någonting är fel'
    }
  },
  category: {
    title: 'Kategori:',
    editModal: {
      title: 'Redigera Kategori:'
    },
    deleteModal: {
      title: 'Radera Kategori:'
    },
    addBtn: 'Lägg till Kategori',
    toast: {
      add: 'Kategori tillagd framgångsrikt',
      edit: 'Kategori redigerad framgångsrikt',
      delete: 'Kategori har raderats',
      justDeleted: 'Du har precis raderat',
      justEdited: 'Du har just redigerat',
      justAdded: 'Du har precis lagt till',
      error: 'Någonting är fel'
    }
  },
  allListing: {
    deleteModal: {
      title: 'Radera listning'
    },
    table: {
      header: {
        title: 'Titel',
        expiry: 'utgång',
        cover: 'omslag',
        stad: 'stad',
        actions: 'Åtgärder'
      }
    },
    toast: {
      add: 'Listning har lagts fram',
      edit: 'Listning redigerad framgångsrik',
      delete: 'Listan har raderats framgångsrikt',
      justDeleted: 'Du har precis raderat',
      justEdited: 'Du har just redigerat',
      justAdded: 'Du har precis lagt till',
      error: 'Någonting är fel'
    }
  },
  addListing: {
    title: 'Lägg till annons:',
    inputs: {
      maxFileSize: 'Max filstorlek: 64 MB',
      selectOne: 'Vänligen välj en',
      choosed: 'Du väljer',
      yes: 'Ja',
      no: 'nej',
      title: {
        label: 'Titel:',
        holder: 'Listing title'
      },
      beskrivning: 'Beskrivning:',
      Bilgalleri: 'Galleri:',
      Cover: 'Omslagsbild:',
      price: {
        dag: 'Pris per dag:',
        priority: 'Ställ in som prioriterat pris',
        helg: 'Pris per helg:',
        långhelg: 'Pris per lång helg:',
        vecka: 'Pris per vecka:',
        manad: 'Pris per månad:'
      },
      egenskaper: 'Egenskaper:',
      yta: {
        label: 'Yta:',
        holder: 'ex: 190'
      },
      placering: {
        label: 'Flat / location:',
        holder: 'mark'
      },
      stad: 'Stad:',
      plats: 'Loacation:',
      kategori: 'Kategori:',
      planritning: 'Ichnography:',
      minsta: {
        label: 'Minsta hyresperiod:',
        holder: 'Den minsta hyresperiod för lokalen'
      },
      langsta: {
        label: 'Längsta hyresperiod:',
        holder: 'Den längsta hyresperiod för lokalen'
      },
      fasta: 'Fasta öppettider:',
      butik: 'Boxen store:',
      mat: 'Mat och dryck "lådor":',
      event: 'Boxing Event:',
      season: 'Boxsäsong:',
      seasonOts: [
        'Sol',
        'Däckstol',
        'Julgran',
        'Snöflinga',
        'Pumpa',
        'Blad',
        'blommor',
        'Cykel',
        'Målning',
        'Kläder',
        'Hela året (ingenting)'
      ],
      hemsida: 'Centerwebbplats:',
      textarea: 'Textcenter:',
      optidder: 'Öppettider:',
      optidderOpts: {
        hours: 'Ange timmar',
        allDayOpen: 'Öppet hela dagen',
        allDayClose: 'Stäng hela dagen',
        appointment: 'Endast efter överenskommelse'
      },
      vag: 'Vägledning:',
      centerGallery: 'Center Gallery:',
      fran: 'Inspelad från:',
      till: 'Upptagen tills:',
      Lokalens: 'Rums kontaktperson:',
      expiry: 'Lista utgångsdatum:'
    },
    errors: {
      title: {
        en: 'Du bör lägga till titel på engelska',
        sv: 'Du bör lägga till titel på svenska'
      },
      stad: 'Du bör välja stad',
      location: 'Du bör lägga till plats',
      category: 'Du bör välja kategori',
      lokalens: 'Du bör välja lokalens',
      propteradpris: 'Du bör välja prioteradpris'
    },
    btns: {
      add: 'Lägg till lista',
      edit: 'Redigera lista'
    }
  },
  allUsers: {
    title: 'Alla användare:',
    deleteModal: {
      title: 'Radera användare:'
    },
    editModal: {
      title: 'Redigera användare:',
      name: {
        label: 'Namn:',
        holder: 'Ange namn'
      },
      email: {
        label: 'E-post:',
        holder: 'Ange e-post',
        desc: 'Vi respekterar din inkorg.'
      }
    },
    table: {
      header: {
        name: 'Namn',
        email: 'E-post'
      }
    },
    toast: {
      edit: 'Användaren redigeras framgångsrikt',
      delete: 'Användaren har raderats med framgång',
      justDeleted: 'Du har precis raderat',
      justEdited: 'Du har just redigerat',
      error: 'Det är något fel'
    }
  },
  addUser: {
    title: 'Alla användare',
    inputs: {
      name: {
        label: 'Namn:',
        holder: 'Ange namn'
      },
      email: {
        label: 'E-post:',
        holder: 'Ange e-post',
        desc: 'Vi respekterar din inkorg.'
      },
      password: {
        label: 'Lösenord:',
        holder: 'Ange lösenord'
      },
      confirmPass: {
        label: 'Bekräfta lösenord:',
        holder: 'Ange lösenord igen'
      }
    },
    toast: {
      add: 'Användaren har lagts fram',
      justAdded: 'Du har precis lagt till'
    }
  }
}
