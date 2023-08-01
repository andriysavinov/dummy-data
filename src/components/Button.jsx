import React from 'react';
import { faker } from '@faker-js/faker';

function Button() {
	const handleClick = () => {
		const age_certifications = [
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

		let newTitles = [];
		let newCredits = [];

		for (let i = 0; i < 100; i++) {
			let id = i + 1;
			let title = faker.lorem.words(3);
			let description = faker.lorem.sentences(3);
			let release_year = faker.date.past().getFullYear().toString();
			let age_certification =
				age_certifications[
					Math.floor(Math.random() * age_certifications.length)
				];
			let runtime = Math.floor(Math.random() * 180) + 90;
			let genres = [
				faker.music.genre(),
				faker.music.genre(),
				faker.music.genre(),
			];
			let production_country = faker.location.countryCode();
			let seasons = Math.floor(Math.random() * 10);

			newTitles.push({
				id,
				title,
				description,
				release_year,
				age_certification,
				runtime,
				genres,
				production_country,
				seasons,
			});

			let real_name =
				faker.person.firstName() + ' ' + faker.person.lastName();
			let character_name = faker.person.firstName();
			let role = roles[Math.floor(Math.random() * roles.length)];

			newCredits.push({
				id,
				title_id: id,
				real_name,
				character_name,
				role,
			});
		}

		const csvTitles = convertToCsv(newTitles);
		const csvCredits = convertToCsv(newCredits);

		downloadCsv(csvTitles, 'titles.csv');
		downloadCsv(csvCredits, 'credits.csv');
	};

	const convertToCsv = (data) => {
		const fields = Object.keys(data[0]);
		const csvData = data.map((row) =>
			fields
				.map((fieldName) => JSON.stringify(row[fieldName], replaceNull))
				.join(','),
		);
		return fields.join(',') + '\n' + csvData.join('\n');
	};

	const downloadCsv = (csv, filename) => {
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const replaceNull = (key, value) => (value === null ? '' : value);

	return (
		<button onClick={handleClick}>Generate and Download Datasets</button>
	);
}

export default Button;
