import React, { useEffect, useState } from 'react';
import './App.css';
import styled from 'styled-components';
import { Dropdown, Menu } from 'antd';
import Crypt from './crypt';

function App() {
  const availAlphabets = [
    'абвгдеёжзийклмнопрстуфхцчшщъыьэюя',
    'abcdefghijklmnopqrstuvwxyz',
  ];
  const [currentNumber, setCurrentNumber] = useState(0);
  const [isEncrypt, setIsEncrypt] = useState(true);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [customAlpha, setCustomAlpha] = useState('');
  const [currentAlphabet, setCurrentAlphabet] = useState(availAlphabets[0]);
  useEffect(() => {
    let timeout = setTimeout(() => {
      let result;
      if (isEncrypt) {
        result = Crypt.encode(input, currentNumber, currentAlphabet);
      } else {
        result = Crypt.decode(input, currentNumber, currentAlphabet);
      }
      setOutput(result);
    }, 200);
    return () => clearTimeout(timeout);
  }, [input, currentNumber, currentAlphabet, isEncrypt]);

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          setCurrentAlphabet(availAlphabets[0]);
          setCurrentNumber(Math.min(currentNumber, availAlphabets[0].length));
        }}
      >
        Я русский
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setCurrentAlphabet(availAlphabets[1]);
          setCurrentNumber(Math.min(currentNumber, availAlphabets[1].length));
        }}
      >
        Americanez
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setCurrentAlphabet(customAlpha);
          setCurrentNumber(Math.min(currentNumber, customAlpha.length));
        }}
      >
        <DropdownInput
          value={customAlpha}
          placeholder="Ваш алфавит"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentAlphabet(customAlpha);
            setCurrentNumber(Math.min(currentNumber, customAlpha.length));
          }}
          onChange={(e) => {
            setCurrentAlphabet(e.target.value);
            setCurrentNumber(Math.min(currentNumber, e.target.value.length));
            setCustomAlpha(e.target.value);
          }}
        />
      </Menu.Item>
    </Menu>
  );

  return (
    <Container>
      <MainContainer>
        <Dropdown overlay={menu}>
          <DropdownButton>Сменить алфавит</DropdownButton>
        </Dropdown>
        <ButtonContainer>
          <Button isActive={isEncrypt} onClick={() => setIsEncrypt(true)}>
            Encrypt
          </Button>
          <Button isActive={!isEncrypt} onClick={() => setIsEncrypt(false)}>
            Decrypt
          </Button>
        </ButtonContainer>
        <InputContainer>
          <Input onChange={(e) => setInput(e.target.value)}>{input}</Input>
          <RangeContainer>
            <div>
              {currentNumber} / {currentAlphabet.length}
            </div>
            <Range
              type="range"
              min="0"
              max={currentAlphabet.length}
              id="step"
              step="1"
              value={currentNumber}
              onInput={(e) => setCurrentNumber(Number(e.currentTarget.value))}
            />
          </RangeContainer>
        </InputContainer>
      </MainContainer>
      <Output>{output}</Output>
    </Container>
  );
}

interface ButtonProps {
  readonly isActive: boolean;
}

const Container = styled.div`
  padding-left: 20%;
  padding-right: 20%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const InputContainer = styled.div`
  border: 1px solid red;
  height: 20rem;
  resize: none;
  outline: none;
  border-radius: 20px;
  padding: 1rem;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  :focus {
    box-shadow: 0 0 3px 0px blue;
  }
  transition: all 200ms;
`;

const Range = styled.input``;

const RangeContainer = styled.div`
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Input = styled.textarea`
  overflow: auto;
  border: none;
  outline: none;
  flex: 1;
  resize: none;
`;

const ButtonContainer = styled.div`
  border-radius: 20px;
  display: flex;
  border: 1px solid black;
  align-items: center;
`;

const Button = styled.div<ButtonProps>`
  flex: 1;
  padding: 0.5rem 1rem;
  background-color: ${({ isActive }) => isActive && 'red'};
  user-select: none;
  transition: all 200ms;
  :first-child {
    border-right: 1px solid black;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  :last-child {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  text-align: center;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

const Output = styled.div`
  border: 1px solid red;
  height: 20rem;
  resize: none;
  outline: none;
  border-radius: 20px;
  padding: 1rem;
  font-size: 1.2rem;
  width: 40%;
  display: flex;
  overflow-wrap: break-word;
  word-break: break-all;
`;

const DropdownButton = styled.div`
  flex: 1;
  text-align: center;
  font-size: 1.3rem;
`;

const DropdownInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
`;
export default App;
