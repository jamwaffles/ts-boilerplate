import * as React from 'react';

const Container = ({ children }: { children: any }) => (
	<html>
		<head>
			<script src="/assets/app.js" defer />
		</head>

		<body>
			<main id="app">
				{children}
			</main>
		</body>
	</html>
);

export default Container;
