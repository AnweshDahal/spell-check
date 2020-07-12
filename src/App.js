import React, { useState, useEffect } from "react";
import "./style/App.css";
import Header from "./Header";

function App() {
	// States
	const [correction, setCorrection] = useState();
	const [search, setSearch] = useState();
	const [query, setQuery] = useState("");
	const [apiCorrections, setAPICorrections] = useState();

	const updateSearch = (e) => {
		setSearch(e.target.value);
	};

	const updateQuery = (e) => {
		e.preventDefault();
		setQuery(search);
		console.log("Updated");
	};

	useEffect(() => {
		fetchWord();
	}, [query]);

	// Internal Functions
	const fetchWord = async () => {
		const response = await fetch(
			`https://montanaflynn-spellcheck.p.rapidapi.com/check/?text=${query}`,
			{
				method: "GET",
				headers: {
					"x-rapidapi-host": "montanaflynn-spellcheck.p.rapidapi.com",
					"x-rapidapi-key":
						"2446f6e999msh87b27456c75e4f5p196058jsnf74efa6a255c",
				},
			}
		);
		const data = await response.json();
		setCorrection(data.suggestion);

		const correction = data.corrections;
		let corrections = [];
		for (const property in correction) {
			corrections.push(correction[property]);
		}

		const correctionList = corrections.map((correction) => (
			<ul key={correction[0][0]} className="correction-group">
				{correction.map((correct) => (
					<li key={correct} className="correction-item">
						{correct}
					</li>
				))}
			</ul>
		));
		setAPICorrections(correctionList);
	};
	return (
		<React.Fragment>
			<Header />
			<div className="body">
				<form className="search" onSubmit={updateQuery}>
					<input
						type="text"
						className="search-bar"
						value={search}
						onChange={updateSearch}
					/>
					<button type="submit" className="btn-submit">
						Search
					</button>
				</form>
				<div className="result">
					<div className="top-suggestion">
						<span className="top-suggestion-title">Top Suggestion: </span>
						<span className="top-suggestion-result">{correction}</span>
					</div>
					<div className="all-suggestion">
						<span className="all-suggestion-title">All Suggestions</span>
						{apiCorrections}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default App;
