import React from 'react';
import ReactDOM from 'react-dom';

import LeadByStatusChart from './components/chartUtil';

import './common/styles/index.scss';

class WebComponent extends HTMLElement {
	connectedCallback() {

		ReactDOM.render(
			<LeadByStatusChart  />,
			this
		);
	}
}

const ELEMENT_ID = 'react-lead-by-status-chart';

if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}
