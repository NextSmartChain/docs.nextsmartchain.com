---
sidebar_position: 1
---

# Become a validator

How to become a validator on NEXT Smart Chain. Follow the instructions below step-by-step. For this documentation you need at least some skills in Linux and Bash.

:::tip Minimum NEXT required!

Minimum stake is **25000 NEXT**

:::

## Requirements

*   **Minimum amount of NEXT:** 25,000 NEXT
*   **Maximum validator size:** 15x the self-stake amount
*   **Minimum hardware requirements:** Ubuntu 20.04 LTS (64 bit), 1 vCPUs (3.1 GHz+), 1 GB memory and at least 40 GB of SSD storage (or equivalent), 1 Gbps network, 24/7 up and running.
*   **Firewall:** Port 22 for SSH, as well as port 5120 for both TCP and UDP traffic.
*   **Rewards:** up to ~20% APY (Normal APY on self-stake + 15% of delegators' rewards). APY varies based on staked %.

## Installation on the Node

> Make sure you download the latest binary on Github.
> 
> ##### Latest version 3.1.0 (June 2022)

## Set up Non-Root User
For security reasons it is always safer to create a non-root user in your Linux environment. Instructions can be found [here](https://www.digitalocean.com/community/tutorials/how-to-create-a-new-sudo-enabled-user-on-ubuntu-20-04-quickstart).

## Install Required Tools

Now we are going to install Next Smart Chain Node and register the NEXT Validator into the network. 

```bash
# Install NEXT, login to your NEXT Validator VPS
$ wget https://github.com/NextSmartChain/next-binary/raw/main/next-ubuntu20.04.zip
$ wget https://github.com/NextSmartChain/next-binary/raw/main/mainnet.g
$ unzip next-ubuntu20.04.zip
$ chmod 777 ./next
$ nohup ./next --genesis mainnet.g &
```

Starting up your node will look like this:

- Insert img

The node is going to sync with the network data right away:

- Insert img

## Create a validator wallet

The node running and syncing the network in your current console, so you need to open up a new console window, connect via SSH to the server and enter the following commands to create a wallet:

```bash
# Create validator wallet
$ ./next account new
```

After entering the command, you will get prompted to enter a password for the account (= wallet) — use a strong one! You can e.g. use a password manager to generate a 20+ digit password to secure your wallet. It will look something like this:

- Insert img

> Please remember the public address (started with 0x), you need this further in this tutorial where we add 'YOUR\_VALIDATOR\_ADDRESS'.  
>   
> NEVER share your private key or keystore with anyone!
> 
> **_By the way:_** _The wallet above is not a real wallet we use, it’s just for demonstration purposes only._


## Fund your wallet with 25000 NEXT + 1 NEXT for the gasfees

The next step is to fund your validator wallet with enough NEXT to become a validator. That means you need to have at least 25,000 NEXT (+1 NEXT to cover the gasfees) in the wallet you just created (send a little more to cover transaction fees).

> If you don’t have NEXT you can buy them on Uniswap V3 and SWAP them!
> 
> https://app.uniswap.org/#/swap?chain=mainnet&outputCurrency=0x377d552914E7A104bC22B4F3B6268dDC69615Be7

Check your balance after sending the colleteral:

```bash
# Attach to the console
$ ./next attach

# In the console
next.getBalance('YOUR_VALIDATOR_ADDRESS')
2.5e+22 

# 2.5e+22 is equal to 25000 NEXT
```

After successfully swapping NEXT to your newly created wallet, you can register your validator. Make sure you wait for your node to be fully synced, otherwise your NEXT will not show up in your wallet!

## Create a new validator key

We have to create validator private key to sign consensus messages with. It can be done only using go-next:

```bash
$ ./next validator new
```

Follow the prompts and supply the password, you will receive the following:

- IMG

> Write down the public key, you need it in the NEXT step.
> 
> NEVER share your private key or keystore with anyone!

## Create your validator

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

After initializing both variables, you can now interact with the network’s SFC. Enter the following command to check that everything works as expected:

```bash
// Sanity check
sfcc.lastValidatorID() // if everything is all right, will return a non-zero value
```

Next, try to get your `validatorID` from the SFC using your previously generated validator wallet address:

```bash
# Get your validator id
sfcc.getValidatorID("YOUR_VALIDATOR_ADDRESS")
```

This should return `0`, as you are not registered as a validator yet.

Next, unlock your validator wallet to be able to execute the registration transaction (make sure to use the password you set before):

```bash
# Unlock validator wallet
personal.unlockAccount("YOUR_VALIDATOR_ADDRESS", undefined, 300)
```

This will return `true` if unlocking the wallet was successful.

Next, send the `createValidator` transaction to register your validator (the value is the representation of the smallest NEXT unit, so dividing it be 1e18 will result in 25000 NEXT. Alternatively, you can use web3.toWei("25000", "next")). Use quotes for "0xYOUR_PUBKEY" and "0xYOUR_ADDRESS":

```bash
# Register your validator
tx = sfcc.createValidator("YOUR_PUBKEY", {from:"YOUR_VALIDATOR_ADDRESS", value: web3.toWei("25000", "next")}) // 25000 NEXT
```

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

Finally, execute the following command again to check your `validatorID`:


```bash
# Get your validator id
sfcc.getValidatorID("VALIDATOR_WALLET_ADDRESS")
```

It should now return something higher than `0`.

Congrats! You are now running a NEXT Smart Chain Validator.

## Run your Next Smart Chain Validator Node

Before you run off celebrating, you need to restart your node in validator mode!

Close the Next Smart Chain console window by typing “exit”. Then head back to the console window where you started your node with the following command:

```bash
$ killall next
$ nohup ./next --genesis mainnet.g --validator.id ID --validator.pubkey 0xPubkey --validator.password /path/to/password &
```

*   `ID` is your validator ID (e.g. 25)
*   `0xPubkey` is your validator public key. You've generated your key with `next validator new`.
*   `/path/to/password` is a path to a file which contains the password to decrypt the validator key (optional). If you omitted the `--validator.password` flag, then you will be prompted for the password in terminal.

It's complete. Your node is running!

## Check if your validator is up and running

Sometimes it's good to check if the validator is up and running, otherwise you will miss some of your NEXT rewards. To check go to the console:

```bash
$ ./next attach
sfc.getStaker(YOUR_VALIDATOR_ID)
```

The following will return:

- img

As you can see, the validator isActive, but the isValidator is false. No worries! You properly just started your validator. It will be accepted as a validator after the next epoch (which can take up to 4 hours). 

## Request a full withdraw

A validator can withdraw the full amount of NEXT. 

```js
sfcc.withdraw({from: "0xAddress"})
```

## Lock a validator (optional)

Reward for a non-locked stake is 30% (base rate) of the full reward for a locked stake.

If a withdrawal is made before the lockup period expires, a penalty of 42,5% will be applied.

```js
sfcc.lockStake(validatorID, lockupDuration, web3.toWei("amount", "next"), {from: "0xAddress"})
```

`lockupDuration` is lockup duration in seconds. Must be >= 14 days (1209600 seconds), <= 365 days (31536000 seconds).

## ReLock a validator (optional)

Extend lockup period or increase lockup up stake. 

```js
sfcc.relockStake(validatorID, newLockupDuration, web3.toWei("amount", "next"), {from: "0xAddress"})
```

## Unlock a validator (optional)

Unlock the stake before lockup duration has elapsed.

:::danger Penalty

The following penalty will be withheld from the unlocked amount:

(base rate = 30%)/2 + lockup rate of rewards received for epochs during the lockup period

:::

```js
sfcc.unlockStake(validatorID, web3.toWei("amount", "next"), {from: "0xAddress"})
```


## Issues

### Cannot unzip the zip file

Q: After the download, I tried to unzip the file, but it is not working. 
A: You need to install the required package.

```bash
$ apt install unzip
```

### The NEXT binary is not working/loading

Q: I download and unzip the file, but NEXT is not working.
A: The file don't have execution permissions.

```bash
$ chmod 777 ./next
```