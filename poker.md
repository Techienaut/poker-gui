## Concepts
- hand: 5 cards
- card: rank and suit
- poker(hands) => best hand
- handRank
  - Straight Flush()
    - (?, higest_card)
  - Four-kind
    - (?, highest_card)
  - Full house (3-kind and 2-kind)
    - (?, highest_card, second_highest)
  - Flush
    - (?, 5 highest)
  - straight
    - (?, highest)
  - 3-kind
    - (?, highest, first_kicker, second_kicker)
  - 2-pair
    - (?, highest, seond_highest, kicker)
  - 2-kind
    - (?, highest, kicker, second_kicker, third_kicker)
  - high_care
    - (?, highest, 4 kickers)
## phases
  - Number of players: 
  - Print( "player 1", PC1 )
  - 2 cards to your hand
  - 3 cards append to communal
  - 1 card append to communal
  - 1 card append to communal
  - winner
## Objects
- communal = [
      {suit: 4, rank: 3}, 
      {suit: 2, rank: 3}
  ]
- Player = {
    name: "Player 1" (other: PC1, PC2)
    hand: [
      {suit: 4, rank: 3}, 
      {suit: 2, rank: 3}
    ]
    communal: []
  }