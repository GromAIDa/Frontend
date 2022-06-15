import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

import { BigNumber, ethers } from 'ethers';
declare let window: any;

const usdc = {
  address: environment.ADDRESS,
  contract_address: environment.CONTRACT_ADDRESS,
  abi: [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function gimmeSome() external',
    'function balanceOf(address _owner) public view returns (uint256 balance)',
    'function transfer(address _to, uint256 _value) public returns (bool success)',
  ],
};

@Injectable({
  providedIn: 'root',
})
export class EthersService {
  provider: any;
  address: string = '';
  currentBlock: string = '';
  private amounts: ethers.BigNumber | undefined = undefined;
  constructor() {}

  isMetaMaskInstalled(): boolean {
    let status = !!window?.ethereum;
    if (!status || status === undefined) {
      window.open(environment.METAMASK_LINK, '_blank');
      return false;
    }
    return true;
  }

  async getUserAddress() {
    await this.provider.send('eth_requestAccounts', []);
    const signer = this.provider.getSigner();
    let userAddress = await signer.getAddress();
    this.address = userAddress;
  }
  async getCurrentBlock() {
    let currentBlock = await this.provider.getBlockNumber();
    this.currentBlock = currentBlock;
  }

  async getBalance(wallet: string) {
    let balance = await this.provider.getBalance(wallet);
    // we use the code below to convert the balance from wei to eth
    balance = ethers.utils.formatEther(balance);
  }

  async transferUsdc(receiverId: string, amountMoney: string) {
    if (!this.isMetaMaskInstalled()) {
      throw {
        message:
          'Metamask not installed, please install it or choose another donate method.',
      };
    }
    this.provider = await new ethers.providers.Web3Provider(
      window.ethereum,
      'any'
    );
    let receiver = receiverId;
    let response = '';

    await this.provider.send('eth_requestAccounts', []);
    const signer = await this.provider.getSigner();
    let userAddress = await signer.getAddress();

    const usdcContract = await new ethers.Contract(
      usdc.contract_address,
      usdc.abi,
      signer
    );

    try {
      receiver = await ethers.utils.getAddress(receiver);
    } catch {
      response = `Invalid address: ${receiver}`;
      throw { message: response };
      console.warn('RECEIVER', { response });
    }

    try {
      this.amounts = ethers.utils.parseEther(amountMoney);

      if (ethers.utils.parseUnits(amountMoney, 6).isNegative()) {
        throw new Error();
      }
    } catch {
      console.error(`Invalid amount: ${amountMoney}`);
      response = `Invalid amount: ${amountMoney}`;
      throw { message: response };
    }

    const balance = await usdcContract['balanceOf'](userAddress);
    const isAmount = await balance.lt(this.amounts);
    if (isAmount && this.amounts) {
      let amountFormatted = ethers.utils.formatUnits(this.amounts, 6);
      let balanceFormatted = ethers.utils.formatUnits(balance, 6);
      throw {
        message: `Insufficient balance receiver send ${amountMoney} (You have ${balanceFormatted})`,
      };
    }
    let amountFormatted: string = '';
    if (this.amounts) {
      amountFormatted = ethers.utils.formatUnits(this.amounts, 6);
    }
    const gasPrice: BigNumber = await signer.getGasPrice();
    try {
      const tx = await usdcContract['transfer'](receiver, this.amounts, {
        gasPrice,
      });

      const receipt = await tx.wait();
    } catch (error: any) {
      if (error && error.code && error.code === -32000)
        throw { message: error.message };
    }
  }
}
