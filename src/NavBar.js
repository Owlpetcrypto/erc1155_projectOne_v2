import { Box,  Flex, Button, Image, Link, Spacer, textDecoration } from '@chakra-ui/react';
import React from 'react';
// import Twitter from "./assets/social-media-icons/Twitter_icon.png";

const NavBar = ({accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }

    return (
        <Flex justify="flex-end" align="center" padding = "30px 6%">
 
            {/* Right side = Sections and Connect */}
            <div>
                <Link href='https://www.twitter.com' padding="30px" textDecoration="none" color="black" fontSize="23px"> Twitter</Link>
            </div>
            <Box margin="0 30px" fontSize="23px" color="black">About</Box>
            <Box margin="0 30px" fontSize="23px" color="black">Team</Box>
            <Box margin="0 30px" fontSize="23px" color="black">Mint</Box>

            {/* Connect */}
            {isConnected ? (
                <Box margin="0 30px">Connect</Box>
            ) : (
                <Button 
                backgroundColor="#0E0D0B"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="inherit"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                margin="0 30px"
                fontSize="23px"
                onClick={connectAccount}>Connect</Button>
            )}

        </Flex>
    );
};

export default NavBar;