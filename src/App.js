import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [books, setBooks] = useState([]);
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		// **** feth data using asyncronious function ****
		// async function fetchData() {
		// 	const resp = await fetch("https://www.googleapis.com/books/v1/volumes?q=harry+potter");
		// 	const jsonData = await resp.json();
		// 	setBooks(jsonData.items.map((i, ind) => i.volumeInfo.title));
		// }
		// fetchData();
		// fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchText}`)
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		setBooks(data.items.map((i) => i.volumeInfo));
		// 		// console.log(books);
		// 		// books.map((i,ind) => (console.log(i)));
		// 	});
	}, []);

	function searchButton() {
		fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchText}`)
			.then((response) => response.json())
			.then((data) => {
				setBooks(
					data.items.map((i) => {
						const volumeInfo = { ...i.volumeInfo };
						if (volumeInfo.imageLinks === undefined) {
							volumeInfo.imageLinks = { smallThumbnail: "replacement.png" };
						}
						return volumeInfo;
					})
				);
				// setBooks(data.items.map((i) => i.volumeInfo));
				// console.log(books);
				// books.map((i, ind) => console.log(i));
			});
	}

	function handleChange(event) {
		setSearchText(event.target.value);
	}
	return (
		// <div className="container">
		<div>
			<div className="App-header">Search Google Books Online</div>
			<div className="search-books">
				<label>
					Search criteria :
					<input
						className="searchBook"
						placeholder="Type book title, author, description..."
						type="text"
						value={searchText}
						name="searchbook"
						onChange={handleChange}
					/>
				</label>
				<button className="button" onClick={() => searchButton()}>
					Search
				</button>
			</div>
			<div className="bookList">
				{books.map((book, ind) => (
					<div key={ind} className="bookitem">
						<br></br>
						<h5>Name of the book: {book.title}</h5>
						<p>
							<br></br>
							<img
								src={book.imageLinks.smallThumbnail}
								alt="book descriptions"
								className="bookimage"></img>
							Authors :{book.authors}
							<br></br>
							Publishers:
							{book.publisher}
							<br></br>
							Publication date:
							{book.publishedDate}
							<br></br>
						</p>
						<p className="bookdescription">
							Book description: {book.description}
							<br></br>
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
