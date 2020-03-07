 
// PROMPT HOW MANY PLAYERS
//while (true){
//    var numOfPlayers = Number(readlineSync.question('Number of players? '));
//    console.log(typeof(numOfPlayers));
//    console.log(numOfPlayers);
//    if (!Number.isInteger(numOfPlayers) || numOfPlayers < 2){
//        console.log("please enter a valid number");
//    } else if (numOfPlayers > 11){
//        console.log("Too many players. Maximum is 11.")
//    }
//    else{
//        break;
//    }
//}

// RETURNS BEST HAND
const CLUB = 1;
const DIAMOND = 2;
const HEART = 3;
const SPADE = 4;
const ACE_HI = 14;
const ACE_LOW = 1;
const STRAIGHT_FLUSH = 9;
const FOUR_KIND = 8;
const FULL_HOUSE = 7;
const FLUSH = 6;
const STRAIGHT = 5;
const THREE_KIND = 4;
const TWO_PAIR = 3;
const PAIR = 2;
const HIGH_CARD = 1;

//var handV = handValue([
//    {suit: }
//])
function handValue(hand){
    hValue = [0]
    hValue =  straightFlush(hand);
    if (hValue[0] > 0) return hValue;
    hValue =  nKind(4, hand);
    if (hValue[0] > 0) return hValue;
    hValue =  fullHouse(hand);
    if (hValue[0] > 0) return hValue;
    hValue =  flush(hand);
    if (hValue[0] > 0) return hValue;
    hValue =  straight(hand);
    if (hValue[0] > 0) return hValue;
    hValue =  nKind(3, hand);
    if (hValue[0] > 0) return hValue;
    hValue =  twoPair(hand);
    if (hValue[0] > 0) return hValue;
    hValue =  nKind(2, hand);
    if (hValue[0] > 0) return hValue;
    return highCard(hand);
}
function calcHands(hands){
    
}
function aceHigh(hand){
    for(i = 0; i < hand.length; i++){
        if (hand[i].rank == 1) hand[i].rank = 14;
    }
    return hand;
}
function addLowHighAces(hand){
    var handAceLowHi = hand.slice();
    for (var i = 0; i < hand.length; i ++){
        if(hand[i].rank = 14){
            handAceLowHi.push({rank: 1, suit: hand[i].suit});
        } else if (hand[i].rank = 11){
            handAceLowHi.push({rank: 14, suit: hand[i].suit});
        }
    }
    return handAceLowHi;
}
// RETURNS {hand, rank}
function straightHelper(hand){
    hand = hand.slice();
    hand = aceHigh(hand);
    handAceLowHi = addLowHighAces(hand);
    if(hand.length === 0){
        return {
            hand: [],
            rank: 0
        };
    }
    matchCards = [
        {rank: 1, quant: 0},
        {rank: 2, quant: 0},
        {rank: 3, quant: 0},
        {rank: 4, quant: 0},
        {rank: 5, quant: 0},
        {rank: 6, quant: 0},
        {rank: 7, quant: 0},
        {rank: 8, quant: 0},
        {rank: 9, quant: 0},
        {rank: 10, quant: 0},
        {rank: 11, quant: 0},
        {rank: 12, quant: 0},
        {rank: 13, quant: 0},
        {rank: 14, quant: 0},
    ]
    for (var i = 0; i < handAceLowHi.length; i++){
        var index = handAceLowHi[i].rank - 1;
        matchCards[index].quant++;
    }
    var chain = [];
    var highCard = 0;
    for (var i = matchCards - 1; i >= 0; i--){
        if (chain.length === 0){
            chain[0] = matchCards[i].rank;
        } else if (matchCards[i].rank === chain[chain.length - 1] - 1){
            chain.push(matchCards[i].rank);
        } else {
            if (chain.length >= 5){
                break;
            }
            chain = [];
        }
    }
    if(chain.length < 5){
        return {hand: hand, rank: 0};
    }
    var highRank = chain[0];
    for(var i = 0; i < hand.length; i++){
        //IF ACE
        if(hand[i].rank === 14 || hand[i].rank === 1){
            // If ACE B/W BEGINNING AND END OF CHAIN
            if((14 <= chain[0] && 14 >= chain[chain.length - 1]) 
            || (1 <= chain[0] && 1 >= chain[chain.length - 1])){
                //LOOP THROUGH CHAIN
                for (var j = 0; j < chain.length; j++){
                    if(14 === chain[j] || 1 == chain[j]){
                        hand.splice(i, 1);
                        i--;
                    }
                    break;
                }               
            }
       } else if(hand[i].rank <= chain[0] && hand[i].rank >= chain[chain.length - 1]){
            for (var j = 0; j < chain.length; j++){
                if(hand[i].rank === chain[j]){
                    hand.splice(i, 1);
                    i--;
                    break;
                }
            }
        }
    }
    return {hand: hand, rank: highRank};
}
//function straightFlush(hand)
// RETURNS (3-value ARRAY):
// [remaining_hand, highest rank of n-Kind, ranks of remaining cards from highest to lowest]
// If no n-Kind cards exist, returns [0].
function nKind(hand, n = 1, opts = {kickers : true}){
    // e.g. [{quant: 2, rank: 13}, {quant: 3, rank: 9}]
    hand = hand.slice();
    var highRank = 0;
    if(hand.length == 0){
        return {
            hand: hand,
            rank: 0,
            kickers: []
        };
    }
    var matchCards = [
        {rank: 1, quant: 0},
        {rank: 2, quant: 0},
        {rank: 3, quant: 0},
        {rank: 4, quant: 0},
        {rank: 5, quant: 0},
        {rank: 6, quant: 0},
        {rank: 7, quant: 0},
        {rank: 8, quant: 0},
        {rank: 9, quant: 0},
        {rank: 10, quant: 0},
        {rank: 11, quant: 0},
        {rank: 12, quant: 0},
        {rank: 13, quant: 0},
        {rank: 14, quant: 0},
    ];

    hand = aceHigh(hand);
    
    for(var i = 0; i < hand.length; i++){
        var index = hand[i].rank - 1;
        matchCards[index].quant++
    }
    for(var i = matchCards.length - 1; i >= 0; i--){
        if(matchCards[i].quant >= n){
            highRank = matchCards[i].rank;

            // REMOVE N-KIND CARDS FROM HAND, AND RETURN.
            for(var j = 0; j < hand.length; j++){
                if (hand[j].rank == highRank){
                    hand.splice(j, 1);
                    j--;
                }
            }
            if(opts.kickers == true){
                var oneKind = nKind(hand, 1, {kickers: true});
                var kickers = [oneKind.rank].concat(oneKind.kickers);
                return {
                    hand: hand,
                    rank: highRank,
                    kickers: kickers
                };
            } else {
                return {
                    hand: hand,
                    rank: highRank,
                    kickers: []
                };
            }
        }
    }
    return [0];
}
function flush(hand){
    var val = flushHelper(hand, {remainingHand: true});
    if(val.highCard === 0){
        return [0];
    } else{
        var oneKind = nKind(val.hand, 1, {kickers: true});
        var kickers = [oneKind.rank].concat(oneKind.kickers);
        return [FLUSH, val.highCard].concat(kickers);
    }
}
// RETURNS (ARRAY)
// {remainingHand, suit, highCard from suit}
function flushHelper(hand, opts = {remainingHand: true}){
    const FLUSH_LENGTH = 5;
    var highCard = 0;
    var suitFlush = 0;
    hand = hand.slice();
    if(hand.length == 0){
        return [0];
    }
    var matchCards = [
        {suit: CLUB, quant: 0},
        {suit: DIAMOND, quant: 0},
        {suit: HEART, quant: 0},
        {suit: SPADE, quant: 0}
    ];
    hand = aceHigh(hand);
    for(var i = 0; i < hand.length; i++){
        var index = hand[i].suit - 1;
        matchCards[index].quant++;
    }
    for(var i = 0; i < matchCards.length; i++){
        if (matchCards[i].quant >= FLUSH_LENGTH){
            for (var j = 0; j < hand.length; j++){
                if(hand[j].suit === matchCards[i].suit){
                    if(hand[j].rank > highCard){
                        highCard = hand[j].rank;
                        suitFlush = hand[j].suit;
                    }
                }
            }
        }
    }
    // REMOVE SUIT CARDS FROM HAND
    for (var i = 0; i < hand.length; i++){
        if (hand[i].suit == suitFlush){
            hand.splice(i, 1);
            i--;
        }
    }

    if(opts.remainingHand == true){
        return {
            hand: hand,
            suit: suitFlush,
            highCard: highCard
        };
    } else {
        return {
            hand: [],
            suit: suitFlush,
            highCard: highCard
        };
    }
}
function fourKind(hand){
    var val = nKind(hand, 4, {kickers: true});
    if (val.rank === 0){
        return [0];
    }
    else {
        return ([FOUR_KIND].concat([val.rank],val.kickers));
    }
}
function fullHouse(hand){
    var val = nKind(hand, 3, {kickers: true});
    if(val.rank === 0){
        return [0];
    }
    var threeKind = val.rank;
    val = nKind(val.hand, 2, {kickers: true});
    if(val.rank === 0){
        return [0];
    }
    var twoKind = val.rank;
    return [FULL_HOUSE, Math.max(twoKind, threeKind), Math.min(twoKind, threeKind)].concat(val.kickers);
}
function threeKind(hand){
    var val = nKind(hand, 3, {kickers: true});
    if (val.rank === 0){
        return [0];
    }
    else {
        return ([THREE_KIND].concat([val.rank], val.kickers));
    }
}
function twoPair(hand){
    var val = nKind(hand, 2, {kickers: true});
    if(val.rank === 0){
        return [0];
    }
    var firstPair = val.rank;
    val = nKind(val.hand, 2, {kickers: true});
    if(val.rank === 0){
        return [0];
    }
    var secondPair = val.rank;
    return [TWO_PAIR, Math.max(firstPair, secondPair), Math.min(firstPair, secondPair)].concat(val.kickers);
}
function pair(hand){
    var val = nKind(hand, 2, {kickers: true});
    if (val.rank === 0){
        return [0];
    }
    else {
        return ([PAIR].concat([val.rank], val.kickers));
    }
}
function highCard(hand){
    var val = nKind(hand, 1, {kickers: true});
    if (val.rank === 0){
        return [0];
    }
    else {
        return ([HIGH_CARD].concat([val.rank], val.kickers));
    }
}
var hand = [
    {suit: CLUB, rank: 12},
    {suit: SPADE, rank: 12},
    {suit: HEART, rank: 1},
    {suit: CLUB, rank: 13},
    {suit: CLUB, rank: 14},
    {suit: HEART, rank: 12},
    {suit: DIAMOND, rank: 12},
    {suit: CLUB, rank: 6},
    {suit: CLUB, rank: 4}

];
// var twokind = fourKind(hand);
var fullH =  flush(hand);
//var twokind = nKind(2, hand);