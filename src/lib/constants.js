// src/lib/constants.js
//
// Static reference data: FPL rules constants and the player database.
// PLAYERS is a starting dataset (300 players across all 20 Premier League
// clubs, realistic pricing/position spread) so the app is usable out of the
// box. Real player names, clubs, and prices change every transfer window --
// treat this as a seed dataset and refresh it each season via the admin
// Player Values screen or by editing this file directly.

export const SQUAD_SIZE = 15;

export const SQUAD_COMPOSITION = {
  GKP: 2,
  DEF: 5,
  MID: 5,
  FWD: 3,
};

export const BUDGET = 100.0;

export const POSITIONS = ["GKP", "DEF", "MID", "FWD"];

export const POSITION_LABELS = {
  GKP: "Goalkeeper",
  DEF: "Defender",
  MID: "Midfielder",
  FWD: "Forward",
};

export const TOTAL_GAMEWEEKS = 38;

export const CLUBS = [
  "Arsenal",
  "Aston Villa",
  "Bournemouth",
  "Brentford",
  "Brighton",
  "Burnley",
  "Chelsea",
  "Crystal Palace",
  "Everton",
  "Fulham",
  "Leeds United",
  "Liverpool",
  "Manchester City",
  "Manchester United",
  "Newcastle United",
  "Nottingham Forest",
  "Sunderland",
  "Tottenham Hotspur",
  "West Ham United",
  "Wolverhampton Wanderers"
];

export const PLAYERS = [
  {
    "id": 1,
    "name": "Quinn Robertson",
    "club": "Arsenal",
    "position": "DEF",
    "price": 7.0,
    "points": 1
  },
  {
    "id": 2,
    "name": "Bilal Kamara",
    "club": "Arsenal",
    "position": "DEF",
    "price": 6.5,
    "points": 87
  },
  {
    "id": 3,
    "name": "William Saliba",
    "club": "Arsenal",
    "position": "DEF",
    "price": 6.0,
    "points": 219
  },
  {
    "id": 4,
    "name": "Gabriel Magalhaes",
    "club": "Arsenal",
    "position": "DEF",
    "price": 6.0,
    "points": 234
  },
  {
    "id": 5,
    "name": "Xavi Jansen",
    "club": "Arsenal",
    "position": "DEF",
    "price": 5.5,
    "points": 114
  },
  {
    "id": 6,
    "name": "Kevin Johnson",
    "club": "Arsenal",
    "position": "DEF",
    "price": 5.0,
    "points": 86
  },
  {
    "id": 7,
    "name": "Tobi Kone",
    "club": "Arsenal",
    "position": "FWD",
    "price": 7.5,
    "points": 160
  },
  {
    "id": 8,
    "name": "David Raya",
    "club": "Arsenal",
    "position": "GKP",
    "price": 5.5,
    "points": 135
  },
  {
    "id": 9,
    "name": "Daniel Kone",
    "club": "Arsenal",
    "position": "GKP",
    "price": 4.5,
    "points": 166
  },
  {
    "id": 10,
    "name": "Bukayo Saka",
    "club": "Arsenal",
    "position": "MID",
    "price": 10.5,
    "points": 86
  },
  {
    "id": 11,
    "name": "Zach Ekong",
    "club": "Arsenal",
    "position": "MID",
    "price": 9.5,
    "points": 96
  },
  {
    "id": 12,
    "name": "Martin Odegaard",
    "club": "Arsenal",
    "position": "MID",
    "price": 8.5,
    "points": 88
  },
  {
    "id": 13,
    "name": "Alex Foster",
    "club": "Arsenal",
    "position": "MID",
    "price": 8.0,
    "points": 91
  },
  {
    "id": 14,
    "name": "Jarrod Ndiaye",
    "club": "Arsenal",
    "position": "MID",
    "price": 7.0,
    "points": 11
  },
  {
    "id": 15,
    "name": "Declan Rice",
    "club": "Arsenal",
    "position": "MID",
    "price": 6.5,
    "points": 188
  },
  {
    "id": 16,
    "name": "Kevin Tavares",
    "club": "Aston Villa",
    "position": "DEF",
    "price": 7.5,
    "points": 165
  },
  {
    "id": 17,
    "name": "Tobi Osei",
    "club": "Aston Villa",
    "position": "DEF",
    "price": 7.0,
    "points": 97
  },
  {
    "id": 18,
    "name": "Kevin Ekong",
    "club": "Aston Villa",
    "position": "DEF",
    "price": 6.0,
    "points": 93
  },
  {
    "id": 19,
    "name": "Samuel Ndiaye",
    "club": "Aston Villa",
    "position": "DEF",
    "price": 6.0,
    "points": 136
  },
  {
    "id": 20,
    "name": "Ethan Yates",
    "club": "Aston Villa",
    "position": "DEF",
    "price": 5.0,
    "points": 171
  },
  {
    "id": 21,
    "name": "Zach Palmer",
    "club": "Aston Villa",
    "position": "DEF",
    "price": 4.5,
    "points": 97
  },
  {
    "id": 22,
    "name": "Ollie Watkins",
    "club": "Aston Villa",
    "position": "FWD",
    "price": 9.0,
    "points": 137
  },
  {
    "id": 23,
    "name": "Solomon Yates",
    "club": "Aston Villa",
    "position": "GKP",
    "price": 5.0,
    "points": 180
  },
  {
    "id": 24,
    "name": "Samuel Carter",
    "club": "Aston Villa",
    "position": "GKP",
    "price": 5.0,
    "points": 74
  },
  {
    "id": 25,
    "name": "Wilfried Uwa",
    "club": "Aston Villa",
    "position": "MID",
    "price": 12.0,
    "points": 14
  },
  {
    "id": 26,
    "name": "Rafael Carter",
    "club": "Aston Villa",
    "position": "MID",
    "price": 11.5,
    "points": 102
  },
  {
    "id": 27,
    "name": "Kevin Petit",
    "club": "Aston Villa",
    "position": "MID",
    "price": 10.5,
    "points": 56
  },
  {
    "id": 28,
    "name": "Dwight Quaye",
    "club": "Aston Villa",
    "position": "MID",
    "price": 8.5,
    "points": 67
  },
  {
    "id": 29,
    "name": "Kevin Edwards",
    "club": "Aston Villa",
    "position": "MID",
    "price": 6.5,
    "points": 145
  },
  {
    "id": 30,
    "name": "Yannick Uwa",
    "club": "Aston Villa",
    "position": "MID",
    "price": 6.5,
    "points": 127
  },
  {
    "id": 31,
    "name": "James Sanogo",
    "club": "Bournemouth",
    "position": "DEF",
    "price": 6.5,
    "points": 174
  },
  {
    "id": 32,
    "name": "Josh Johnson",
    "club": "Bournemouth",
    "position": "DEF",
    "price": 6.0,
    "points": 174
  },
  {
    "id": 33,
    "name": "Ruben Ekong",
    "club": "Bournemouth",
    "position": "DEF",
    "price": 6.0,
    "points": 141
  },
  {
    "id": 34,
    "name": "Dwight Yates",
    "club": "Bournemouth",
    "position": "DEF",
    "price": 5.0,
    "points": 35
  },
  {
    "id": 35,
    "name": "Levi Gomes",
    "club": "Bournemouth",
    "position": "DEF",
    "price": 4.5,
    "points": 12
  },
  {
    "id": 36,
    "name": "Finlay Ndiaye",
    "club": "Bournemouth",
    "position": "DEF",
    "price": 4.0,
    "points": 97
  },
  {
    "id": 37,
    "name": "Nico Yalcin",
    "club": "Bournemouth",
    "position": "FWD",
    "price": 14.0,
    "points": 0
  },
  {
    "id": 38,
    "name": "Liam Palmer",
    "club": "Bournemouth",
    "position": "GKP",
    "price": 5.0,
    "points": 137
  },
  {
    "id": 39,
    "name": "Andre Whitmore",
    "club": "Bournemouth",
    "position": "GKP",
    "price": 5.0,
    "points": 149
  },
  {
    "id": 40,
    "name": "Isaac Anderson",
    "club": "Bournemouth",
    "position": "MID",
    "price": 13.0,
    "points": 67
  },
  {
    "id": 41,
    "name": "Theo Turner",
    "club": "Bournemouth",
    "position": "MID",
    "price": 12.0,
    "points": 129
  },
  {
    "id": 42,
    "name": "Nico Xhaka",
    "club": "Bournemouth",
    "position": "MID",
    "price": 7.0,
    "points": 164
  },
  {
    "id": 43,
    "name": "Reece Hughes",
    "club": "Bournemouth",
    "position": "MID",
    "price": 7.0,
    "points": 40
  },
  {
    "id": 44,
    "name": "Levi Xhaka",
    "club": "Bournemouth",
    "position": "MID",
    "price": 6.0,
    "points": 27
  },
  {
    "id": 45,
    "name": "Ruben Mensah",
    "club": "Bournemouth",
    "position": "MID",
    "price": 6.0,
    "points": 41
  },
  {
    "id": 46,
    "name": "Finlay Nunez",
    "club": "Brentford",
    "position": "DEF",
    "price": 7.5,
    "points": 176
  },
  {
    "id": 47,
    "name": "Samuel Xhaka",
    "club": "Brentford",
    "position": "DEF",
    "price": 6.0,
    "points": 32
  },
  {
    "id": 48,
    "name": "Ethan Quist",
    "club": "Brentford",
    "position": "DEF",
    "price": 6.0,
    "points": 155
  },
  {
    "id": 49,
    "name": "Liam Rowe",
    "club": "Brentford",
    "position": "DEF",
    "price": 5.5,
    "points": 140
  },
  {
    "id": 50,
    "name": "Diego Udoh",
    "club": "Brentford",
    "position": "DEF",
    "price": 5.0,
    "points": 171
  },
  {
    "id": 51,
    "name": "Pape Foster",
    "club": "Brentford",
    "position": "DEF",
    "price": 4.5,
    "points": 124
  },
  {
    "id": 52,
    "name": "Victor Gomes",
    "club": "Brentford",
    "position": "FWD",
    "price": 6.5,
    "points": 33
  },
  {
    "id": 53,
    "name": "Ruben Uwa",
    "club": "Brentford",
    "position": "GKP",
    "price": 4.5,
    "points": 28
  },
  {
    "id": 54,
    "name": "Ollie Turner",
    "club": "Brentford",
    "position": "GKP",
    "price": 4.5,
    "points": 61
  },
  {
    "id": 55,
    "name": "Reece Baker",
    "club": "Brentford",
    "position": "MID",
    "price": 10.0,
    "points": 58
  },
  {
    "id": 56,
    "name": "Reece Edwards",
    "club": "Brentford",
    "position": "MID",
    "price": 9.0,
    "points": 71
  },
  {
    "id": 57,
    "name": "Umar Yates",
    "club": "Brentford",
    "position": "MID",
    "price": 8.5,
    "points": 132
  },
  {
    "id": 58,
    "name": "Harvey Hughes",
    "club": "Brentford",
    "position": "MID",
    "price": 6.5,
    "points": 16
  },
  {
    "id": 59,
    "name": "Kwame Osei",
    "club": "Brentford",
    "position": "MID",
    "price": 5.0,
    "points": 8
  },
  {
    "id": 60,
    "name": "Quinn Osei",
    "club": "Brentford",
    "position": "MID",
    "price": 4.5,
    "points": 161
  },
  {
    "id": 61,
    "name": "Isaac Palmer",
    "club": "Brighton",
    "position": "DEF",
    "price": 7.0,
    "points": 19
  },
  {
    "id": 62,
    "name": "Harvey Ibrahim",
    "club": "Brighton",
    "position": "DEF",
    "price": 5.5,
    "points": 71
  },
  {
    "id": 63,
    "name": "Victor Cole",
    "club": "Brighton",
    "position": "DEF",
    "price": 5.0,
    "points": 105
  },
  {
    "id": 64,
    "name": "Alex Palmer",
    "club": "Brighton",
    "position": "DEF",
    "price": 4.5,
    "points": 137
  },
  {
    "id": 65,
    "name": "Isaac Van Dijk",
    "club": "Brighton",
    "position": "DEF",
    "price": 4.0,
    "points": 167
  },
  {
    "id": 66,
    "name": "Umar Grant",
    "club": "Brighton",
    "position": "DEF",
    "price": 4.0,
    "points": 86
  },
  {
    "id": 67,
    "name": "Victor Udoh",
    "club": "Brighton",
    "position": "FWD",
    "price": 9.5,
    "points": 48
  },
  {
    "id": 68,
    "name": "Zach Larsson",
    "club": "Brighton",
    "position": "GKP",
    "price": 5.0,
    "points": 62
  },
  {
    "id": 69,
    "name": "Jude Bello",
    "club": "Brighton",
    "position": "GKP",
    "price": 4.5,
    "points": 24
  },
  {
    "id": 70,
    "name": "Nico Anderson",
    "club": "Brighton",
    "position": "MID",
    "price": 13.0,
    "points": 60
  },
  {
    "id": 71,
    "name": "Curtis Quist",
    "club": "Brighton",
    "position": "MID",
    "price": 13.0,
    "points": 116
  },
  {
    "id": 72,
    "name": "Mason Cole",
    "club": "Brighton",
    "position": "MID",
    "price": 11.0,
    "points": 142
  },
  {
    "id": 73,
    "name": "Ethan Bello",
    "club": "Brighton",
    "position": "MID",
    "price": 9.0,
    "points": 54
  },
  {
    "id": 74,
    "name": "Dwight Diallo",
    "club": "Brighton",
    "position": "MID",
    "price": 6.0,
    "points": 0
  },
  {
    "id": 75,
    "name": "Harvey Kone",
    "club": "Brighton",
    "position": "MID",
    "price": 5.5,
    "points": 166
  },
  {
    "id": 76,
    "name": "Tobi Bello",
    "club": "Burnley",
    "position": "DEF",
    "price": 6.5,
    "points": 144
  },
  {
    "id": 77,
    "name": "Kwame Diallo",
    "club": "Burnley",
    "position": "DEF",
    "price": 6.0,
    "points": 128
  },
  {
    "id": 78,
    "name": "Carlos Moreno",
    "club": "Burnley",
    "position": "DEF",
    "price": 6.0,
    "points": 158
  },
  {
    "id": 79,
    "name": "Wilfried Palmer",
    "club": "Burnley",
    "position": "DEF",
    "price": 5.5,
    "points": 145
  },
  {
    "id": 80,
    "name": "Myles Kamara",
    "club": "Burnley",
    "position": "DEF",
    "price": 4.0,
    "points": 130
  },
  {
    "id": 81,
    "name": "Tobi Lewis",
    "club": "Burnley",
    "position": "DEF",
    "price": 4.0,
    "points": 17
  },
  {
    "id": 82,
    "name": "Samuel Palmer",
    "club": "Burnley",
    "position": "FWD",
    "price": 8.5,
    "points": 40
  },
  {
    "id": 83,
    "name": "Mason Nunez",
    "club": "Burnley",
    "position": "GKP",
    "price": 5.5,
    "points": 148
  },
  {
    "id": 84,
    "name": "Amari Jansen",
    "club": "Burnley",
    "position": "GKP",
    "price": 4.0,
    "points": 80
  },
  {
    "id": 85,
    "name": "Myles Uwa",
    "club": "Burnley",
    "position": "MID",
    "price": 13.0,
    "points": 52
  },
  {
    "id": 86,
    "name": "Declan Palmer",
    "club": "Burnley",
    "position": "MID",
    "price": 7.0,
    "points": 33
  },
  {
    "id": 87,
    "name": "Victor Quaye",
    "club": "Burnley",
    "position": "MID",
    "price": 7.0,
    "points": 80
  },
  {
    "id": 88,
    "name": "Levi Quist",
    "club": "Burnley",
    "position": "MID",
    "price": 5.5,
    "points": 89
  },
  {
    "id": 89,
    "name": "Pape Grant",
    "club": "Burnley",
    "position": "MID",
    "price": 5.0,
    "points": 54
  },
  {
    "id": 90,
    "name": "Bilal Edwards",
    "club": "Burnley",
    "position": "MID",
    "price": 4.5,
    "points": 159
  },
  {
    "id": 91,
    "name": "Andre Hughes",
    "club": "Chelsea",
    "position": "DEF",
    "price": 7.0,
    "points": 141
  },
  {
    "id": 92,
    "name": "Andre Holloway",
    "club": "Chelsea",
    "position": "DEF",
    "price": 5.5,
    "points": 13
  },
  {
    "id": 93,
    "name": "Tobi Petit",
    "club": "Chelsea",
    "position": "DEF",
    "price": 5.5,
    "points": 70
  },
  {
    "id": 94,
    "name": "Noah Robertson",
    "club": "Chelsea",
    "position": "DEF",
    "price": 5.0,
    "points": 53
  },
  {
    "id": 95,
    "name": "Callum Rowe",
    "club": "Chelsea",
    "position": "DEF",
    "price": 4.5,
    "points": 34
  },
  {
    "id": 96,
    "name": "Yannick Vardy",
    "club": "Chelsea",
    "position": "DEF",
    "price": 4.5,
    "points": 162
  },
  {
    "id": 97,
    "name": "Quinn Kone",
    "club": "Chelsea",
    "position": "FWD",
    "price": 6.0,
    "points": 32
  },
  {
    "id": 98,
    "name": "Harvey Jansen",
    "club": "Chelsea",
    "position": "GKP",
    "price": 5.0,
    "points": 156
  },
  {
    "id": 99,
    "name": "Umar Iheanacho",
    "club": "Chelsea",
    "position": "GKP",
    "price": 4.0,
    "points": 141
  },
  {
    "id": 100,
    "name": "Josh Edwards",
    "club": "Chelsea",
    "position": "MID",
    "price": 13.0,
    "points": 176
  },
  {
    "id": 101,
    "name": "Cole Palmer",
    "club": "Chelsea",
    "position": "MID",
    "price": 11.0,
    "points": 150
  },
  {
    "id": 102,
    "name": "Oscar Udoh",
    "club": "Chelsea",
    "position": "MID",
    "price": 8.5,
    "points": 2
  },
  {
    "id": 103,
    "name": "Marcus Anderson",
    "club": "Chelsea",
    "position": "MID",
    "price": 7.5,
    "points": 33
  },
  {
    "id": 104,
    "name": "Theo Quist",
    "club": "Chelsea",
    "position": "MID",
    "price": 6.0,
    "points": 113
  },
  {
    "id": 105,
    "name": "Noah Jansen",
    "club": "Chelsea",
    "position": "MID",
    "price": 5.0,
    "points": 94
  },
  {
    "id": 106,
    "name": "Ethan Lewis",
    "club": "Crystal Palace",
    "position": "DEF",
    "price": 7.0,
    "points": 6
  },
  {
    "id": 107,
    "name": "Mateo Whitmore",
    "club": "Crystal Palace",
    "position": "DEF",
    "price": 7.0,
    "points": 105
  },
  {
    "id": 108,
    "name": "Victor Whitmore",
    "club": "Crystal Palace",
    "position": "DEF",
    "price": 7.0,
    "points": 68
  },
  {
    "id": 109,
    "name": "Alex Walsh",
    "club": "Crystal Palace",
    "position": "DEF",
    "price": 6.5,
    "points": 104
  },
  {
    "id": 110,
    "name": "Solomon Whitmore",
    "club": "Crystal Palace",
    "position": "DEF",
    "price": 4.5,
    "points": 60
  },
  {
    "id": 111,
    "name": "Ethan Tavares",
    "club": "Crystal Palace",
    "position": "DEF",
    "price": 4.5,
    "points": 9
  },
  {
    "id": 112,
    "name": "Andre Lewis",
    "club": "Crystal Palace",
    "position": "FWD",
    "price": 10.5,
    "points": 67
  },
  {
    "id": 113,
    "name": "Jarrod Nunez",
    "club": "Crystal Palace",
    "position": "GKP",
    "price": 5.0,
    "points": 170
  },
  {
    "id": 114,
    "name": "Marcus Turner",
    "club": "Crystal Palace",
    "position": "GKP",
    "price": 4.5,
    "points": 10
  },
  {
    "id": 115,
    "name": "Nico Vardy",
    "club": "Crystal Palace",
    "position": "MID",
    "price": 13.0,
    "points": 29
  },
  {
    "id": 116,
    "name": "Reece Robertson",
    "club": "Crystal Palace",
    "position": "MID",
    "price": 12.5,
    "points": 71
  },
  {
    "id": 117,
    "name": "Jarrod Turner",
    "club": "Crystal Palace",
    "position": "MID",
    "price": 12.0,
    "points": 58
  },
  {
    "id": 118,
    "name": "Rafael Baker",
    "club": "Crystal Palace",
    "position": "MID",
    "price": 10.5,
    "points": 102
  },
  {
    "id": 119,
    "name": "Jarrod Quaye",
    "club": "Crystal Palace",
    "position": "MID",
    "price": 9.0,
    "points": 173
  },
  {
    "id": 120,
    "name": "Jude Osei",
    "club": "Crystal Palace",
    "position": "MID",
    "price": 6.5,
    "points": 117
  },
  {
    "id": 121,
    "name": "Josh Zubair",
    "club": "Everton",
    "position": "DEF",
    "price": 7.0,
    "points": 48
  },
  {
    "id": 122,
    "name": "Andre Carter",
    "club": "Everton",
    "position": "DEF",
    "price": 6.5,
    "points": 0
  },
  {
    "id": 123,
    "name": "Myles Jansen",
    "club": "Everton",
    "position": "DEF",
    "price": 6.5,
    "points": 171
  },
  {
    "id": 124,
    "name": "Zach Turner",
    "club": "Everton",
    "position": "DEF",
    "price": 6.0,
    "points": 170
  },
  {
    "id": 125,
    "name": "Diego Yates",
    "club": "Everton",
    "position": "DEF",
    "price": 5.5,
    "points": 170
  },
  {
    "id": 126,
    "name": "Reece Okafor",
    "club": "Everton",
    "position": "DEF",
    "price": 5.0,
    "points": 31
  },
  {
    "id": 127,
    "name": "Harvey Dorsett",
    "club": "Everton",
    "position": "FWD",
    "price": 11.5,
    "points": 130
  },
  {
    "id": 128,
    "name": "Marcus Grant",
    "club": "Everton",
    "position": "GKP",
    "price": 5.0,
    "points": 88
  },
  {
    "id": 129,
    "name": "Zach Uwa",
    "club": "Everton",
    "position": "GKP",
    "price": 4.5,
    "points": 130
  },
  {
    "id": 130,
    "name": "Curtis Sanogo",
    "club": "Everton",
    "position": "MID",
    "price": 11.0,
    "points": 44
  },
  {
    "id": 131,
    "name": "Quinn Ndiaye",
    "club": "Everton",
    "position": "MID",
    "price": 10.5,
    "points": 119
  },
  {
    "id": 132,
    "name": "Elliot Uwa",
    "club": "Everton",
    "position": "MID",
    "price": 8.0,
    "points": 75
  },
  {
    "id": 133,
    "name": "Solomon Larsson",
    "club": "Everton",
    "position": "MID",
    "price": 7.0,
    "points": 140
  },
  {
    "id": 134,
    "name": "James Turner",
    "club": "Everton",
    "position": "MID",
    "price": 7.0,
    "points": 110
  },
  {
    "id": 135,
    "name": "Oscar Ibrahim",
    "club": "Everton",
    "position": "MID",
    "price": 6.0,
    "points": 170
  },
  {
    "id": 136,
    "name": "Reece Foster",
    "club": "Fulham",
    "position": "DEF",
    "price": 7.0,
    "points": 60
  },
  {
    "id": 137,
    "name": "Curtis Gomes",
    "club": "Fulham",
    "position": "DEF",
    "price": 5.5,
    "points": 37
  },
  {
    "id": 138,
    "name": "Wilfried Turner",
    "club": "Fulham",
    "position": "DEF",
    "price": 5.0,
    "points": 50
  },
  {
    "id": 139,
    "name": "Solomon Yalcin",
    "club": "Fulham",
    "position": "DEF",
    "price": 4.5,
    "points": 106
  },
  {
    "id": 140,
    "name": "Theo Larsson",
    "club": "Fulham",
    "position": "DEF",
    "price": 4.5,
    "points": 178
  },
  {
    "id": 141,
    "name": "Noah Baker",
    "club": "Fulham",
    "position": "DEF",
    "price": 4.0,
    "points": 121
  },
  {
    "id": 142,
    "name": "Zach Holloway",
    "club": "Fulham",
    "position": "FWD",
    "price": 9.0,
    "points": 140
  },
  {
    "id": 143,
    "name": "Mason Holloway",
    "club": "Fulham",
    "position": "GKP",
    "price": 5.0,
    "points": 158
  },
  {
    "id": 144,
    "name": "Jude Whitmore",
    "club": "Fulham",
    "position": "GKP",
    "price": 4.5,
    "points": 21
  },
  {
    "id": 145,
    "name": "Victor Iheanacho",
    "club": "Fulham",
    "position": "MID",
    "price": 13.5,
    "points": 152
  },
  {
    "id": 146,
    "name": "Declan Xhaka",
    "club": "Fulham",
    "position": "MID",
    "price": 12.5,
    "points": 156
  },
  {
    "id": 147,
    "name": "Cesc Cole",
    "club": "Fulham",
    "position": "MID",
    "price": 6.5,
    "points": 178
  },
  {
    "id": 148,
    "name": "Josh Ekong",
    "club": "Fulham",
    "position": "MID",
    "price": 5.5,
    "points": 118
  },
  {
    "id": 149,
    "name": "Myles Ekong",
    "club": "Fulham",
    "position": "MID",
    "price": 5.0,
    "points": 63
  },
  {
    "id": 150,
    "name": "Umar Tavares",
    "club": "Fulham",
    "position": "MID",
    "price": 4.5,
    "points": 27
  },
  {
    "id": 151,
    "name": "Kevin Yalcin",
    "club": "Leeds United",
    "position": "DEF",
    "price": 6.5,
    "points": 124
  },
  {
    "id": 152,
    "name": "Rafael Zubair",
    "club": "Leeds United",
    "position": "DEF",
    "price": 6.5,
    "points": 180
  },
  {
    "id": 153,
    "name": "Bruno Edwards",
    "club": "Leeds United",
    "position": "DEF",
    "price": 5.5,
    "points": 84
  },
  {
    "id": 154,
    "name": "Theo Palmer",
    "club": "Leeds United",
    "position": "DEF",
    "price": 5.0,
    "points": 19
  },
  {
    "id": 155,
    "name": "Yannick Silva",
    "club": "Leeds United",
    "position": "DEF",
    "price": 5.0,
    "points": 85
  },
  {
    "id": 156,
    "name": "Declan Jansen",
    "club": "Leeds United",
    "position": "DEF",
    "price": 4.5,
    "points": 38
  },
  {
    "id": 157,
    "name": "Rafael Gomes",
    "club": "Leeds United",
    "position": "FWD",
    "price": 7.0,
    "points": 111
  },
  {
    "id": 158,
    "name": "Harvey Kamara",
    "club": "Leeds United",
    "position": "GKP",
    "price": 5.0,
    "points": 121
  },
  {
    "id": 159,
    "name": "Harvey Quist",
    "club": "Leeds United",
    "position": "GKP",
    "price": 5.0,
    "points": 163
  },
  {
    "id": 160,
    "name": "Elliot Zubair",
    "club": "Leeds United",
    "position": "MID",
    "price": 12.5,
    "points": 149
  },
  {
    "id": 161,
    "name": "Xavi Baker",
    "club": "Leeds United",
    "position": "MID",
    "price": 12.0,
    "points": 147
  },
  {
    "id": 162,
    "name": "Nico Whitmore",
    "club": "Leeds United",
    "position": "MID",
    "price": 11.0,
    "points": 154
  },
  {
    "id": 163,
    "name": "Nico Ekong",
    "club": "Leeds United",
    "position": "MID",
    "price": 8.0,
    "points": 52
  },
  {
    "id": 164,
    "name": "Callum Xhaka",
    "club": "Leeds United",
    "position": "MID",
    "price": 8.0,
    "points": 107
  },
  {
    "id": 165,
    "name": "Curtis Fabian",
    "club": "Leeds United",
    "position": "MID",
    "price": 4.5,
    "points": 90
  },
  {
    "id": 166,
    "name": "Trent Alexander-Arnold",
    "club": "Liverpool",
    "position": "DEF",
    "price": 7.5,
    "points": 231
  },
  {
    "id": 167,
    "name": "Virgil van Dijk",
    "club": "Liverpool",
    "position": "DEF",
    "price": 6.5,
    "points": 102
  },
  {
    "id": 168,
    "name": "Wilfried Adekunle",
    "club": "Liverpool",
    "position": "DEF",
    "price": 6.5,
    "points": 119
  },
  {
    "id": 169,
    "name": "Quinn Larsson",
    "club": "Liverpool",
    "position": "DEF",
    "price": 6.5,
    "points": 21
  },
  {
    "id": 170,
    "name": "Liam Okafor",
    "club": "Liverpool",
    "position": "DEF",
    "price": 6.0,
    "points": 100
  },
  {
    "id": 171,
    "name": "Umar Cole",
    "club": "Liverpool",
    "position": "DEF",
    "price": 4.5,
    "points": 118
  },
  {
    "id": 172,
    "name": "Cesc Quaye",
    "club": "Liverpool",
    "position": "FWD",
    "price": 5.0,
    "points": 7
  },
  {
    "id": 173,
    "name": "Alisson Becker",
    "club": "Liverpool",
    "position": "GKP",
    "price": 5.5,
    "points": 103
  },
  {
    "id": 174,
    "name": "Kobbie Baker",
    "club": "Liverpool",
    "position": "GKP",
    "price": 4.5,
    "points": 171
  },
  {
    "id": 175,
    "name": "Mohamed Salah",
    "club": "Liverpool",
    "position": "MID",
    "price": 13.5,
    "points": 108
  },
  {
    "id": 176,
    "name": "Kevin Xhaka",
    "club": "Liverpool",
    "position": "MID",
    "price": 13.0,
    "points": 107
  },
  {
    "id": 177,
    "name": "Andre Foster",
    "club": "Liverpool",
    "position": "MID",
    "price": 8.5,
    "points": 138
  },
  {
    "id": 178,
    "name": "Bruno Ekong",
    "club": "Liverpool",
    "position": "MID",
    "price": 7.5,
    "points": 97
  },
  {
    "id": 179,
    "name": "Mateo Diallo",
    "club": "Liverpool",
    "position": "MID",
    "price": 7.0,
    "points": 83
  },
  {
    "id": 180,
    "name": "Kwame Walsh",
    "club": "Liverpool",
    "position": "MID",
    "price": 6.5,
    "points": 17
  },
  {
    "id": 181,
    "name": "Josh Larsson",
    "club": "Manchester City",
    "position": "DEF",
    "price": 7.5,
    "points": 119
  },
  {
    "id": 182,
    "name": "Ruben Ndiaye",
    "club": "Manchester City",
    "position": "DEF",
    "price": 7.5,
    "points": 29
  },
  {
    "id": 183,
    "name": "Cesc Kamara",
    "club": "Manchester City",
    "position": "DEF",
    "price": 7.5,
    "points": 27
  },
  {
    "id": 184,
    "name": "Quinn Baker",
    "club": "Manchester City",
    "position": "DEF",
    "price": 7.5,
    "points": 147
  },
  {
    "id": 185,
    "name": "Xavi Quist",
    "club": "Manchester City",
    "position": "DEF",
    "price": 6.5,
    "points": 42
  },
  {
    "id": 186,
    "name": "Wilfried Zubair",
    "club": "Manchester City",
    "position": "DEF",
    "price": 5.5,
    "points": 50
  },
  {
    "id": 187,
    "name": "Erling Haaland",
    "club": "Manchester City",
    "position": "FWD",
    "price": 15.0,
    "points": 243
  },
  {
    "id": 188,
    "name": "Carlos Mensah",
    "club": "Manchester City",
    "position": "GKP",
    "price": 5.5,
    "points": 159
  },
  {
    "id": 189,
    "name": "Noah Palmer",
    "club": "Manchester City",
    "position": "GKP",
    "price": 4.0,
    "points": 171
  },
  {
    "id": 190,
    "name": "Wilfried Ndiaye",
    "club": "Manchester City",
    "position": "MID",
    "price": 11.5,
    "points": 144
  },
  {
    "id": 191,
    "name": "Carlos Grant",
    "club": "Manchester City",
    "position": "MID",
    "price": 11.0,
    "points": 77
  },
  {
    "id": 192,
    "name": "Samuel Moreno",
    "club": "Manchester City",
    "position": "MID",
    "price": 10.5,
    "points": 160
  },
  {
    "id": 193,
    "name": "Kevin De Bruyne",
    "club": "Manchester City",
    "position": "MID",
    "price": 10.0,
    "points": 106
  },
  {
    "id": 194,
    "name": "Phil Foden",
    "club": "Manchester City",
    "position": "MID",
    "price": 8.0,
    "points": 87
  },
  {
    "id": 195,
    "name": "Rodri Hernandez",
    "club": "Manchester City",
    "position": "MID",
    "price": 6.5,
    "points": 209
  },
  {
    "id": 196,
    "name": "James Bello",
    "club": "Manchester United",
    "position": "DEF",
    "price": 7.0,
    "points": 27
  },
  {
    "id": 197,
    "name": "Kevin Uwa",
    "club": "Manchester United",
    "position": "DEF",
    "price": 7.0,
    "points": 22
  },
  {
    "id": 198,
    "name": "Finlay Yates",
    "club": "Manchester United",
    "position": "DEF",
    "price": 6.0,
    "points": 117
  },
  {
    "id": 199,
    "name": "Umar Robertson",
    "club": "Manchester United",
    "position": "DEF",
    "price": 6.0,
    "points": 137
  },
  {
    "id": 200,
    "name": "Yannick Johnson",
    "club": "Manchester United",
    "position": "DEF",
    "price": 5.5,
    "points": 133
  },
  {
    "id": 201,
    "name": "Cesc Fabian",
    "club": "Manchester United",
    "position": "DEF",
    "price": 5.5,
    "points": 151
  },
  {
    "id": 202,
    "name": "James Iheanacho",
    "club": "Manchester United",
    "position": "FWD",
    "price": 14.5,
    "points": 21
  },
  {
    "id": 203,
    "name": "Marcus Walsh",
    "club": "Manchester United",
    "position": "GKP",
    "price": 5.0,
    "points": 169
  },
  {
    "id": 204,
    "name": "Ollie Edwards",
    "club": "Manchester United",
    "position": "GKP",
    "price": 5.0,
    "points": 87
  },
  {
    "id": 205,
    "name": "Ruben Tavares",
    "club": "Manchester United",
    "position": "MID",
    "price": 12.5,
    "points": 142
  },
  {
    "id": 206,
    "name": "Daniel Gomes",
    "club": "Manchester United",
    "position": "MID",
    "price": 12.0,
    "points": 46
  },
  {
    "id": 207,
    "name": "Pape Okafor",
    "club": "Manchester United",
    "position": "MID",
    "price": 10.5,
    "points": 86
  },
  {
    "id": 208,
    "name": "Bruno Fernandes",
    "club": "Manchester United",
    "position": "MID",
    "price": 9.0,
    "points": 253
  },
  {
    "id": 209,
    "name": "Kobbie Nunez",
    "club": "Manchester United",
    "position": "MID",
    "price": 7.5,
    "points": 66
  },
  {
    "id": 210,
    "name": "Kevin Dorsett",
    "club": "Manchester United",
    "position": "MID",
    "price": 6.5,
    "points": 118
  },
  {
    "id": 211,
    "name": "Bilal Palmer",
    "club": "Newcastle United",
    "position": "DEF",
    "price": 6.5,
    "points": 165
  },
  {
    "id": 212,
    "name": "Carlos Turner",
    "club": "Newcastle United",
    "position": "DEF",
    "price": 6.5,
    "points": 94
  },
  {
    "id": 213,
    "name": "Jude Kone",
    "club": "Newcastle United",
    "position": "DEF",
    "price": 6.0,
    "points": 108
  },
  {
    "id": 214,
    "name": "Yannick Gomes",
    "club": "Newcastle United",
    "position": "DEF",
    "price": 5.5,
    "points": 4
  },
  {
    "id": 215,
    "name": "Tobi Silva",
    "club": "Newcastle United",
    "position": "DEF",
    "price": 5.0,
    "points": 177
  },
  {
    "id": 216,
    "name": "Amari Kone",
    "club": "Newcastle United",
    "position": "DEF",
    "price": 5.0,
    "points": 179
  },
  {
    "id": 217,
    "name": "Alexander Isak",
    "club": "Newcastle United",
    "position": "FWD",
    "price": 8.5,
    "points": 115
  },
  {
    "id": 218,
    "name": "Nick Pope",
    "club": "Newcastle United",
    "position": "GKP",
    "price": 5.0,
    "points": 139
  },
  {
    "id": 219,
    "name": "Carlos Van Dijk",
    "club": "Newcastle United",
    "position": "GKP",
    "price": 4.5,
    "points": 142
  },
  {
    "id": 220,
    "name": "Bilal Iheanacho",
    "club": "Newcastle United",
    "position": "MID",
    "price": 10.0,
    "points": 25
  },
  {
    "id": 221,
    "name": "Isaac Robertson",
    "club": "Newcastle United",
    "position": "MID",
    "price": 7.5,
    "points": 59
  },
  {
    "id": 222,
    "name": "Amari Fabian",
    "club": "Newcastle United",
    "position": "MID",
    "price": 7.0,
    "points": 150
  },
  {
    "id": 223,
    "name": "Diego Silva",
    "club": "Newcastle United",
    "position": "MID",
    "price": 6.5,
    "points": 45
  },
  {
    "id": 224,
    "name": "Josh Van Dijk",
    "club": "Newcastle United",
    "position": "MID",
    "price": 6.0,
    "points": 30
  },
  {
    "id": 225,
    "name": "Bilal Tavares",
    "club": "Newcastle United",
    "position": "MID",
    "price": 6.0,
    "points": 55
  },
  {
    "id": 226,
    "name": "Mason Tavares",
    "club": "Nottingham Forest",
    "position": "DEF",
    "price": 7.5,
    "points": 163
  },
  {
    "id": 227,
    "name": "Reece Lewis",
    "club": "Nottingham Forest",
    "position": "DEF",
    "price": 7.5,
    "points": 64
  },
  {
    "id": 228,
    "name": "Jude Hughes",
    "club": "Nottingham Forest",
    "position": "DEF",
    "price": 7.0,
    "points": 102
  },
  {
    "id": 229,
    "name": "Kobbie Edwards",
    "club": "Nottingham Forest",
    "position": "DEF",
    "price": 6.0,
    "points": 175
  },
  {
    "id": 230,
    "name": "Pape Silva",
    "club": "Nottingham Forest",
    "position": "DEF",
    "price": 5.5,
    "points": 112
  },
  {
    "id": 231,
    "name": "Bilal Gomes",
    "club": "Nottingham Forest",
    "position": "DEF",
    "price": 4.5,
    "points": 3
  },
  {
    "id": 232,
    "name": "Bilal Nunez",
    "club": "Nottingham Forest",
    "position": "FWD",
    "price": 11.0,
    "points": 67
  },
  {
    "id": 233,
    "name": "Kevin Carter",
    "club": "Nottingham Forest",
    "position": "GKP",
    "price": 5.5,
    "points": 141
  },
  {
    "id": 234,
    "name": "Callum Anderson",
    "club": "Nottingham Forest",
    "position": "GKP",
    "price": 5.0,
    "points": 32
  },
  {
    "id": 235,
    "name": "Callum Foster",
    "club": "Nottingham Forest",
    "position": "MID",
    "price": 13.5,
    "points": 30
  },
  {
    "id": 236,
    "name": "Callum Moreno",
    "club": "Nottingham Forest",
    "position": "MID",
    "price": 13.5,
    "points": 78
  },
  {
    "id": 237,
    "name": "Kwame Okafor",
    "club": "Nottingham Forest",
    "position": "MID",
    "price": 13.0,
    "points": 25
  },
  {
    "id": 238,
    "name": "Solomon Osei",
    "club": "Nottingham Forest",
    "position": "MID",
    "price": 11.5,
    "points": 97
  },
  {
    "id": 239,
    "name": "Oscar Xhaka",
    "club": "Nottingham Forest",
    "position": "MID",
    "price": 8.0,
    "points": 152
  },
  {
    "id": 240,
    "name": "Kwame Johnson",
    "club": "Nottingham Forest",
    "position": "MID",
    "price": 6.0,
    "points": 144
  },
  {
    "id": 241,
    "name": "Harvey Tavares",
    "club": "Sunderland",
    "position": "DEF",
    "price": 6.0,
    "points": 74
  },
  {
    "id": 242,
    "name": "Andre Petit",
    "club": "Sunderland",
    "position": "DEF",
    "price": 6.0,
    "points": 50
  },
  {
    "id": 243,
    "name": "Finlay Hughes",
    "club": "Sunderland",
    "position": "DEF",
    "price": 6.0,
    "points": 165
  },
  {
    "id": 244,
    "name": "Marcus Osei",
    "club": "Sunderland",
    "position": "DEF",
    "price": 5.0,
    "points": 72
  },
  {
    "id": 245,
    "name": "Xavi Ekong",
    "club": "Sunderland",
    "position": "DEF",
    "price": 4.0,
    "points": 59
  },
  {
    "id": 246,
    "name": "Noah Edwards",
    "club": "Sunderland",
    "position": "DEF",
    "price": 4.0,
    "points": 78
  },
  {
    "id": 247,
    "name": "Bilal Sanogo",
    "club": "Sunderland",
    "position": "FWD",
    "price": 13.0,
    "points": 147
  },
  {
    "id": 248,
    "name": "Victor Foster",
    "club": "Sunderland",
    "position": "GKP",
    "price": 4.0,
    "points": 44
  },
  {
    "id": 249,
    "name": "Oscar Edwards",
    "club": "Sunderland",
    "position": "GKP",
    "price": 4.0,
    "points": 104
  },
  {
    "id": 250,
    "name": "Ruben Whitmore",
    "club": "Sunderland",
    "position": "MID",
    "price": 12.0,
    "points": 73
  },
  {
    "id": 251,
    "name": "Amari Uwa",
    "club": "Sunderland",
    "position": "MID",
    "price": 10.0,
    "points": 6
  },
  {
    "id": 252,
    "name": "Wilfried Larsson",
    "club": "Sunderland",
    "position": "MID",
    "price": 10.0,
    "points": 5
  },
  {
    "id": 253,
    "name": "Kevin Holloway",
    "club": "Sunderland",
    "position": "MID",
    "price": 9.5,
    "points": 112
  },
  {
    "id": 254,
    "name": "Isaac Tavares",
    "club": "Sunderland",
    "position": "MID",
    "price": 7.0,
    "points": 103
  },
  {
    "id": 255,
    "name": "Tobi Ndiaye",
    "club": "Sunderland",
    "position": "MID",
    "price": 5.0,
    "points": 110
  },
  {
    "id": 256,
    "name": "Victor Adekunle",
    "club": "Tottenham Hotspur",
    "position": "DEF",
    "price": 7.0,
    "points": 140
  },
  {
    "id": 257,
    "name": "Reece Bello",
    "club": "Tottenham Hotspur",
    "position": "DEF",
    "price": 6.5,
    "points": 73
  },
  {
    "id": 258,
    "name": "Mateo Moreno",
    "club": "Tottenham Hotspur",
    "position": "DEF",
    "price": 5.5,
    "points": 125
  },
  {
    "id": 259,
    "name": "Tobi Fabian",
    "club": "Tottenham Hotspur",
    "position": "DEF",
    "price": 5.0,
    "points": 85
  },
  {
    "id": 260,
    "name": "Declan Rowe",
    "club": "Tottenham Hotspur",
    "position": "DEF",
    "price": 4.5,
    "points": 41
  },
  {
    "id": 261,
    "name": "Marcus Ekong",
    "club": "Tottenham Hotspur",
    "position": "DEF",
    "price": 4.5,
    "points": 64
  },
  {
    "id": 262,
    "name": "Mason Dorsett",
    "club": "Tottenham Hotspur",
    "position": "FWD",
    "price": 13.5,
    "points": 124
  },
  {
    "id": 263,
    "name": "Marcus Xhaka",
    "club": "Tottenham Hotspur",
    "position": "GKP",
    "price": 5.0,
    "points": 120
  },
  {
    "id": 264,
    "name": "Myles Quaye",
    "club": "Tottenham Hotspur",
    "position": "GKP",
    "price": 4.5,
    "points": 71
  },
  {
    "id": 265,
    "name": "Declan Hughes",
    "club": "Tottenham Hotspur",
    "position": "MID",
    "price": 13.0,
    "points": 103
  },
  {
    "id": 266,
    "name": "Ollie Okafor",
    "club": "Tottenham Hotspur",
    "position": "MID",
    "price": 11.5,
    "points": 160
  },
  {
    "id": 267,
    "name": "Levi Anderson",
    "club": "Tottenham Hotspur",
    "position": "MID",
    "price": 10.5,
    "points": 138
  },
  {
    "id": 268,
    "name": "Son Heung-min",
    "club": "Tottenham Hotspur",
    "position": "MID",
    "price": 9.5,
    "points": 142
  },
  {
    "id": 269,
    "name": "Isaac Bello",
    "club": "Tottenham Hotspur",
    "position": "MID",
    "price": 5.0,
    "points": 132
  },
  {
    "id": 270,
    "name": "Harvey Xhaka",
    "club": "Tottenham Hotspur",
    "position": "MID",
    "price": 5.0,
    "points": 68
  },
  {
    "id": 271,
    "name": "Josh Quaye",
    "club": "West Ham United",
    "position": "DEF",
    "price": 7.0,
    "points": 127
  },
  {
    "id": 272,
    "name": "Curtis Mensah",
    "club": "West Ham United",
    "position": "DEF",
    "price": 7.0,
    "points": 130
  },
  {
    "id": 273,
    "name": "Amari Ibrahim",
    "club": "West Ham United",
    "position": "DEF",
    "price": 7.0,
    "points": 70
  },
  {
    "id": 274,
    "name": "James Kone",
    "club": "West Ham United",
    "position": "DEF",
    "price": 5.5,
    "points": 57
  },
  {
    "id": 275,
    "name": "Jude Palmer",
    "club": "West Ham United",
    "position": "DEF",
    "price": 5.5,
    "points": 37
  },
  {
    "id": 276,
    "name": "Levi Udoh",
    "club": "West Ham United",
    "position": "DEF",
    "price": 5.0,
    "points": 123
  },
  {
    "id": 277,
    "name": "Carlos Larsson",
    "club": "West Ham United",
    "position": "FWD",
    "price": 8.5,
    "points": 105
  },
  {
    "id": 278,
    "name": "Josh Baker",
    "club": "West Ham United",
    "position": "GKP",
    "price": 5.5,
    "points": 155
  },
  {
    "id": 279,
    "name": "Carlos Udoh",
    "club": "West Ham United",
    "position": "GKP",
    "price": 4.0,
    "points": 141
  },
  {
    "id": 280,
    "name": "Quinn Moreno",
    "club": "West Ham United",
    "position": "MID",
    "price": 13.5,
    "points": 125
  },
  {
    "id": 281,
    "name": "Isaac Uwa",
    "club": "West Ham United",
    "position": "MID",
    "price": 12.5,
    "points": 178
  },
  {
    "id": 282,
    "name": "Reece Kone",
    "club": "West Ham United",
    "position": "MID",
    "price": 11.5,
    "points": 96
  },
  {
    "id": 283,
    "name": "Noah Dorsett",
    "club": "West Ham United",
    "position": "MID",
    "price": 9.5,
    "points": 88
  },
  {
    "id": 284,
    "name": "Cesc Bello",
    "club": "West Ham United",
    "position": "MID",
    "price": 7.5,
    "points": 129
  },
  {
    "id": 285,
    "name": "Kevin Anderson",
    "club": "West Ham United",
    "position": "MID",
    "price": 7.0,
    "points": 76
  },
  {
    "id": 286,
    "name": "Noah Gomes",
    "club": "Wolverhampton Wanderers",
    "position": "DEF",
    "price": 7.5,
    "points": 32
  },
  {
    "id": 287,
    "name": "Tobi Vardy",
    "club": "Wolverhampton Wanderers",
    "position": "DEF",
    "price": 7.0,
    "points": 136
  },
  {
    "id": 288,
    "name": "Harvey Grant",
    "club": "Wolverhampton Wanderers",
    "position": "DEF",
    "price": 6.0,
    "points": 116
  },
  {
    "id": 289,
    "name": "Levi Moreno",
    "club": "Wolverhampton Wanderers",
    "position": "DEF",
    "price": 5.0,
    "points": 25
  },
  {
    "id": 290,
    "name": "Jude Quist",
    "club": "Wolverhampton Wanderers",
    "position": "DEF",
    "price": 5.0,
    "points": 177
  },
  {
    "id": 291,
    "name": "James Van Dijk",
    "club": "Wolverhampton Wanderers",
    "position": "DEF",
    "price": 4.5,
    "points": 167
  },
  {
    "id": 292,
    "name": "Declan Diallo",
    "club": "Wolverhampton Wanderers",
    "position": "FWD",
    "price": 7.5,
    "points": 95
  },
  {
    "id": 293,
    "name": "Curtis Zubair",
    "club": "Wolverhampton Wanderers",
    "position": "GKP",
    "price": 5.5,
    "points": 166
  },
  {
    "id": 294,
    "name": "Marcus Uwa",
    "club": "Wolverhampton Wanderers",
    "position": "GKP",
    "price": 5.0,
    "points": 180
  },
  {
    "id": 295,
    "name": "Theo Sanogo",
    "club": "Wolverhampton Wanderers",
    "position": "MID",
    "price": 13.0,
    "points": 58
  },
  {
    "id": 296,
    "name": "Xavi Turner",
    "club": "Wolverhampton Wanderers",
    "position": "MID",
    "price": 12.5,
    "points": 11
  },
  {
    "id": 297,
    "name": "Bilal Petit",
    "club": "Wolverhampton Wanderers",
    "position": "MID",
    "price": 11.0,
    "points": 25
  },
  {
    "id": 298,
    "name": "Curtis Uwa",
    "club": "Wolverhampton Wanderers",
    "position": "MID",
    "price": 10.0,
    "points": 124
  },
  {
    "id": 299,
    "name": "Nico Carter",
    "club": "Wolverhampton Wanderers",
    "position": "MID",
    "price": 10.0,
    "points": 60
  },
  {
    "id": 300,
    "name": "Amari Foster",
    "club": "Wolverhampton Wanderers",
    "position": "MID",
    "price": 8.5,
    "points": 25
  }
];
