import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {

    test('renders FileDownloadList component', () => {
      render(<App />);
      const fileDownloadListElement = screen.getByText('Download Selected');
      expect(fileDownloadListElement).toBeInTheDocument();
    });
});