"use client";
import {
  Transaction,
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
  TransactionToast,
  TransactionToastAction,
  TransactionToastLabel,
} from "@coinbase/onchainkit/transaction";
import type {
  TransactionError,
  TransactionResponse,
} from "@coinbase/onchainkit/transaction";
import dotenv from "dotenv";
import { type Address, type ContractFunctionParameters } from "viem";
import { BASE_CHAIN_ID, smartTokenABI, smartTokenAddress } from "../constants";

dotenv.config();

export default function TransactionWrapper({}: { address: Address }) {
  const contracts = [
    {
      address: smartTokenAddress,
      abi: smartTokenABI,
      functionName: "prepapreClaim",
    },
    {
      address: smartTokenAddress,
      abi: smartTokenABI,
      functionName: "claim",
    },
  ] as unknown as ContractFunctionParameters[];

  const handleError = (err: TransactionError) => {
    console.error("Transaction error:", err);
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log("Transaction successful", response);
  };

  return (
    <div className="flex w-[450px]">
      <Transaction
        capabilities={{
          paymasterService: {
            url: process.env
              .NEXT_PUBLIC_PAYMASTER_AND_BUNDLER_ENDPOINT as string,
          },
        }}
        contracts={contracts}
        className="w-[450px]"
        chainId={BASE_CHAIN_ID}
        onError={handleError}
        onSuccess={handleSuccess}
      >
        <TransactionButton className="mt-0 mr-auto ml-auto w-[450px] max-w-full text-[white]" />
        <TransactionSponsor />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
        <TransactionToast>
          <TransactionToastAction />
          <TransactionToastLabel />
          <TransactionToastAction />
        </TransactionToast>
      </Transaction>
    </div>
  );
}
