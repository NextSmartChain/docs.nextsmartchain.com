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


## For a Delegator

### Non-compound mode:
```js
// check you have rewards to claim:
sfcc.calcDelegationRewards("0xAddress", validatorID, 0, maxEpochs) // returns: rewards amount, first claimed epoch, last claimed epoch
// claim rewards:
sfcc.claimDelegationRewards(maxEpochs, validatorID, {from: "0xAddress"})
```

### Compound mode:
```js
// check you have rewards to claim:
sfcc.calcDelegationCompoundRewards("0xAddress", validatorID, 0, maxEpochs) // returns: rewards amount, first claimed epoch, last claimed epoch
// claim rewards:
sfcc.claimDelegationCompoundRewards(maxEpochs, validatorID, {from: "0xAddress"})
```

## For a Validator

### Non-compound mode:
```js
YOUR_ID = sfcc.getStakerID("0xAddress") // if 0, then staker doesn't exist, or SFC functions aren't initialized correctly
// check you have rewards to claim:
sfcc.calcValidatorRewards(YOUR_ID, 0, maxEpochs) // returns: rewards amount, first claimed epoch, last claimed epoch

//or 

sfcc.pendingRewards("YOUR PUBLIC ADDRESS OF THE KEY", YOUR STAKER ID NUMBER) 

// claim rewards:
sfcc.claimValidatorRewards(maxEpochs, {from: "0xAddress"})

//or

sfcc.claimRewards(YOUR STAKER ID NUMBER, {from: "YOUR PUBLIC ADDRESS OF THE KEY"})

```

### Compound mode:
```js
YOUR_ID = sfcc.getStakerID("0xAddress") // if 0, then staker doesn't exist, or SFC functions aren't initialized correctly
// check you have rewards to claim:
sfcc.calcValidatorCompoundRewards(YOUR_ID, 0, maxEpochs) // returns: rewards amount, first claimed epoch, last claimed epoch
// claim rewards:
sfcc.claimValidatorCompoundRewards(maxEpochs, {from: "0xAddress"})

// or

sfcc.restakeRewards(YOUR STAKER ID NUMBER, {from: "YOUR PUBLIC ADDRESS OF THE KEY"})

```

