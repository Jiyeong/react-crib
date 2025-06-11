'use client'
import {useState} from "react";
/*
* 틱택토(Tic Tac Toe) 게임 (https://ko.react.dev/learn/tutorial-tic-tac-toe)
*
* [basic]
* 틱택토를 플레이 할 수 있다
* 플레이어가 게임에서 이겼을 때를 표시한다
* 게임이 진행됨에 따라 히스토리를 저장한다
* 플레이어가 게임 히스토리를 검토하고 게임 보드의 이전 버전을 볼 수 있다.
*
* [additional]
* 게임 리셋 기능 추가
* 승자 없이 게임이 끝난 경우에 대한 처리 추가
* */

// 3X3 개별 칸 component
function Square ({ value, onSquareClick }) {
  return (
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
  )
}
// 3x3 전체 게임 판, 실제 게임 로직
function Board({ xIsNext, squares, onPlay }) {
  // const [xIsNext, setXIsNext] = useState(true)
  // const [squares, setSquares] = useState(Array(9).fill(null)) // 원본
  // 표시
  const winner = calculateWinner(squares) // 승자 여부 체크
  let status // 현재 게임 진행 상태
  if (winner) {
    status = "Winner: " + winner
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O")
  }

  // 칸 클릭 로직
  function handleClick(i) {
    // 해당 영역에 클릭이 되어있는지 or 이긴 사람이 있는지
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    const nextSquares = squares.slice() // 사본 / 불변성. 배열의 사본을 만들어서 사용
    nextSquares[i] = xIsNext ? "X" : "O"
    onPlay(nextSquares)
    // setSquares(nextSquares)
    // setXIsNext(!xIsNext)
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

export default function Game() {
  // const [xIsNext, setXIsNext] = useState(true)
  const [history, setHistory] = useState([Array(9).fill(null)]) // 원본
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove] // 현재 선택한 동작 읽기
  // const currentSquares = history[history.length - 1] // 마지막 배열 읽기

  // 칸 클릭 액션으로 게임 진행시 히스토리 추가
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory) // ... 은 history 의 모든 항목 열거.
    setCurrentMove(nextHistory.length - 1)
    // setXIsNext(!xIsNext)
  }
  // 히스토리 목록에서 선택한 시점으로 이동
  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
    // setXIsNext(nextMove % 2 === 0)
  }
  const moves = history.map((squares, move) => {
    let description
    if (move > 0) {
      description = 'Go to move #' + move
    } else {
      description = 'Go to game start'
    }
    return (
        <li key={move}>
          <button className="btn btn1" onClick={() => jumpTo(move)}>{description}</button>
        </li>
    )
  })
  return (
      <>
        <div className="game">
          <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          </div>
          <div className="game-info">
            <ol>{moves}</ol>
          </div>
        </div>
      </>
  )
}
// 이긴 사람 있는지 확인
function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
