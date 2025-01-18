function showGames() {
    console.log("showGames() triggered");  // Debugging statement

    const content = document.getElementById('content');
    content.innerHTML = `
        <div id="game" class="page">
            <h2>Select a Game to Play</h2>
            <div class="game-buttons">
                <!-- Ping Pong Game Card -->
                <div class="game-card">
                    <img src="images/pong.png" alt="Ping Pong" class="game-icon">
                    <button class="game-button" onclick="startPingPong()">Play</button>
                </div>

                <!-- Tic-Tac-Toe Game Card -->
                <div class="game-card">
                    <img src="images/tictactoe.png" alt="Tic Tac Toe" class="game-icon">
                    <button class="game-button" onclick="startTicTacToe()">Play</button>
                </div>
            </div>
        </div>`;
}

// Start the Ping Pong game (called from the button click)
function startPingPong() {
    // Display the Ping Pong game setup
    const content = document.getElementById('content');
    content.innerHTML = `
        	<div id="pingPong" class="page">
						<h2>Two Player Ping Pong</h2>
                        <button id="backButton" class="btn btn-secondary" onclick="showGames()">Back</button>
						<div class="scores">
							<div id="player1Score">Player 1: 0</div>
							<div id="player2Score">Player 2: 0</div>
						</div>
						<div id="pong-game-container">
							<div id="paddle1" class="paddle"></div>
							<div id="paddle2" class="paddle"></div>
							<div id="ball"></div>
						</div>
						<button id="startButton">Start Game</button>
						<div class="instructions">
							<p>Player 1 (Top): Use A and D keys to move</p>
							<p>Player 2 (Bottom): Use ← and → arrow keys to move</p>
						</div>
					</div>`;
			
				// Add the styles
				const pongStyle = document.createElement('style');
				pongStyle.textContent = `
					#pong-game-container {
						position: relative;
						width: 800px;
						height: 500px;
						border: 2px solid #333;
						overflow: hidden;
						background-color: #f0f0f0;
						margin: 20px auto;
					}
			
					.paddle {
						position: absolute;
						width: 100px;
						height: 20px;
						background-color: #4CAF50;
					}
			
					#paddle1 {
						top: 20px;
						left: 350px;
						background-color: #2196F3;
					}
			
					#paddle2 {
						bottom: 20px;
						left: 350px;
						background-color: #FF5722;
					}
			
					#ball {
						position: absolute;
						width: 20px;
						height: 20px;
						background-color: #333;
						border-radius: 50%;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
			
					#startButton {
						display: block;
						margin: 20px auto;
						padding: 10px 20px;
						font-size: 16px;
						cursor: pointer;
					}
			
					.scores {
						display: flex;
						justify-content: center;
						gap: 50px;
						margin: 20px;
						font-size: 24px;
					}
			
					.instructions {
						text-align: center;
						margin: 20px;
					}
				`;
				document.head.appendChild(pongStyle);
			
				// Initialize the game
				initializePingPong();
  
}


// Start the Tic-Tac-Toe game (called from the button click)
function startTicTacToe() {
    const content = document.getElementById('content');
    content.innerHTML = `
       	<div id="gameContainer">
						<h1>Tic-Tac-Toe</h1>
                        <button id="backButton" class="btn btn-secondary" onclick="showGames()">Back</button>
						<table id="ticTacToeBoard">
							<tbody>
								<tr>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							</tbody>
						</table>
						<button id="resetButton">Reset Game</button>
                        
					</div>`;
			
				// Add the styles
				const style = document.createElement('style');
				style.textContent = `
					#gameContainer {
						text-align: center;
						padding: 20px;
					}
			
					#ticTacToeBoard {
						border-collapse: collapse;
						margin: 20px auto;
					}
			
					#ticTacToeBoard td {
						width: 100px;
						height: 100px;
						border: 2px solid #333;
						text-align: center;
						font-size: 2em;
						cursor: pointer;
						background-color: #fff;
					}
			
					#ticTacToeBoard td:hover {
						background-color: #f7f7f7;
					}
			
					#resetButton {
						padding: 10px 20px;
						font-size: 16px;
						cursor: pointer;
						margin-top: 20px;
					}
				`;
				document.head.appendChild(style);
			
				// Initialize the game immediately
				initializeGame();
}
