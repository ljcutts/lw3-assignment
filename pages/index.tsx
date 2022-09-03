import type { NextPage } from 'next'
import Head from 'next/head'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { Network, Alchemy, OwnedNft } from "alchemy-sdk";
import { useEffect, useState } from 'react';
import { useAccount } from "wagmi";


const settings = {
  network: Network.MATIC_MAINNET,
};

const alchemy = new Alchemy(settings);


const Home: NextPage = () => {
  const {address} = useAccount();
  
  const [lw3NFTs, setLW3NFTs] = useState<OwnedNft[]>([])
  const [buildspaceNFTs, setBuildSpaceNFTs] = useState<OwnedNft[]>([]);

  const fetchNFTs = async() => {
    const lw3NFTs = []
    const thisAddress = address !== undefined ? address : ''
    const buildspaceNFTs = []

    const userNFTs = await alchemy.nft.getNftsForOwner(
     thisAddress
    );
    
    for (const nft of userNFTs.ownedNfts) {
      if (
        nft.contract.address.toLowerCase() ===
        "0x1Ed25648382c2e6Da067313e5DAcb4F138Bc8b33".toLowerCase()
      ) {
        lw3NFTs.push(nft);
      }
      if (
        nft.contract.address.toLowerCase() ===
        "0x3cd266509d127d0eac42f4474f57d0526804b44e".toLowerCase()
      ) {
        buildspaceNFTs.push(nft);
      }
    }
    setLW3NFTs(lw3NFTs)
    setBuildSpaceNFTs(buildspaceNFTs)
  }

  useEffect(() => {
    fetchNFTs()
  },[address])

  return (
    <div className="bg-rainbow bg-no-repeat bg-[length:auto_900px] h-screen flex justify-center items-center">
      <Head>
        <title>LW3 And BuildSpace NFTs</title>
        <meta
          name="description"
          content="An app that allows users to see their nfts from the learnweb3 and buildspace nft collections"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
        <ConnectButton.Custom>
          {({
            chain,
            openAccountModal,
            openConnectModal,
            mounted,
          }) => {
             const ready = mounted;
             const connected =
               ready &&
               chain 
               {
                  if (!connected) {
                    return (
                      <>
                        <div className="flex flex-col justify-center items-center">
                          <h1 className="ml-4 md:ml-0 pb-5 font-bold italic text-xl text-yellow-500">
                            Connect Wallet Below To View Your LearnWeb3 And
                            BuildSpace NFTS
                          </h1>
                          <button
                            className="rounded-2xl bg-black ml-5 text-white h-8 shadow-button w-36 font-bold transition ease-in-out hover:opacity-50"
                            onClick={openConnectModal}
                            type="button"
                          >
                            Connect Wallet
                          </button>
                        </div>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <div className="w-full flex items-center flex-col">
                          <div className="flex justify-center ml-5 mt-5 mb-24">
                            <h1 className="font-bold uppercase text-xl text-white">
                              Scroll the boxes to go through your nfts for each
                              collection
                            </h1>
                          </div>
                          <div className="ml-4 md:ml-0 pb-5 font-bold italic text-xl text-red-400">
                            LearnWeb3 NFTs
                          </div>
                          <div className="flex justify-around mb-16 items-center w-full">
                            {/* <div className="bg-black rounded-full h-14 w-14  md:w-20 md:h-20 transition ease-in-out cursor-pointer hover:scale-75  flex justify-center items-center rotate-180">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50"
                                height="50"
                                fill="yellow"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                                />
                              </svg>
                            </div> */}
                            <div className="bg-yellow-400 px-3 pt-3 overflow-scroll flex items-center rounded-lg w-1/2 md:w-4/6 h-48 outline outline-black">
                              {lw3NFTs.length !== 0 ? (
                                lw3NFTs.map((nft, i) => {
                                  return (
                                    <div key={i}>
                                      <img
                                        src={nft.rawMetadata?.image?.replace(
                                          "ipfs://",
                                          "https://ipfs.io/ipfs/"
                                        )}
                                        className=" max-w-[190px] md:max-w-[250px] mr-7 rounded-md"
                                        alt=""
                                      />
                                    </div>
                                  );
                                })
                              ) : (
                                <div className="flex justify-center items-center w-full">
                                  <p className="uppercase font-bold italic">
                                    You dont own any learnweb3dao nfts
                                  </p>
                                </div>
                              )}
                            </div>
                            {/* <div className="bg-black rounded-full  h-14 w-14 md:w-20 md:h-20 flex justify-center items-center transition ease-in-out  cursor-pointer hover:scale-75">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50"
                                height="50"
                                fill="yellow"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                                />
                              </svg>
                            </div> */}
                          </div>
                          <button
                            className="rounded-2xl relative bottom-5 bg-black text-white h-8 shadow-button w-36 font-bold transition ease-in-out hover:opacity-50"
                            onClick={openAccountModal}
                            type="button"
                          >
                            Disconnect
                          </button>
                          <div className="ml-4 md:ml-0 pb-5 font-bold italic text-xl text-red-400">
                            BuildSpace NFTs
                          </div>
                          <div className="flex justify-around mb-16 items-center w-full">
                            <div className="bg-green-500 px-3 pt-3 overflow-scroll flex items-center rounded-lg w-1/2 md:w-4/6 h-48 outline outline-black">
                              {buildspaceNFTs.length !== 0 ? (
                                buildspaceNFTs
                                  .map((nft, i) => {
                                    return (
                                      <div key={i}>
                                        {!nft.rawMetadata?.image?.includes(
                                          "mp4"
                                        ) && (
                                          <img
                                            className="max-w-[150px] mr-7"
                                            src={nft.rawMetadata?.image}
                                          />
                                        )}
                                        {nft.rawMetadata?.image?.includes(
                                          "mp4"
                                        ) && (
                                          <video
                                            className="max-w-[185px] mr-7"
                                            autoPlay
                                            loop
                                          >
                                            <source
                                              src={nft.rawMetadata?.image}
                                              type="video/mp4"
                                            />
                                          </video>
                                        )}
                                      </div>
                                    );
                                  })
                              ) : (
                                <div className="flex justify-center items-center w-full">
                                  <p className="uppercase font-bold italic">
                                    You dont own any buildspace nfts
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  }
                }
           
          }}
        </ConnectButton.Custom>
    </div>
  );
}

export default Home

