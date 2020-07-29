
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
    cancle: 'Avbryt'
  },
  forms: {
    valid: 'Bra att gå.',
    required: 'Obligatoriskt.',
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
      perPage: 'Per page:'
    }
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
      title: 'Du bör lägga till titel',
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
  }
}
