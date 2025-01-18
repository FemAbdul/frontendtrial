function initializeGame() {
    const board = document.getElementById('ticTacToeBoard');
    const cells = board.getElementsByTagName('td');
    const resetButton = document.getElementById('resetButton');
    let currentPlayer = 'X';
    let gameActive = true;

    // Clear any existing content and listeners
    Array.from(cells).forEach(cell => {
        cell.textContent = '';
        cell.onclick = handleCellClick;
    });

    function handleCellClick(e) {
        const cell = e.target;
        
        // Check if the cell is empty and game is active
        if (cell.textContent !== '' || !gameActive) {
            return;
        }

        // Make the move
        cell.textContent = currentPlayer;
        cell.style.color = currentPlayer === 'X' ? '#4CAF50' : '#FF5722';

        // Check for win
        if (checkWin()) {
            setTimeout(() => {
                alert(`Player ${currentPlayer} wins!`);
                gameActive = false;
            }, 100);
            return;
        }

        // Check for draw
        if (Array.from(cells).every(cell => cell.textContent !== '')) {
            setTimeout(() => {
                alert("It's a draw!");
                gameActive = false;
            }, 100);
            return;
        }

        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWin() {
        const winPatterns = [
            [0,1,2], [3,4,5], [6,7,8], // rows
            [0,3,6], [1,4,7], [2,5,8], // columns
            [0,4,8], [2,4,6]           // diagonals
        ];

        return winPatterns.some(pattern => {
            const values = pattern.map(index => {
                const row = Math.floor(index / 3);
                const col = index % 3;
                return cells[row * 3 + col].textContent;
            });
            return values[0] !== '' && 
                   values[0] === values[1] && 
                   values[1] === values[2];
        });
    }

    // Reset button functionality
    resetButton.onclick = () => {
        Array.from(cells).forEach(cell => {
            cell.textContent = '';
            cell.style.color = '';
        });
        currentPlayer = 'X';
        gameActive = true;
    };
}