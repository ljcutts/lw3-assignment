import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const Home: NextPage = () => {

  return (
    <div className="bg-rainbow bg-no-repeat bg-[length:auto_900px] h-screen flex justify-center items-center">
      <Head>
        <title>LW3 And BuildSpace NFTs</title>
        <meta
          name="description"
          content="An app that allows users to see their nfts from the learnweb3 and buildspace platforms"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            mounted,
          }) => {
             const ready = mounted;
             const connected =
               ready &&
               account &&
               chain 
                  {if (!connected) {
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
                      <button
                        className="rounded-2xl bg-black ml-5 text-white h-8 shadow-button w-36 font-bold transition ease-in-out hover:opacity-50"
                        onClick={openAccountModal}
                        type="button"
                      >
                        Disconnect
                      </button>
                    );
                  }}
           
          }}
        </ConnectButton.Custom>
      
    </div>
  );
}

export default Home

  {
    /* <button className="rounded-2xl bg-black ml-5 text-white h-8 shadow-button w-36 font-bold transition ease-in-out hover:opacity-50">
          Connect Wallet
        </button> */
  }