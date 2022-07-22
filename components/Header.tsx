import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import { CloseIcon, SearchIcon, AtSignIcon } from "@chakra-ui/icons";
import Link from "next/link";

import { useUser } from "@auth0/nextjs-auth0";

const Header = () => {
  const { user, error, isLoading }: any = useUser();
  const [input, setInput] = useState("");

  const inputChangeHandler = (e: {
    target: { value: React.SetStateAction<string> };
  }): void => {
    setInput(e.target.value);
  };

  const searchQuery = (e: any) => {
    if (e.key === "Enter" && input.length > 0) {
      let nextLink: any = document.getElementById("next-link");
      nextLink.click();
    }
  };

  if (!user) {
    return (
      <div
        style={{
          backgroundColor: "#ffd350",
          borderBottom: "3px solid #000",
        }}
      >
        <div className='container d-flex justify-content-between'>
          <Link href={{ pathname: "/", query: "" }}>
            <div className='py-3 d-flex' id='left' role='button'>
              <img
                src='https://cdn-icons-png.flaticon.com/512/109/109720.png'
                alt='logo-main'
                width={70}
              />
              <p className='h3 mt-1 mx-4 fw-bold'>
                series-pedia <br />
                <span className='h6 text-muted'>For the series geeks...</span>
              </p>
            </div>
          </Link>

          <div className='my-4 d-flex' id='right'>
            <Button className='me-4 mt-1' colorScheme={"telegram"}>
              <Link href='/api/auth/login'>
                <a>Log in</a>
              </Link>
            </Button>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <SearchIcon className='mt-2' />
              </InputLeftElement>
              <Input
                placeholder='Type here to search...'
                focusBorderColor='gray.800'
                borderColor='gray.800'
                _placeholder={{ opacity: 0.6, color: "#000" }}
                size='lg'
                colorScheme='green'
                value={input}
                onChange={inputChangeHandler}
                onKeyDown={searchQuery}
              />
            </InputGroup>

            <Link
              href={{
                pathname: "/search/[query]",
                query: { query: input },
              }}
            >
              <a id='next-link'></a>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          backgroundColor: "#ffd350",
          borderBottom: "3px solid #000",
        }}
      >
        <div className='container d-flex justify-content-between'>
          <Link href={{ pathname: "/", query: "" }}>
            <div className='py-3 d-flex' id='left' role='button'>
              <img
                src='https://cdn-icons-png.flaticon.com/512/109/109720.png'
                alt='logo-main'
                width={70}
              />
              <p className='h3 mt-1 mx-4 fw-bold'>
                series-pedia <br />
                <span className='h6 text-muted'>For the series geeks...</span>
              </p>
            </div>
          </Link>

          <div className='my-4 d-flex' id='right'>
            <Popover>
              <PopoverTrigger>
                <ButtonGroup
                  size='lg'
                  className='me-3'
                  isAttached
                  colorScheme='black'
                  variant='outline'
                >
                  <Button>
                    <h1>{user.nickname}</h1>
                  </Button>
                </ButtonGroup>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverBody>
                    <Link
                      href={{
                        pathname: "/[userName]",
                        query: { userName: user.sub },
                      }}
                    >
                      <a className='h5'>
                        <AtSignIcon w={4} /> Profile
                      </a>
                    </Link>
                  </PopoverBody>
                  <PopoverBody>
                    <a href='api/auth/logout' className='h5'>
                      <CloseIcon w={4} /> Log out
                    </a>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>

            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <SearchIcon className='mt-2' />
              </InputLeftElement>
              <Input
                placeholder='Type here to search...'
                focusBorderColor='gray.800'
                borderColor='gray.800'
                _placeholder={{ opacity: 0.6, color: "#000" }}
                size='lg'
                colorScheme='green'
                value={input}
                onChange={inputChangeHandler}
                onKeyDown={searchQuery}
              />
            </InputGroup>

            <Link
              href={{
                pathname: "/search/[query]",
                query: { query: input },
              }}
            >
              <a id='next-link'></a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default Header;
