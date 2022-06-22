---
sidebar_position: 2
---

# Become a delegator

A delegator stakes with a validator. The main difference is that a delegator can stake from 1 NEXT and don't need the requirement of a full colleteral of a validator, which is 25000 NEXT. The rewards are also smaller. And there is no need to run a 24/7 VPS.

:::tip Minimum NEXT required!

Minimum stake is **1 NEXT**

:::

## Requirements

*   **Minimum amount of NEXT:** 1 NEXT
*   **Rewards:** up to ~2-5% APY. APY varies based on staked %.

## Stake with a validator

Open up the console where you entered the commands to create the validator wallet previously and attach to the NEXT Smart Chain node console:


```bash
# Attach to NEXT Smart Chain console
$ ./next attach
```

By doing so, you will get a JavaScript console where you can directly interact with the Next Smart Chain node:

- img

Now initializing the Validator smart contract to interact as a validator.

```bash
sfcc = next.sfcContract()
```

Unlock your personal wallet to send the delegated amount

```bash
# Unlock validator wallet
personal.unlockAccount("YOUR_VALIDATOR_ADDRESS", undefined, 300)
```

This will return `true` if unlocking the wallet was successful.

Next, send the `createDelegation` transaction to register your stake with a validator.

```bash
# Register your delegation
tx = sfcc.createDelegation(validatorID, {from:"0xAddress", value: web3.toWei("amount", "next")}) // 
```

`validatorID`, the validator ID can be any number between 0 and 40. The first 12 nodes are from the core team.
`amount`, the amount of NEXT between 1 and 25000.

If everything goes okey a transaction ID will be presented:

- img

Make sure to check your registration transaction (could take a few moments to be confirmed):

```bash
# Check your registration transaction
next.getTransactionReceipt(tx)
```

Look for the status: `0x1` at the bottom, which means the transaction was successful:

- img

You can also copy the transactionHash and go the Next Smart Chain Explorer and check your transaction there: 

https://explorer.nextsmartchain.com/tx/[YOURTX]

- img

Congrats! You have successfully become a delegator. 

## Request a partially withdraw

In case you send to much NEXT to a validator, it's possible to do a partially withdrawal of NEXT. Be aware that this function can only be called afer all rewards are claimed.

```js
sfc.prepareToWithdrawDelegationPartial(requestID, web3.toWei("amountToWithdraw", "next"), {from: "0xAddress"})
```

`requestID` can be any number, which wasn't used by this validator previously. If not sure, use `0`.
Remeber this number, you need it with the following command.

:::tip Max to partial withdraw

You can only withdraw the amount above the minimum stake of 25000 NEXT and the amount needed for delegators (if any)

:::

To finalize the withdrawal request, wait for number of seconds and epochs to get an unlock from the blockchain. After that run the following command: 

```js
sfc.partialWithdrawByRequest(requestID, {from: "0xAddress"})
```

Your withdraw will now be processed to your personal wallet. 

## Request a full withdraw

A validator can withdraw the full amount of NEXT. 

Note that a locked validator cannot withdraw until the node is unlocked.

```js
sfc.prepareToWithdrawDelegation(validatorID, {from: address})
```

After enough seconds and epochs have passed a validator can finish the withdraw.

```js
sfc.withdrawDelegation(validatorID, {from: "0xAddress"})
```

`validatorID` needs to be the ID of the validator where you delegate the NEXT.

## Lock a delegator (optional)

Reward for a non-locked stake is 30% (base rate) of the full reward for a locked stake.

If a withdrawal is made before the lockup period expires, a penalty of 42,5% will be applied.

```js
sfc.lockUpDelegation(lockupDuration, validatorID, {from: "0xAddress"})
```

`lockupDuration` is lockup duration in seconds. Must be >= 14 days (1209600 seconds), <= 365 days (31536000 seconds).
`validatorID` needs to be the ID of the validator where you delegate the NEXT.