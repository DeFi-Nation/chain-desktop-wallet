import { ethers } from 'ethers';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { ITransactionSigner } from './TransactionSigner';
import TokenContractABI from './abi/TokenContractABI.json';

import {
  BridgeTransactionUnsigned,
  DelegateTransactionUnsigned,
  TransferTransactionUnsigned,
  WithdrawStakingRewardUnsigned,
} from './TransactionSupported';
import { UserAssetType } from '../../models/UserAsset';

class EvmTransactionSigner implements ITransactionSigner {
  // eslint-disable-next-line class-methods-use-this
  public async signTransfer(
    transaction: TransferTransactionUnsigned,
    phrase: string,
  ): Promise<string> {
    const web3 = new Web3('');
    const transferAsset = transaction.asset;

    const gasPriceBN = web3.utils.toBN(
      transaction.gasPrice || transferAsset?.config?.fee?.networkFee!,
    );

    const chainId = transaction?.asset?.config?.chainId || 338;
    const txParams = {
      nonce: web3.utils.toHex(transaction.nonce || 0),
      gasPrice: web3.utils.toHex(gasPriceBN),
      gasLimit: transaction.gasLimit || transferAsset?.config?.fee?.gasLimit,
      to: transaction.toAddress,
      value: web3.utils.toHex(transaction.amount),
      data:
        transaction.memo && transaction.memo.length > 0
          ? web3.utils.utf8ToHex(transaction.memo)
          : '0x',
      chainId: Number(chainId),
    };

    const signedTx = await ethers.Wallet.fromMnemonic(phrase).signTransaction(txParams);
    return Promise.resolve(signedTx);
  }

  // eslint-disable-next-line class-methods-use-this
  public async signTokenTransfer(
    transaction: TransferTransactionUnsigned,
    phrase: string,
  ): Promise<string> {
    const web3 = new Web3('');
    const transferAsset = transaction.asset;

    if (!transferAsset?.contractAddress) {
      throw new TypeError('The contract address is required to transfer tokens assets');
    }

    if (
      transferAsset?.assetType !== UserAssetType.CRC_20_TOKEN &&
      transferAsset?.assetType !== UserAssetType.ERC_20_TOKEN
    ) {
      throw new TypeError('The asset type is expected to be a CRC_20_TOKEN or ERC_20_TOKEN');
    }

    const gasPriceBN = web3.utils.toBN(
      transaction.gasPrice || transferAsset?.config?.fee?.networkFee!,
    );

    const contractABI = TokenContractABI.abi as AbiItem[];
    const contract = new web3.eth.Contract(contractABI, transferAsset.contractAddress);
    const encodedTokenTransfer = contract.methods
      .transfer(transaction.toAddress, transaction.amount)
      .encodeABI();

    const chainId = transaction?.asset?.config?.chainId || 338;
    const txParams = {
      nonce: web3.utils.toHex(transaction.nonce || 0),
      gasPrice: web3.utils.toHex(gasPriceBN),
      gasLimit: transaction.gasLimit || transferAsset?.config?.fee?.gasLimit,
      to: transferAsset.contractAddress,
      value: 0,
      data: encodedTokenTransfer,
      chainId: Number(chainId),
    };

    const signedTx = await ethers.Wallet.fromMnemonic(phrase).signTransaction(txParams);
    return Promise.resolve(signedTx);
  }

  // eslint-disable-next-line class-methods-use-this
  public async signBridgeTransfer(
    transaction: BridgeTransactionUnsigned,
    phrase: string,
  ): Promise<string> {
    const web3 = new Web3('');

    const transferAsset = transaction.originAsset;
    const chainId = transaction?.asset?.config?.chainId || 338;

    const txParams = {
      nonce: web3.utils.toHex(transaction.nonce || 0),
      gasPrice: web3.utils.toHex(transaction.gasPrice || transferAsset?.config?.fee?.networkFee!),
      gasLimit: transaction.gasLimit,
      to: transaction.toAddress,
      value: web3.utils.toHex(transaction.amount),
      data: transaction.data,
      chainId: Number(chainId),
    };

    const signedTx = await ethers.Wallet.fromMnemonic(phrase).signTransaction(txParams);
    return Promise.resolve(signedTx);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  signDelegateTx(_: DelegateTransactionUnsigned, phrase: string): Promise<string> {
    return Promise.resolve('');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  signWithdrawStakingRewardTx(_: WithdrawStakingRewardUnsigned, phrase: string): Promise<string> {
    return Promise.resolve('');
  }
}

export const evmTransactionSigner = new EvmTransactionSigner();
