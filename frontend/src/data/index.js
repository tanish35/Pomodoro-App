import moment from "moment/moment";


export const cardsData = [
  {
    title: "Total Time Studied",
    // change: 24,
    amount: 100
  },
  {
    title: "Max Time Studied",
    // change: -14,
    amount: 100,
  },
  {
    title: "Streak",
    amount: 100,
  }
];

export const ordersData = [
  {
    name: "Skatebnoard",
    type: "Illustration",
    items: 58,
    change: 290,
  },
  {
    name: "Language courses",
    type: "Illustration",
    items: 12,
    change: 72
  },
  {
    name: "Office Collaboration",
    type: "Illustration",
    items: 7,
    change: 70
  },
  {
    name: "Robot",
    type: "Illustration",
    items: 21,
    change: 15
  }
]


//* get the value in group number format
export const groupNumber = (number) => {
  return parseFloat(number.toFixed(2)).toLocaleString("en", {
    useGrouping: true,
  });
};


//* calendar Events
let eventGuid = 0
let todayStr = moment().format("YYYY-MM-DD")  // YYYY-MM-DD of today
export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'Lunch Pary',
    start: todayStr + 'T09:00:00',

  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: moment(todayStr).add(1, "days").format("YYYY-MM-DD") + 'T16:00:00'
  },
  {
    id: createEventId(),
    title: "Head Meetup",
    start: moment(todayStr).add(2, "days").format("YYYY-MM-DD") + 'T20:00:00'
  },
  {
    id: createEventId(),
    title: "VC Meeting",
    start: moment(todayStr).add(3, "days").format("YYYY-MM-DD") + 'T09:00:00'
  },
  {
    id: createEventId(),
    title: "Payment Shedules",
    start: moment(todayStr).add(5, "days").format("YYYY-MM-DD") + 'T13:00:00'
  },
  {
    id: createEventId(),
    title: "VC Meeting",
    start: moment(todayStr).add(6, "days").format("YYYY-MM-DD") + 'T13:00:00'
  },
]

export function createEventId() {
  return String(eventGuid++)
}


// * tasks
export const boardData = {
  columns: [
    {
      id: 1,
      title: "Backlog",
      cards: [
        {
          id: 1,
          title: "Database Setup",
          description: "Firebase Integration"
        },
        {
          id: 2,
          title: "Data Flow",
          description: "Setup Diagram with other developers"
        },
      ]
    },
    {
      id: 2,
      title: "TODO",
      cards: [
        {
          id: 9,
          title: "Data Table Page",
          description: "Server side Pagination",
        }
      ]
    },
    {
      id: 3,
      title: "Doing",
      cards: [
        {
          id: 10,
          title: "Full Calendar Extension",
          description: "Make new events and store in global states"
        },
        {
          id: 11,
          title: "Custom Kanban Board",
          description: "Setup react-kanban dep within Dashboard as seperate page"
        }
      ]
    },
    {
      id: 4,
      title: "Completed",
      cards: [
        {
          id: 12,
          title: "Vite Server Setup",
          description: "Configure required modules and starters"
        },
        {
          id: 13,
          title: "Modular structre",
          description: "Write css in form of modules to reduce the naming conflicts"
        }
      ]
    }
  ]
}


// * user table data
export const userData = [
  {
    id: "ddchducudhd",
    username: "johndoe",
    stats: [
      {
        totalTimeStudied: 100,
        maxTimeStudied: 200,
        streak: 10
      }
    ]
  },
  {
    id: "a1b2c3d4e5f6",
    username: "janedoe",
    stats: [
      {
        totalTimeStudied: 150,
        maxTimeStudied: 250,
        streak: 12
      }
    ]
  },
  {
    id: "g7h8i9j0k1l2",
    username: "alicew",
    stats: [
      {
        totalTimeStudied: 90,
        maxTimeStudied: 180,
        streak: 7
      }
    ]
  },
  {
    id: "m3n4o5p6q7r8",
    username: "bobm",
    stats: [
      {
        totalTimeStudied: 120,
        maxTimeStudied: 220,
        streak: 15
      }
    ]
  },
  {
    id: "s9t0u1v2w3x4",
    username: "charlieb",
    stats: [
      {
        totalTimeStudied: 130,
        maxTimeStudied: 210,
        streak: 8
      }
    ]
  },
  {
    id: "y5z6a7b8c9d0",
    username: "davidp",
    stats: [
      {
        totalTimeStudied: 110,
        maxTimeStudied: 205,
        streak: 11
      }
    ]
  },
  {
    id: "e1f2g3h4i5j6",
    username: "eveq",
    stats: [
      {
        totalTimeStudied: 140,
        maxTimeStudied: 240,
        streak: 9
      }
    ]
  },
  {
    id: "k7l8m9n0o1p2",
    username: "frankr",
    stats: [
      {
        totalTimeStudied: 160,
        maxTimeStudied: 260,
        streak: 13
      }
    ]
  },
  {
    id: "q3r4s5t6u7v8",
    username: "graces",
    stats: [
      {
        totalTimeStudied: 170,
        maxTimeStudied: 270,
        streak: 14
      }
    ]
  },
  {
    id: "w9x0y1z2a3b4",
    username: "henrym",
    stats: [
      {
        totalTimeStudied: 180,
        maxTimeStudied: 280,
        streak: 16
      }
    ]
  }
];