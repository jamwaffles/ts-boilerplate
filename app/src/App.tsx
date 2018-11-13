import * as React from 'react';

const Thing = () => (
	<div>
		I'm not a toaster

		{typeof window !== 'undefined' ? <div>Browser!</div> : <div>Not browser</div>}
	</div>
);

export default Thing;
