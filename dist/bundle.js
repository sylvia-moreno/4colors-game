/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var cardsGame = __webpack_require__(/*! ./utils/get-card.js */ \"./src/js/utils/get-card.js\");\r\nvar player1ZoneHTML = $(\"div[data-player='player1']\")[0];\r\nvar player2ZoneHTML = $(\"div[data-player='player2']\")[0];\r\nvar playedLocation = $(\".card-played\")\r\n\r\nconst state = {\r\n    player1: {\r\n        cards: []\r\n    },\r\n\r\n    player2: {\r\n        cards: []\r\n    },\r\n\r\n    board: {\r\n        cards: [] //cartes totales de mon jeu\r\n    },\r\n\r\n    pioche: {\r\n        cards: []\r\n    },\r\n\r\n    turn: '',\r\n}\r\n\r\n\r\n\r\n/* -------- */\r\n/*\r\nFunctions utils\r\n*/\r\nfunction shuffle(cards) {\r\n    var arrCards = [];\r\n    for (i = 0; i < cards.length; i++) {\r\n        arrCards.push(cards[Math.floor(Math.random() * cards.length)])\r\n    }\r\n    console.log('voici la liste des ', arrCards.length, ' cartes mélangées : ', arrCards);\r\n    //je met à jour la liste de mes cartes qui se trouvent sur la table\r\n    state.board.cards.push(arrCards);\r\n    return arrCards;\r\n}\r\n\r\nfunction updateStateCardBoard(cards, arrCardBoard) {\r\n    var index;\r\n    for (var i = 0; i < cards.length; i++) {\r\n        index = arrCardBoard.indexOf(arrCardBoard[i]);\r\n        if (index > -1) {\r\n            arrCardBoard.splice(index, 1);\r\n        }\r\n    }\r\n}\r\n\r\nfunction removeCard(monTasDeCartesAParser, laCarteASupprimer) {\r\n    //removeCard(state[player].cards, card)\r\n    for (var i = monTasDeCartesAParser.length - 1; i >= 0; i--) {\r\n        if (monTasDeCartesAParser[i] === laCarteASupprimer) {\r\n            monTasDeCartesAParser.splice(i, 1);\r\n        }\r\n    }\r\n}\r\n\r\n\r\n/* -------- */\r\n/*\r\nInit game functions\r\n*/\r\nfunction distributeCards(cardsNumbers, player) {\r\n    //var cards = state.board.cards[0];\r\n    var arrCards = [];\r\n    var boardCards = state.board.cards[0];\r\n    for (i = 0; i < cardsNumbers; i++) {\r\n        arrCards.push(boardCards[Math.floor(Math.random() * boardCards.length)])\r\n    }\r\n    console.log('le ', player, ' à ', arrCards.length, ' cartes. Voici la liste: ', arrCards);\r\n\r\n    // je met à jour la liste de mes cartes du jeu (board)\r\n    // en y supprimant les cartes qui viennent d'être distribuées au joueur \r\n    updateStateCardBoard(arrCards, boardCards);\r\n\r\n    //je met à jour le tableau des cartes du joueur \r\n    state[player].cards.push(arrCards);\r\n    return arrCards;\r\n}\r\n\r\nfunction initCardOnBoard(numberCard) {\r\n\r\n    //je prend le tas de cartes du board et j'en affiche le nombre que je désire\r\n    var cardsBoard = state.board.cards[0];\r\n    var newArr = [];\r\n\r\n    for (var i = 0; i < numberCard; i++) {\r\n        newArr.push(cardsBoard[i]);\r\n    }\r\n\r\n    //je met à jour le nombre de cartes dans le jeu\r\n    updateStateCardBoard(newArr, cardsBoard) //=> PAS LA BONNE VALEUR !!\r\n\r\n    return newArr;\r\n}\r\n\r\n//fonction qui affiches les cartes dans l'ihm\r\nfunction renderCards(cards, locationHTML) {\r\n    var newArr = [];\r\n    var index = 0;\r\n    var newCard = null;\r\n    cards.forEach(function(card) {\r\n        var numberCard = card.split('', 1) + '';\r\n        var cardColor = card.slice(1);\r\n        index++;\r\n        newCard = '<a href=\"#\"><div class=\"card card-' + cardColor + '\" id=\"card-' + index + '\">' + '<span class=\"card-number\">' + numberCard + '</span>' + '</div></a>';\r\n        newArr.push(newCard)\r\n    })\r\n\r\n    newArr.map(function(item) {\r\n        index++;\r\n        locationHTML.innerHTML += item;\r\n    })\r\n}\r\n\r\n\r\nfunction initCardPioche(cards) {\r\n    renderCards(cards, )\r\n    state.pioche.cards = cards;\r\n    return cards;\r\n}\r\n\r\n/* -------- */\r\n/*\r\nGame Tour function\r\n*/\r\n/*  \r\n            playCard(player, state[player].cards)\r\n            function playCard(player, card) {\r\n                removeCard(state[player].cards, card) //je supprime la carte cliquée du tas de cartes du joueur \r\n                state.board.cards.push(card) // je la rajoute au tas de cartes du board\r\n                updatePioche()\r\n                updateCardBoard()\r\n            }\r\n*/\r\n\r\nfunction gameTour(player) {\r\n    //je met à jour le state du joueur à qui c'est le tour\r\n    state.turn = player;\r\n\r\n    //je place un event listener sur la div parent des cartes\r\n    $('.zone-player-bottom').addEventListener('click', cardClick, false);\r\n\r\n    function cardClick(e) {\r\n        var element = e.target;\r\n        //placer un data-attribut sur chaque carte générer\r\n\r\n        //je vérifie un tas de règle avant de décider si je peux jouer \r\n        // if (...) => \r\n        //playCard('player1', 2)\r\n        //playCard(player, state[player].cards)\r\n\r\n        //je ne peux pas jouer  \r\n        // else \r\n        /*\r\n            function cannotPlay(player, card) {\r\n                \r\n            }\r\n        */\r\n    }\r\n}\r\n\r\nif ('toutuntasdetests') {\r\n    //playCard('player1', 2)\r\n}\r\n\r\n\r\n\r\n\r\nwindow.onload = function() {\r\n    //je mélange mes 76 cartes \r\n    shuffle(cardsGame());\r\n\r\n    //je distribue 7 cartes au joueur 1\r\n    distributeCards(7, \"player1\");\r\n    //j'affiches mes cartes sur l'ihm\r\n    renderCards(state.player1.cards[0], player1ZoneHTML);\r\n    //état de mon store \r\n    console.log('il me reste ', state.board.cards[0].length, ' après la distribution du player 1 sur la table à jouer');\r\n\r\n    //je distribue 7 cartes au joueur 2\r\n    distributeCards(7, \"player2\");\r\n    //état de mon store \r\n    console.log('il me reste ', state.board.cards[0].length, ' après la distribution du player2 sur la table à jouer');\r\n\r\n    //état de mon store \r\n    console.log('il me reste ', state.board.cards[0].length, 'sur la table à jouer');\r\n\r\n    //j'init une carte au hasard sur le board pour démarrer le jeu : il s'agit de la pile \"cartes à jouer\"\r\n    initCardOnBoard(1);\r\n    console.log('j\\'ai ', initCardOnBoard(1).length, ' carte dans la pile \"cartes à jouer\" ');\r\n    //état de mon store \r\n    console.log('il me reste ', state.board.cards[0].length, ' cartes sur la table à jouer');\r\n\r\n    //j'init la pile de cartes de la pioche = reste des cartes du board\r\n    initCardPioche(state.board.cards[0])\r\n    console.log('j\\'ai ', initCardPioche(state.board.cards[0].length), ' de cartes dans la pioche')\r\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvbWFpbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9tYWluLmpzPzkyOTEiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGNhcmRzR2FtZSA9IHJlcXVpcmUoJy4vdXRpbHMvZ2V0LWNhcmQuanMnKTtcclxudmFyIHBsYXllcjFab25lSFRNTCA9ICQoXCJkaXZbZGF0YS1wbGF5ZXI9J3BsYXllcjEnXVwiKVswXTtcclxudmFyIHBsYXllcjJab25lSFRNTCA9ICQoXCJkaXZbZGF0YS1wbGF5ZXI9J3BsYXllcjInXVwiKVswXTtcclxudmFyIHBsYXllZExvY2F0aW9uID0gJChcIi5jYXJkLXBsYXllZFwiKVxyXG5cclxuY29uc3Qgc3RhdGUgPSB7XHJcbiAgICBwbGF5ZXIxOiB7XHJcbiAgICAgICAgY2FyZHM6IFtdXHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXllcjI6IHtcclxuICAgICAgICBjYXJkczogW11cclxuICAgIH0sXHJcblxyXG4gICAgYm9hcmQ6IHtcclxuICAgICAgICBjYXJkczogW10gLy9jYXJ0ZXMgdG90YWxlcyBkZSBtb24gamV1XHJcbiAgICB9LFxyXG5cclxuICAgIHBpb2NoZToge1xyXG4gICAgICAgIGNhcmRzOiBbXVxyXG4gICAgfSxcclxuXHJcbiAgICB0dXJuOiAnJyxcclxufVxyXG5cclxuXHJcblxyXG4vKiAtLS0tLS0tLSAqL1xyXG4vKlxyXG5GdW5jdGlvbnMgdXRpbHNcclxuKi9cclxuZnVuY3Rpb24gc2h1ZmZsZShjYXJkcykge1xyXG4gICAgdmFyIGFyckNhcmRzID0gW107XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgY2FyZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBhcnJDYXJkcy5wdXNoKGNhcmRzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNhcmRzLmxlbmd0aCldKVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coJ3ZvaWNpIGxhIGxpc3RlIGRlcyAnLCBhcnJDYXJkcy5sZW5ndGgsICcgY2FydGVzIG3DqWxhbmfDqWVzIDogJywgYXJyQ2FyZHMpO1xyXG4gICAgLy9qZSBtZXQgw6Agam91ciBsYSBsaXN0ZSBkZSBtZXMgY2FydGVzIHF1aSBzZSB0cm91dmVudCBzdXIgbGEgdGFibGVcclxuICAgIHN0YXRlLmJvYXJkLmNhcmRzLnB1c2goYXJyQ2FyZHMpO1xyXG4gICAgcmV0dXJuIGFyckNhcmRzO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTdGF0ZUNhcmRCb2FyZChjYXJkcywgYXJyQ2FyZEJvYXJkKSB7XHJcbiAgICB2YXIgaW5kZXg7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhcmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaW5kZXggPSBhcnJDYXJkQm9hcmQuaW5kZXhPZihhcnJDYXJkQm9hcmRbaV0pO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIGFyckNhcmRCb2FyZC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlQ2FyZChtb25UYXNEZUNhcnRlc0FQYXJzZXIsIGxhQ2FydGVBU3VwcHJpbWVyKSB7XHJcbiAgICAvL3JlbW92ZUNhcmQoc3RhdGVbcGxheWVyXS5jYXJkcywgY2FyZClcclxuICAgIGZvciAodmFyIGkgPSBtb25UYXNEZUNhcnRlc0FQYXJzZXIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICBpZiAobW9uVGFzRGVDYXJ0ZXNBUGFyc2VyW2ldID09PSBsYUNhcnRlQVN1cHByaW1lcikge1xyXG4gICAgICAgICAgICBtb25UYXNEZUNhcnRlc0FQYXJzZXIuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qIC0tLS0tLS0tICovXHJcbi8qXHJcbkluaXQgZ2FtZSBmdW5jdGlvbnNcclxuKi9cclxuZnVuY3Rpb24gZGlzdHJpYnV0ZUNhcmRzKGNhcmRzTnVtYmVycywgcGxheWVyKSB7XHJcbiAgICAvL3ZhciBjYXJkcyA9IHN0YXRlLmJvYXJkLmNhcmRzWzBdO1xyXG4gICAgdmFyIGFyckNhcmRzID0gW107XHJcbiAgICB2YXIgYm9hcmRDYXJkcyA9IHN0YXRlLmJvYXJkLmNhcmRzWzBdO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGNhcmRzTnVtYmVyczsgaSsrKSB7XHJcbiAgICAgICAgYXJyQ2FyZHMucHVzaChib2FyZENhcmRzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkQ2FyZHMubGVuZ3RoKV0pXHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZygnbGUgJywgcGxheWVyLCAnIMOgICcsIGFyckNhcmRzLmxlbmd0aCwgJyBjYXJ0ZXMuIFZvaWNpIGxhIGxpc3RlOiAnLCBhcnJDYXJkcyk7XHJcblxyXG4gICAgLy8gamUgbWV0IMOgIGpvdXIgbGEgbGlzdGUgZGUgbWVzIGNhcnRlcyBkdSBqZXUgKGJvYXJkKVxyXG4gICAgLy8gZW4geSBzdXBwcmltYW50IGxlcyBjYXJ0ZXMgcXVpIHZpZW5uZW50IGQnw6p0cmUgZGlzdHJpYnXDqWVzIGF1IGpvdWV1ciBcclxuICAgIHVwZGF0ZVN0YXRlQ2FyZEJvYXJkKGFyckNhcmRzLCBib2FyZENhcmRzKTtcclxuXHJcbiAgICAvL2plIG1ldCDDoCBqb3VyIGxlIHRhYmxlYXUgZGVzIGNhcnRlcyBkdSBqb3VldXIgXHJcbiAgICBzdGF0ZVtwbGF5ZXJdLmNhcmRzLnB1c2goYXJyQ2FyZHMpO1xyXG4gICAgcmV0dXJuIGFyckNhcmRzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0Q2FyZE9uQm9hcmQobnVtYmVyQ2FyZCkge1xyXG5cclxuICAgIC8vamUgcHJlbmQgbGUgdGFzIGRlIGNhcnRlcyBkdSBib2FyZCBldCBqJ2VuIGFmZmljaGUgbGUgbm9tYnJlIHF1ZSBqZSBkw6lzaXJlXHJcbiAgICB2YXIgY2FyZHNCb2FyZCA9IHN0YXRlLmJvYXJkLmNhcmRzWzBdO1xyXG4gICAgdmFyIG5ld0FyciA9IFtdO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyQ2FyZDsgaSsrKSB7XHJcbiAgICAgICAgbmV3QXJyLnB1c2goY2FyZHNCb2FyZFtpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9qZSBtZXQgw6Agam91ciBsZSBub21icmUgZGUgY2FydGVzIGRhbnMgbGUgamV1XHJcbiAgICB1cGRhdGVTdGF0ZUNhcmRCb2FyZChuZXdBcnIsIGNhcmRzQm9hcmQpIC8vPT4gUEFTIExBIEJPTk5FIFZBTEVVUiAhIVxyXG5cclxuICAgIHJldHVybiBuZXdBcnI7XHJcbn1cclxuXHJcbi8vZm9uY3Rpb24gcXVpIGFmZmljaGVzIGxlcyBjYXJ0ZXMgZGFucyBsJ2lobVxyXG5mdW5jdGlvbiByZW5kZXJDYXJkcyhjYXJkcywgbG9jYXRpb25IVE1MKSB7XHJcbiAgICB2YXIgbmV3QXJyID0gW107XHJcbiAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgdmFyIG5ld0NhcmQgPSBudWxsO1xyXG4gICAgY2FyZHMuZm9yRWFjaChmdW5jdGlvbihjYXJkKSB7XHJcbiAgICAgICAgdmFyIG51bWJlckNhcmQgPSBjYXJkLnNwbGl0KCcnLCAxKSArICcnO1xyXG4gICAgICAgIHZhciBjYXJkQ29sb3IgPSBjYXJkLnNsaWNlKDEpO1xyXG4gICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgbmV3Q2FyZCA9ICc8YSBocmVmPVwiI1wiPjxkaXYgY2xhc3M9XCJjYXJkIGNhcmQtJyArIGNhcmRDb2xvciArICdcIiBpZD1cImNhcmQtJyArIGluZGV4ICsgJ1wiPicgKyAnPHNwYW4gY2xhc3M9XCJjYXJkLW51bWJlclwiPicgKyBudW1iZXJDYXJkICsgJzwvc3Bhbj4nICsgJzwvZGl2PjwvYT4nO1xyXG4gICAgICAgIG5ld0Fyci5wdXNoKG5ld0NhcmQpXHJcbiAgICB9KVxyXG5cclxuICAgIG5ld0Fyci5tYXAoZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgbG9jYXRpb25IVE1MLmlubmVySFRNTCArPSBpdGVtO1xyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGluaXRDYXJkUGlvY2hlKGNhcmRzKSB7XHJcbiAgICByZW5kZXJDYXJkcyhjYXJkcywgKVxyXG4gICAgc3RhdGUucGlvY2hlLmNhcmRzID0gY2FyZHM7XHJcbiAgICByZXR1cm4gY2FyZHM7XHJcbn1cclxuXHJcbi8qIC0tLS0tLS0tICovXHJcbi8qXHJcbkdhbWUgVG91ciBmdW5jdGlvblxyXG4qL1xyXG4vKiAgXHJcbiAgICAgICAgICAgIHBsYXlDYXJkKHBsYXllciwgc3RhdGVbcGxheWVyXS5jYXJkcylcclxuICAgICAgICAgICAgZnVuY3Rpb24gcGxheUNhcmQocGxheWVyLCBjYXJkKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDYXJkKHN0YXRlW3BsYXllcl0uY2FyZHMsIGNhcmQpIC8vamUgc3VwcHJpbWUgbGEgY2FydGUgY2xpcXXDqWUgZHUgdGFzIGRlIGNhcnRlcyBkdSBqb3VldXIgXHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5ib2FyZC5jYXJkcy5wdXNoKGNhcmQpIC8vIGplIGxhIHJham91dGUgYXUgdGFzIGRlIGNhcnRlcyBkdSBib2FyZFxyXG4gICAgICAgICAgICAgICAgdXBkYXRlUGlvY2hlKClcclxuICAgICAgICAgICAgICAgIHVwZGF0ZUNhcmRCb2FyZCgpXHJcbiAgICAgICAgICAgIH1cclxuKi9cclxuXHJcbmZ1bmN0aW9uIGdhbWVUb3VyKHBsYXllcikge1xyXG4gICAgLy9qZSBtZXQgw6Agam91ciBsZSBzdGF0ZSBkdSBqb3VldXIgw6AgcXVpIGMnZXN0IGxlIHRvdXJcclxuICAgIHN0YXRlLnR1cm4gPSBwbGF5ZXI7XHJcblxyXG4gICAgLy9qZSBwbGFjZSB1biBldmVudCBsaXN0ZW5lciBzdXIgbGEgZGl2IHBhcmVudCBkZXMgY2FydGVzXHJcbiAgICAkKCcuem9uZS1wbGF5ZXItYm90dG9tJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjYXJkQ2xpY2ssIGZhbHNlKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjYXJkQ2xpY2soZSkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgLy9wbGFjZXIgdW4gZGF0YS1hdHRyaWJ1dCBzdXIgY2hhcXVlIGNhcnRlIGfDqW7DqXJlclxyXG5cclxuICAgICAgICAvL2plIHbDqXJpZmllIHVuIHRhcyBkZSByw6hnbGUgYXZhbnQgZGUgZMOpY2lkZXIgc2kgamUgcGV1eCBqb3VlciBcclxuICAgICAgICAvLyBpZiAoLi4uKSA9PiBcclxuICAgICAgICAvL3BsYXlDYXJkKCdwbGF5ZXIxJywgMilcclxuICAgICAgICAvL3BsYXlDYXJkKHBsYXllciwgc3RhdGVbcGxheWVyXS5jYXJkcylcclxuXHJcbiAgICAgICAgLy9qZSBuZSBwZXV4IHBhcyBqb3VlciAgXHJcbiAgICAgICAgLy8gZWxzZSBcclxuICAgICAgICAvKlxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjYW5ub3RQbGF5KHBsYXllciwgY2FyZCkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAqL1xyXG4gICAgfVxyXG59XHJcblxyXG5pZiAoJ3RvdXR1bnRhc2RldGVzdHMnKSB7XHJcbiAgICAvL3BsYXlDYXJkKCdwbGF5ZXIxJywgMilcclxufVxyXG5cclxuXHJcblxyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgLy9qZSBtw6lsYW5nZSBtZXMgNzYgY2FydGVzIFxyXG4gICAgc2h1ZmZsZShjYXJkc0dhbWUoKSk7XHJcblxyXG4gICAgLy9qZSBkaXN0cmlidWUgNyBjYXJ0ZXMgYXUgam91ZXVyIDFcclxuICAgIGRpc3RyaWJ1dGVDYXJkcyg3LCBcInBsYXllcjFcIik7XHJcbiAgICAvL2onYWZmaWNoZXMgbWVzIGNhcnRlcyBzdXIgbCdpaG1cclxuICAgIHJlbmRlckNhcmRzKHN0YXRlLnBsYXllcjEuY2FyZHNbMF0sIHBsYXllcjFab25lSFRNTCk7XHJcbiAgICAvL8OpdGF0IGRlIG1vbiBzdG9yZSBcclxuICAgIGNvbnNvbGUubG9nKCdpbCBtZSByZXN0ZSAnLCBzdGF0ZS5ib2FyZC5jYXJkc1swXS5sZW5ndGgsICcgYXByw6hzIGxhIGRpc3RyaWJ1dGlvbiBkdSBwbGF5ZXIgMSBzdXIgbGEgdGFibGUgw6Agam91ZXInKTtcclxuXHJcbiAgICAvL2plIGRpc3RyaWJ1ZSA3IGNhcnRlcyBhdSBqb3VldXIgMlxyXG4gICAgZGlzdHJpYnV0ZUNhcmRzKDcsIFwicGxheWVyMlwiKTtcclxuICAgIC8vw6l0YXQgZGUgbW9uIHN0b3JlIFxyXG4gICAgY29uc29sZS5sb2coJ2lsIG1lIHJlc3RlICcsIHN0YXRlLmJvYXJkLmNhcmRzWzBdLmxlbmd0aCwgJyBhcHLDqHMgbGEgZGlzdHJpYnV0aW9uIGR1IHBsYXllcjIgc3VyIGxhIHRhYmxlIMOgIGpvdWVyJyk7XHJcblxyXG4gICAgLy/DqXRhdCBkZSBtb24gc3RvcmUgXHJcbiAgICBjb25zb2xlLmxvZygnaWwgbWUgcmVzdGUgJywgc3RhdGUuYm9hcmQuY2FyZHNbMF0ubGVuZ3RoLCAnc3VyIGxhIHRhYmxlIMOgIGpvdWVyJyk7XHJcblxyXG4gICAgLy9qJ2luaXQgdW5lIGNhcnRlIGF1IGhhc2FyZCBzdXIgbGUgYm9hcmQgcG91ciBkw6ltYXJyZXIgbGUgamV1IDogaWwgcydhZ2l0IGRlIGxhIHBpbGUgXCJjYXJ0ZXMgw6Agam91ZXJcIlxyXG4gICAgaW5pdENhcmRPbkJvYXJkKDEpO1xyXG4gICAgY29uc29sZS5sb2coJ2pcXCdhaSAnLCBpbml0Q2FyZE9uQm9hcmQoMSkubGVuZ3RoLCAnIGNhcnRlIGRhbnMgbGEgcGlsZSBcImNhcnRlcyDDoCBqb3VlclwiICcpO1xyXG4gICAgLy/DqXRhdCBkZSBtb24gc3RvcmUgXHJcbiAgICBjb25zb2xlLmxvZygnaWwgbWUgcmVzdGUgJywgc3RhdGUuYm9hcmQuY2FyZHNbMF0ubGVuZ3RoLCAnIGNhcnRlcyBzdXIgbGEgdGFibGUgw6Agam91ZXInKTtcclxuXHJcbiAgICAvL2onaW5pdCBsYSBwaWxlIGRlIGNhcnRlcyBkZSBsYSBwaW9jaGUgPSByZXN0ZSBkZXMgY2FydGVzIGR1IGJvYXJkXHJcbiAgICBpbml0Q2FyZFBpb2NoZShzdGF0ZS5ib2FyZC5jYXJkc1swXSlcclxuICAgIGNvbnNvbGUubG9nKCdqXFwnYWkgJywgaW5pdENhcmRQaW9jaGUoc3RhdGUuYm9hcmQuY2FyZHNbMF0ubGVuZ3RoKSwgJyBkZSBjYXJ0ZXMgZGFucyBsYSBwaW9jaGUnKVxyXG59Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/main.js\n");

/***/ }),

/***/ "./src/js/utils/get-card.js":
/*!**********************************!*\
  !*** ./src/js/utils/get-card.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//function qui génère des cartes\r\n/*var cardValue = [\r\n    '0ROSE', '1ROSE', '2ROSE', '3ROSE', '4ROSE', '5ROSE', '6ROSE', '7ROSE', '8ROSE', '9ROSE',\r\n    '0ROUGE', '1ROUGE', '2ROUGE', '3ROUGE', '4ROUGE', '5ROUGE', '6ROUGE', '7ROUGE', '8ROUGE', '9ROUGE',\r\n    '0BLEU', '1BLEU', '2BLEU', '3BLEU', '4BLEU', '5BLEU', '6BLEU', '7BLEU', '8BLEU', '9BLEU',\r\n    '0VIOLET', '1VIOLET', '2VIOLET', '3VIOLET', '4VIOLET', '5VIOLET', '6VIOLET', '7VIOLET', '8VIOLET', '9VIOLET'\r\n];\r\n\r\nfunction getCard() {\r\n    var cards = [];\r\n    for (i = 0; i < cardValue.length; i++) {\r\n        cards.push(cardValue[Math.floor(Math.random() * cardValue.length)])\r\n    }\r\n    return cards;\r\n}\r\n\r\nmodule.exports = getCard;\r\n*/\r\n\r\n//fonction qui génère dans un tableau mes 76 cartes avec leurs exceptions\r\nfunction generateCard() {\r\n    var colorCard = ['ROSE', 'ROUGE', 'BLEU', 'VIOLET'];\r\n    var arrCard = [];\r\n\r\n    colorCard.map(function(color) {\r\n        var arr = new Array(9);\r\n        for (var i = 0; i < arr.length + 1; i++) {\r\n            var card = (i + color);\r\n            //var result = i === 0 ? arrCard.push(card) : arrCard.push(card, card);\r\n            if (i === 0) {\r\n                arrCard.push(card)\r\n            } else {\r\n                arrCard.push(card, card)\r\n            }\r\n        }\r\n    })\r\n    return arrCard;\r\n}\r\n\r\nmodule.exports = generateCard;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvdXRpbHMvZ2V0LWNhcmQuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvZ2V0LWNhcmQuanM/MDZhMSJdLCJzb3VyY2VzQ29udGVudCI6WyIvL2Z1bmN0aW9uIHF1aSBnw6luw6hyZSBkZXMgY2FydGVzXHJcbi8qdmFyIGNhcmRWYWx1ZSA9IFtcclxuICAgICcwUk9TRScsICcxUk9TRScsICcyUk9TRScsICczUk9TRScsICc0Uk9TRScsICc1Uk9TRScsICc2Uk9TRScsICc3Uk9TRScsICc4Uk9TRScsICc5Uk9TRScsXHJcbiAgICAnMFJPVUdFJywgJzFST1VHRScsICcyUk9VR0UnLCAnM1JPVUdFJywgJzRST1VHRScsICc1Uk9VR0UnLCAnNlJPVUdFJywgJzdST1VHRScsICc4Uk9VR0UnLCAnOVJPVUdFJyxcclxuICAgICcwQkxFVScsICcxQkxFVScsICcyQkxFVScsICczQkxFVScsICc0QkxFVScsICc1QkxFVScsICc2QkxFVScsICc3QkxFVScsICc4QkxFVScsICc5QkxFVScsXHJcbiAgICAnMFZJT0xFVCcsICcxVklPTEVUJywgJzJWSU9MRVQnLCAnM1ZJT0xFVCcsICc0VklPTEVUJywgJzVWSU9MRVQnLCAnNlZJT0xFVCcsICc3VklPTEVUJywgJzhWSU9MRVQnLCAnOVZJT0xFVCdcclxuXTtcclxuXHJcbmZ1bmN0aW9uIGdldENhcmQoKSB7XHJcbiAgICB2YXIgY2FyZHMgPSBbXTtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBjYXJkVmFsdWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjYXJkcy5wdXNoKGNhcmRWYWx1ZVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjYXJkVmFsdWUubGVuZ3RoKV0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2FyZHM7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2V0Q2FyZDtcclxuKi9cclxuXHJcbi8vZm9uY3Rpb24gcXVpIGfDqW7DqHJlIGRhbnMgdW4gdGFibGVhdSBtZXMgNzYgY2FydGVzIGF2ZWMgbGV1cnMgZXhjZXB0aW9uc1xyXG5mdW5jdGlvbiBnZW5lcmF0ZUNhcmQoKSB7XHJcbiAgICB2YXIgY29sb3JDYXJkID0gWydST1NFJywgJ1JPVUdFJywgJ0JMRVUnLCAnVklPTEVUJ107XHJcbiAgICB2YXIgYXJyQ2FyZCA9IFtdO1xyXG5cclxuICAgIGNvbG9yQ2FyZC5tYXAoZnVuY3Rpb24oY29sb3IpIHtcclxuICAgICAgICB2YXIgYXJyID0gbmV3IEFycmF5KDkpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aCArIDE7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY2FyZCA9IChpICsgY29sb3IpO1xyXG4gICAgICAgICAgICAvL3ZhciByZXN1bHQgPSBpID09PSAwID8gYXJyQ2FyZC5wdXNoKGNhcmQpIDogYXJyQ2FyZC5wdXNoKGNhcmQsIGNhcmQpO1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgYXJyQ2FyZC5wdXNoKGNhcmQpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhcnJDYXJkLnB1c2goY2FyZCwgY2FyZClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gYXJyQ2FyZDtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZUNhcmQ7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/utils/get-card.js\n");

/***/ })

/******/ });