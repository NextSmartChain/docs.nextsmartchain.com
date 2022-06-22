import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '300,000 transactions per second',
    Svg: require('@site/static/img/300k-transactions.svg').default,
    description: (
      <>
        That's making Next Smart Chain one of the fastest blockchain on earth.
      </>
    ),
  },
  {
    title: 'Compatible with tokens and dApps',
    Svg: require('@site/static/img/100-procent.svg').default,
    description: (
      <>
        NEXT is fully EVM-compatible and can handle all tokens and dapps which are deployed on Ethereum and Binance Smart Chain.
      </>
    ),
  },
  {
    title: 'Instant transaction confirmations',
    Svg: require('@site/static/img/instant-confirmations.svg').default,
    description: (
      <>
        Why should we wait? We hit the confirmations almost instantly. The waiting is over!
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
