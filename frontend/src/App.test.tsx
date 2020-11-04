import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import TestRenderer from 'react-test-renderer';


test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('Testing for component: <App />', () => {
	it('renders the component correctly without crashing', () => {
		const testRenderer = TestRenderer.create(<App />).toJSON();
		expect(testRenderer).toMatchSnapshot();
	});
});

