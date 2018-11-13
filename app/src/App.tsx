import * as React from 'react';

const App = () => (
	<div style={{ backgroundColor: 'blue' }}>
		I'm not a toaster

		{typeof window !== 'undefined' ? <div>Browser!</div> : <div>Not browser</div>}
	</div>
);

export default App;
