import { useState } from 'react';
import {ethers, BigNumber} from 'ethers';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import ExampleNFT from './ExampleNFT.json';

const ExampleNFTAddress = "0xb1cdf03F187b03b2b0b796a5d4b771D297309B12";

const MainMint = ({ accounts, setAccounts }) => {
    const[mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    const { MerkleTree } = require('merkletreejs')
    const KECCAK256 = require('keccak256')


    async function handleMintOne() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                ExampleNFTAddress,
                ExampleNFT.abi,
                signer
            );
            try {
                const response = await contract.mintWLOnly(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.001 * mintAmount).toString()),
                });
                console.log('response: ', response);
            } catch (err) {
                console.log("error: ", err)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };




    return (
        <Flex justify='center' align='center' height="50vh" paddingBottom='150px' >
            <Box width='500px' marginTop="500px">
                <div>
                    <Image src="https://gateway.pinata.cloud/ipfs/QmV61wWswuVsome2PQbfNPHZ912aBi7vUjn7wTg8yyaMQC/1.png" width="70%"  borderRadius="10%">

                    </Image>
                    <Text fontSize="20px" textShadow="0 5px #00000" color="black">
                        ExampleNFT #1
                    </Text>
                </div>

                {isConnected ? (
                    <div>
                        <Flex align="center" justify="center">
                            <button onClick={handleDecrement}>-</button>
                            <Text
                                fontFamily="inherit" 
                                textAlign="center" 
                                fontSize="30px" 
                                type="number">
                                
                                {mintAmount}

                            </Text>
                            <button onClick={handleIncrement}>+</button>
                        </Flex>
                            <Button 
                                backgroundColor="#0E0D0B"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="inherit"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                // marginTop="10px"
                                fontSize="20px" 
                                onClick={handleMintOne}>
                                Mint Now
                            </Button>
                    </div>

                    
                ) : (
                    <Text 
                        marginTop="50px"
                        fontSize="30px"
                        fontFamily="inherit"
                        textShadow="0 3px #000000"
                        color='black'>
                        {/* You must be connected to Mint. */}
                    </Text>
                )}
            </Box>
        </Flex>
    );
};

export default MainMint;

