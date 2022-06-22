---
sidebar_position: 3
---

# Claim/withdraw rewards

Claim earned rewards.

## Non-Compound vs Compound

Reward for a non-locked validator/delegator is 30% (base rate) of full reward for a locked stake.

- `maxEpochs` is maximum number of epochs to claim rewards for (in one call). If you have rewards for many epochs, call method multiple times until all rewards are claimed. If not sure, use 100.

Rewards may be claimed in either `non-compound` or `compound` mode:
- Rewards claiming in non-compound mode transfers the reward to caller's account.
- Rewards claiming in compound mode stakes the claimed reward, increasing delegation/validator stake. Reward may be higher than in non-compound mode, because it is estimated as a compound reward. Compound reward us estimated by incrementing stake after every calculated epoch reward.

## Get connceted to the console

Let connect first to the console, start a terminal and type:

```bash
./next attach
```

After being attached to the console, load the function of the smart contract

```js
sfcc = next.sfcContract()
```

## For a Validator

### Non-compound mode:
```js
VALIDATOR_ID = sfcc.getStakerID("0xAddress") // if 0, then staker doesn't exist, or SFC functions aren't initialized correctly

// check you have rewards to claim:
sfcc.pendingRewards("0xAddress", VALIDATOR_ID) 

// claim rewards:
sfcc.claimRewards(VALIDATOR_ID, {from: "0xAddress"})

```

### Compound mode:
```js
VALIDATOR_ID = sfcc.getStakerID("0xAddress") // if 0, then staker doesn't exist, or SFC functions aren't initialized correctly

// check you have rewards to claim:
sfcc.pendingRewards("0xAddress", VALIDATOR_ID) 

// claim rewards:
sfcc.restakeRewards(VALIDATOR_ID, {from: "0xAddress"})

```

