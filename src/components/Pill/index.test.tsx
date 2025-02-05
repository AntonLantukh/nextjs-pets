import { render, screen } from '@testing-library/react';

import Pill from './index';

describe('Pill component', () => {
  it('renders the pill with label and value', () => {
    render(<Pill label="Sorted" value={true} namespace="sorted" onClick={() => {}} />);

    expect(screen.getByText('Sorted')).toBeInTheDocument();
    expect((screen.getByText('Sorted') as HTMLButtonElement).value).toEqual('sorted');
  });
});
