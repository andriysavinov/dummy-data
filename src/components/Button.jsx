import React from 'react';
import { faker } from '@faker-js/faker';

async function handleClick() {
	const newTitles = [];
	const newCredits = [];
	const ageCertifications = [
		'G',
		'PG',
		'PG-13',
		'R',
		'NC-17',
		'U',
		'U/A',
		'A',
		'S',
		'AL',
		'6',
		'9',
		'12',
		'12A',
		'15',
		'18',
		'18R',
		'R18',
		'R21',
		'M',
		'MA15+',
		'R16',
		'R18+',
		'X18',
		'T',
		'E',
		'E10+',
		'EC',
		'C',
		'CA',
		'GP',
		'M/PG',
		'TV-Y',
		'TV-Y7',
		'TV-G',
		'TV-PG',
		'TV-14',
		'TV-MA',
	];
	const roles = [
		'Director',
		'Producer',
		'Screenwriter',
		'Actor',
		'Actress',
		'Cinematographer',
		'Film Editor',
		'Production Designer',
		'Costume Designer',
		'Music Composer',
	];

	// Generate positive cases...
	for (let i = 1; i <= 90; i++) {
		const title = {
			id: i,
			title: faker.lorem.words(3),
			description: faker.lorem.sentences(2),
			release_year: faker.date
				.between({ from: new Date('1900-01-01'), to: new Date() })
				.getFullYear(),
			age_certification:
				ageCertifications[
					Math.floor(Math.random() * ageCertifications.length)
				],
			runtime: Math.floor(Math.random() * 200) + 80,
			genres: Array.from({ length: 3 }, () => faker.music.genre()),
			production_country: faker.location.country(),
			seasons: Math.floor(Math.random() * 10),
		};
		newTitles.push(title);

		for (let j = 0; j < 5; j++) {
			newCredits.push({
				id: i * 10 + j,
				title_id: i,
				real_name: faker.person.lastName(),
				character_name: faker.lorem.words(2),
				role: roles[Math.floor(Math.random() * roles.length)],
			});
		}
	}

	// Generate negative cases...
	for (let i = 91; i <= 105; i++) {
		newTitles.push({
			id: i,
			title: '',
			description: '',
			release_year: '',
			age_certification: '',
			runtime: '',
			genres: '',
			production_country: '',
			seasons: '',
		});

		newCredits.push({
			id: i * 10,
			title_id: i * 1000,
			real_name: '',
			character_name: '',
			role: '',
		});
	}

	// Generate edge cases...
	const edgeCaseTitle = {
		id: 106,
		title: 'A'.repeat(255),
		description: 'A'.repeat(1000),
		release_year: 1895,
		age_certification: 'G',
		runtime: 1,
		genres: Array.from({ length: 3 }, () => 'A'.repeat(255)),
		production_country: 'USA',
		seasons: 1,
	};
	newTitles.push(edgeCaseTitle);

	for (let i = 0; i < 10; i++) {
		newCredits.push({
			id: 106 * 10 + i,
			title_id: 106,
			real_name: 'A'.repeat(255),
			character_name: 'A'.repeat(255),
			role: 'Director',
		});
	}

	// Stringify and format data as CSV
	const titlesCSV =
		'data:text/csv;charset=utf-8,' +
		[
			Object.keys(newTitles[0]).join(','),
			...newTitles.map((title) => Object.values(title).join(',')),
		].join('\n');

	const creditsCSV =
		'data:text/csv;charset=utf-8,' +
		[
			Object.keys(newCredits[0]).join(','),
			...newCredits.map((credit) => Object.values(credit).join(',')),
		].join('\n');

	// Create download links and click them
	const titlesLink = document.createElement('a');
	titlesLink.setAttribute('href', encodeURI(titlesCSV));
	titlesLink.setAttribute('download', 'titles.csv');
	document.body.appendChild(titlesLink);
	titlesLink.click();

	const creditsLink = document.createElement('a');
	creditsLink.setAttribute('href', encodeURI(creditsCSV));
	creditsLink.setAttribute('download', 'credits.csv');
	document.body.appendChild(creditsLink);
	creditsLink.click();
}

function Button() {
	return <button onClick={handleClick}>Generate Data</button>;
}

export default Button;
