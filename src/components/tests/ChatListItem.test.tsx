import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChatListItem } from '../ChatListItem';

it('renders chat list item correctly', () => {
  render(<ChatListItem label="Jonh" />);

  expect(screen.getByLabelText('item Jonh')).toHaveTextContent('Jonh');
  expect(screen.getByRole('button')).toBeEnabled();
});
