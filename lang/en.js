
export default {
  welcome: 'HI',
  link: '/en/',
  actions: {
    actions: 'Actions',
    add: 'Add',
    edit: 'Edit',
    deleteConfimrMessage: 'Are you sure you wanna delete',
    delete: 'Delete',
    confirm: 'Confirm',
    cancle: 'Cancle'
  },
  forms: {
    valid: 'Good to go.',
    required: 'Required.',
    name: {
      title: 'Name:',
      holder: 'Enter your name',
      desc: 'The name is how it appears on your site.'
    },
    parent: {
      title: 'Parent:',
      desc: 'Assign a parent term to create a hierachy. The term Jazz, for example, would be the parent of Bebop and Big Band.'
    },
    decription: {
      title: 'Description',
      holder: 'Enter Your Description',
      desc: 'The description isn\'t prominent by default; howerver, some themes may show it.'
    }
  },
  tables: {
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    sort: {
      by: 'Sorting By:',
      direction: 'Sort Direction:',
      descending: 'Descending',
      ascending: 'Ascending'
    },
    pagenation: {
      perPage: 'Per page:'
    }
  },
  chooseParent: 'Choose parent..',
  region: {
    title: 'Rigions:',
    editModal: {
      title: 'Edit Region:'
    },
    deleteModal: {
      title: 'Delete Region:'
    },
    addBtn: 'Add region',
    toast: {
      add: 'Region added successfully',
      edit: 'Region Edited successfully',
      delete: 'Region deleted successfully',
      justDeleted: 'You just deleted',
      justEdited: 'You just edited',
      justAdded: 'You just added',
      error: 'There is something wrong'
    }
  },
  tag: {
    title: 'Tags:',
    editModal: {
      title: 'Edit Tag:'
    },
    deleteModal: {
      title: 'Delete Tag:'
    },
    addBtn: 'Add tag',
    toast: {
      add: 'Tag added successfully',
      edit: 'Tag Edited successfully',
      delete: 'Tag deleted successfully',
      justDeleted: 'You just deleted',
      justEdited: 'You just edited',
      justAdded: 'You just added',
      error: 'There is something wrong'
    }
  },
  category: {
    title: 'Category:',
    editModal: {
      title: 'Edit Tag:'
    },
    deleteModal: {
      title: 'Delete Tag:'
    },
    addBtn: 'Add category',
    toast: {
      add: 'Category added successfully',
      edit: 'Category Edited successfully',
      delete: 'Category deleted successfully',
      justDeleted: 'You just deleted',
      justEdited: 'You just edited',
      justAdded: 'You just added',
      error: 'There is something wrong'
    }
  },
  allListing: {
    deleteModal: {
      title: 'Delete Listing'
    },
    table: {
      header: {
        title: 'Title',
        expiry: 'Expiry',
        cover: 'Cover',
        stad: 'City',
        actions: 'Actions'
      }
    },
    toast: {
      add: 'Listing added successfully',
      edit: 'Listing Edited successfully',
      delete: 'Listing deleted successfully',
      justDeleted: 'You just deleted',
      justEdited: 'You just edited',
      justAdded: 'You just added',
      error: 'There is something wrong'
    }
  },
  addListing: {
    title: 'Add Listing:',
    inputs: {
      maxFileSize: 'Max filstorlek: 64 MB',
      selectOne: 'Please select one',
      choosed: 'You choose',
      yes: 'yes',
      no: 'No',
      title: {
        label: 'Title:',
        holder: 'Listing Title'
      },
      beskrivning: 'Description:',
      Bilgalleri: 'Gallery:',
      Cover: 'Cover image:',
      price: {
        dag: 'Price per day:',
        priority: 'Set as priority price',
        helg: 'Price per weekend:',
        långhelg: 'Price per long weekend:',
        vecka: 'Price per week:',
        manad: 'Price per month:'
      },
      egenskaper: 'Characteristics:',
      yta: {
        label: 'Surface:',
        holder: 'ex: 190'
      },
      placering: {
        label: 'Flat / location:',
        holder: 'ground'
      },
      stad: 'City:',
      plats: 'Loacation:',
      kategori: 'Category:',
      planritning: 'Ichnography:',
      minsta: {
        label: 'Minimum rental period:',
        holder: 'The minimum rental period for the premises'
      },
      langsta: {
        label: 'Longest rental period:',
        holder: 'The longest rental period for the premises'
      },
      fasta: 'Fixed opening hours:',
      butik: 'Boxen store:',
      mat: 'Food & Drink "Boxes":',
      event: 'Boxing Event:',
      season: 'Boxing season:',
      seasonOts: [
        'Solar',
        'Deckchair',
        'Christmas tree',
        'Snowflake',
        'Pumpkin',
        'Leaf',
        'flowers',
        'Bike',
        'Painting',
        'cLOTHING',
        'All year round (nothing)'
      ],
      hemsida: 'Center website:',
      textarea: 'Text Center:',
      optidder: 'Hours:',
      optidderOpts: {
        hours: 'Enter hours',
        allDayOpen: 'Open all day',
        allDayClose: 'Close all day',
        appointment: 'By appointment only'
      },
      vag: 'Route guidance:',
      centerGallery: 'Center Gallery:',
      fran: 'Recorded from:',
      till: 'Busy until:',
      Lokalens: 'Room contact person:',
      expiry: 'Listing Expiry Date:'
    },
    errors: {
      title: 'You should add title',
      stad: 'You should choose stad',
      location: 'You should add location',
      category: 'You should choose kategory',
      lokalens: 'You should choose lokalens',
      propteradpris: 'You should choose prioteradpris'
    },
    btns: {
      add: 'Add Listing',
      edit: 'Edit Listing'
    }
  }

}
