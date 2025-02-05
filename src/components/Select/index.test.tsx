import { act, fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import Select from './index';

const mockOptions = [
  { label: 'Ford', value: 'Ford' },
  { label: 'BMW', value: 'BMW' },
];

describe('Select component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the select component with options', async () => {
    render(
      <Select
        label="Cars"
        namespace="cars"
        value=""
        options={mockOptions}
        isLoading={false}
        onChange={() => {}}
      />,
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();

    const options = await screen.getAllByRole('option');

    expect(options).toHaveLength(2);
  });

  it('expands the select component when clicked', () => {
    render(
      <Select
        label="Cars"
        namespace="cars"
        value=""
        options={mockOptions}
        isLoading={false}
        onChange={() => {}}
      />,
    );

    // Options are not visible
    expect(screen.getByRole('listbox').getAttribute('data-state')).toEqual('closed');

    act(() => {
      screen.getByRole('combobox').click();
    });

    // Options are visible
    expect(screen.getByRole('listbox').getAttribute('data-state')).toEqual('expanded');
  });

  it('expands and closes the select component when navigating via keyboard', async () => {
    render(
      <Select
        label="Cars"
        namespace="cars"
        value=""
        options={mockOptions}
        isLoading={false}
        onChange={() => {}}
      />,
    );

    // Options are not visible
    expect(screen.getByRole('listbox').getAttribute('data-state')).toEqual('closed');

    // Focusing the component
    act(() => {
      screen.getByRole('combobox').focus();
    });

    // Using keyboard to open the dropdown list
    act(() => {
      fireEvent.keyDown(document, { key: 'Enter' });
    });

    // Options are visible
    expect(screen.getByRole('listbox').getAttribute('data-state')).toEqual('expanded');

    // First element is selected
    const options = await screen.getAllByRole('option');
    expect(options[0].getAttribute('aria-selected')).toEqual('true');
    expect(options[1].getAttribute('aria-selected')).toEqual('false');

    // Using keyboard to close the dropdown list
    act(() => {
      fireEvent.keyDown(document, { key: 'Esc' });
    });

    // Options are not visible
    expect(screen.getByRole('listbox').getAttribute('data-state')).toEqual('closed');
  });

  it('supports keyboard navigation to select options', async () => {
    render(
      <Select
        label="Cars"
        namespace="cars"
        value=""
        options={mockOptions}
        isLoading={false}
        onChange={() => {}}
      />,
    );

    // Options are not visible
    expect(screen.getByRole('listbox').getAttribute('data-state')).toEqual('closed');

    // Focusing the component
    act(() => {
      screen.getByRole('combobox').focus();
    });

    // Using keyboard to open the dropdown list
    act(() => {
      fireEvent.keyDown(document, { key: 'Enter' });
    });

    // Options are visible
    expect(screen.getByRole('listbox').getAttribute('data-state')).toEqual('expanded');

    const options = await screen.getAllByRole('option');

    // First element is selected
    expect(options[0].getAttribute('aria-selected')).toEqual('true');
    expect(options[1].getAttribute('aria-selected')).toEqual('false');

    // Using keyboard to go to the second option
    act(() => {
      fireEvent.keyDown(document, { key: 'Down' });
    });

    // Second element is selected
    expect(options[0].getAttribute('aria-selected')).toEqual('false');
    expect(options[1].getAttribute('aria-selected')).toEqual('true');

    // Using keyboard to go to the first option
    act(() => {
      fireEvent.keyDown(document, { key: 'Down' });
    });

    // First element is selected
    expect(options[0].getAttribute('aria-selected')).toEqual('true');
    expect(options[1].getAttribute('aria-selected')).toEqual('false');
  });

  it('selects when navigating using a mouse', async () => {
    const onChange = vi.fn();

    render(
      <Select
        label="Cars"
        namespace="cars"
        value=""
        options={mockOptions}
        isLoading={false}
        onChange={onChange}
      />,
    );

    act(() => {
      screen.getByRole('combobox').click();
    });

    // Options are visible
    expect(screen.getByRole('listbox').getAttribute('data-state')).toEqual('expanded');

    const options = await screen.getAllByTestId('select-cars-option');

    // Click on the first option
    act(() => {
      fireEvent.click(options[0]);
    });

    // Change callback was called
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith('Ford');

    // Click on the second option
    act(() => {
      fireEvent.click(options[1]);
    });

    // Change callback was called
    expect(onChange).toBeCalledTimes(2);
    expect(onChange).toBeCalledWith('BMW');
  });

  it('selects when navigating using a keyboard', async () => {
    const onChange = vi.fn();

    render(
      <Select
        label="Cars"
        namespace="cars"
        value=""
        options={mockOptions}
        isLoading={false}
        onChange={onChange}
      />,
    );

    act(() => {
      screen.getByRole('combobox').click();
    });

    // Options are visible
    expect(screen.getByRole('listbox').getAttribute('data-state')).toEqual('expanded');

    // Use keyboard to select the second option
    act(() => {
      fireEvent.keyDown(document, { key: 'Down' });
    });
    act(() => {
      fireEvent.keyDown(document, { key: 'Enter' });
    });

    // Change callback was called
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith('BMW');

    // Use keyboard to select the first option
    act(() => {
      fireEvent.keyDown(document, { key: 'Up' });
    });
    act(() => {
      fireEvent.keyDown(document, { key: 'Enter' });
    });

    // Change callback was called
    expect(onChange).toBeCalledTimes(2);
    expect(onChange).toBeCalledWith('Ford');
  });
});
