import React from 'react';
import '@testing-library/jest-dom';
import { render, screen,act, waitFor, renderHook} from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import Counter from './testing';
import useCounter from '../component/renderH';
import Name from './renderhook'
import {User} from '../component/MSWuser'


describe('keyboard N mouse interaction', () =>{
      beforeEach(() => {
        userEvent.setup()
        render(<Counter />);
               }) //renders Counter &  userEvent.setup() before each test

    test('keyboard interaction', async () => {
      const buttonOne = screen.getByRole('button',{name : 'rajat'});
      await userEvent.tab();
      expect(buttonOne).toHaveFocus();

      const buttonTwo = screen.queryByRole('button',{name: 'near'});
      await  userEvent.tab();
      expect(buttonTwo).toHaveFocus();

      const inputSec = screen.getByPlaceholderText('aki');
      await  userEvent.tab();
      expect(inputSec).toHaveFocus();
       });

})

describe('useCounter', () => {
      test('count is initially 0', () => {
        const { result } = renderHook( useCounter);
        expect(result.current.count).toBe(0);
      });

      test('setting count to 10 updates the value', () => {
        const { result } = renderHook( useCounter);
        expect(result.current.count).toBe(0);

        act(() => {
          result.current.setCount(10);
        });

        expect(result.current.count).toBe(10);
      });
});

test('checking whether userEvent APIs working or not cuz of renderH N renderhook files ',async ()=>{
  userEvent.setup()
  render(<Name/>)
  let count = screen.getByTestId('increase')
  let incrementButton = screen.getByRole('button');
  await userEvent.click(incrementButton);
  expect(count.textContent).toBe('1')

})

 test('testing mock http req By MSW ',async ()=>{
    screen.debug()
    render(<User />);
    await waitFor(() => expect(screen.getByRole('list')).toBeInTheDocument());
    const users = screen.getAllByRole('listitem');
    expect(users).toHaveLength(5);

 })