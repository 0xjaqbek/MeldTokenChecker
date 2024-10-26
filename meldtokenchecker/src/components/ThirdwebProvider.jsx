import { ThirdwebProvider } from "@thirdweb-dev/react";

const activeChain = "mumbai"; // Specify the network you want to use

const ThirdwebProviderWrapper = ({ children }) => {
  return (
    <ThirdwebProvider desiredChainId={activeChain}>
      {children}
    </ThirdwebProvider>
  );
};

export default ThirdwebProviderWrapper;