$(document).ready(function(){
      //alert();

      bcdTicTacToe.doNext();

      $('.card button').on('click', function(){
        bcdTicTacToe.processInput($(this).attr('class'));
      });
    });

    var bcdTicTacToe =
      {
        state: {
          turn:'',
          mode: 0,
          playerSymbol: null,
          computerSymbol: null,

          board: {
            1:'',
            2:'',
            3:'',
            4:'',
            5:'',
            6:'',
            7:'',
            8:'',
            9:''

          },
          message: 'Tic Tac toe!'//duplicate code here with html
          //todo setup an init function to set this from html onLoad
          // or just delete this if i dont end up using it
        },
        updateTurn: function(){

          //hard coded turn order, will update to randomize who goes first/
          if (!this.state.turn) this.state.turn='Player';
          else if (this.state.turn == 'Player') {
            console.log ('this.state.turn = player -> computer');
            this.state.turn = 'Computer';

          }
          else if (this.state.turn=='Computer') {
            console.log ('this.state.turn = computer -> player');
            this.state.turn = 'Player';
          }
          console.log('turn: ' + this.state.turn)


          this.doNext();

        },
        updateMessage: function(newMessage){
          this.state.message = newMessage;
          this.renderMessage();

        },
        renderMessage: function(){
          $('h1').text(this.state.message);
        },


        updateMode: function(newMode){
          if (newMode == 1) this.updateMessage('Player: '+this.state.playerSymbol);
          if (this.state.mode == 0 && newMode == 1){
            this.state.mode = 1;
            this.renderBoard();
            this.updateTurn();


          }
          if (this.state.mode == 1 && newMode == 2){
            this.state.mode = 2;
            if (this.state.winner)this.updateMessage(this.state.winner.toUpperCase() + ' WINS');
            else this.updateMessage('It\'s a tie!');
            this.playAgainButton('show');
            console.log('state.mode 1 -> 2');
            console.log('this.state');
          }

          if (this.state.mode == 2 && newMode == 1){
            console.log('new game');
            this.state.mode = 1;
            this.resetBoard();
            this.playAgainButton('hide');
            delete this.state.winner;
            this.state.turn ='';
            this.renderBoard();
            this.renderMessage();
            this.updateTurn();
          }

        },
        resetBoard: function(){
         for(var i=1; i<10;i++){
           this.state.board[i] = '';
         }

        },
        playAgainButton: function(instruction){
          instruction === 'show' ? $('.play-again').fadeIn('300') : $('.play-again').fadeOut('300');
        },

        processInput: function(squareNum){
          if (this.state.mode == 1 && !this.state.board[squareNum]){

            if (this.state.turn == 'Player') this.state.board[squareNum] = this.state.playerSymbol;
            else if(this.state.turn == 'Computer') this.state.board[squareNum] = this.state.computerSymbol;

            this.renderBoard();
            this.updateTurn();

          //this.computerMove();
          // this.doNext();
          }
          else if (this.state.board[squareNum] == 'X' || this.state.board[squareNum] == 'O' && this.state.turn == 'Computer')this.doNext();
        },

        renderBoard: function(){
          for(var i=1; i<10; i++){
            $('.'+i).text(this.state.board[i]);

          }


        },
        selectCharacter: function(instruction){

          //if the player has selected their character
          //start the game!
          if (this.state.playerSymbol) {
            this.updateMode(1);
            setTimeout(function(){
              $('.modal').slideToggle('100').animate({opacity:0},{queue:false, duration: '100'})
            }, 100);

          }
          if (instruction == 'init')setTimeout( function(){$('.modal').slideToggle('432')}, 1000);

          if (instruction == 'X' || instruction == 'O'){
            this.state.playerSymbol = instruction;
            this.state.playerSymbol == 'X' ? this.state.computerSymbol = 'O' : this.state.computerSymbol ='X';
            this.createLookup();
            this.selectCharacter();
          }
        },
        createLookup: function(){
          this.state.playerSymbol == 'X' ? this.state.X = 'Player' : this.state.O = 'Player';
          this.state.computerSymbol == 'O' ? this.state.O = 'Computer' : this.state.X = 'Computer';
        },
        computerMove: function(){
          console.log('computer Move');
          this.processInput(Math.floor(Math.random() * 9)+1);

          //alert();

        },
        checkWinner: function(){
          console.log('checking winner');
          console.log(this.state);
          var board = this.state.board, i, test;

          test = '';
          for(i = 1; i<=3; i++){
            test+=board[i];
          }
          this.testWinner(test);

          test = '';
          for(i = 4; i<=6; i++){
            test+=board[i];
          }
          this.testWinner(test);

          test = '';
          for(i = 7; i<=9; i++){
            test+=board[i];
          }
          this.testWinner(test);

          test = '';
          for(i = 1; i<=7; i+=3){
            test+=board[i];
          }
          this.testWinner(test);

          test = '';
          for(i = 2; i<=8; i+=3){
            test+=board[i];
          }
          this.testWinner(test);

          test = '';
          for(i = 3; i<=9; i+=3){
            test+=board[i];
          }
          this.testWinner(test);

          test = '';
          for(i = 1; i<=9; i+=4){
            test+=board[i];
          }
          this.testWinner(test);

          test = '';
          for(i = 3; i<=7; i+=2){
            test+=board[i];
          }
          this.testWinner(test);



          console.log(this.state.X);
          console.log(this.state.O);

        },
        testWinner: function(test){
          if (this.state.mode == 1 && test == 'XXX' || test == 'OOO'){
             this.endGame(this.state[test.split('')[0]]);

          }
        },
        notTie: function(){
          for (var i = 1; i < 10; i++){
            if (this.state.board[i] == '')return true;
          }
          return false;
        },
        checkTie: function(){
          if(!this.notTie()){
           this.endGame();
          }
        },
        endGame: function(winner){
          if (winner) this.state.winner = winner;
          this.updateMode(2);

        },


        doNext: function(){
          if (this.state.mode == 0)this.selectCharacter('init');
          if (this.state.mode ==1){
            this.checkWinner();
            this.checkTie();
            if (this.state.turn == 'Computer') this.computerMove();
            // else if (this.state.turn == 'Player') setTimeout(this.doNext(), 1000);


          }




        },



      }