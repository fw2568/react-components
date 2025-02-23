import { useState } from 'react'
import s from './style.module.css'
import Button from '@hashicorp/react-button'
import Carousel from 'nuka-carousel'

export default function SteppedFeaturesList({ features }) {
  return (
    <>
      {/* carousel rendered at smaller breakpoints */}
      <FeaturesCarousel features={features} />
      <FeaturesList features={features} />
    </>
  )
}

function FeaturesList({ features }) {
  const [activeFeature, setActiveFeature] = useState(0)
  return (
    <div className={`${s.features} `} data-testid="features-vertical-list">
      <ul className={s.options}>
        {features.map((feature, stableIdx) => (
          <Feature
            id={stableIdx}
            // This array is stable, so we can use index as key
            // eslint-disable-next-line react/no-array-index-key
            key={stableIdx}
            title={feature.title}
            active={stableIdx === activeFeature}
            onClick={setActiveFeature}
            learnMoreLink={feature.learnMoreLink}
          >
            {feature.description}
          </Feature>
        ))}
      </ul>
      <div className={s.contentWrapper}>{features[activeFeature].content}</div>
    </div>
  )
}

function FeaturesCarousel({ features }) {
  return (
    <div className={s.featuresCarousel} data-testid="features-carousel">
      <Carousel
        renderCenterRightControls={() => null}
        renderCenterLeftControls={() => null}
        wrapAround
        swiping
        defaultControlsConfig={{
          pagingDotsContainerClassName: s.pagingDots,
        }}
        cellSpacing={40}
        getControlsContainerStyles={(key) => {
          switch (key) {
            case 'BottomCenter':
              return {
                top: 0,
              }
          }
        }}
      >
        {features.map((feature, stableIdx) => (
          // This array is stable, so we can use index as key
          // eslint-disable-next-line react/no-array-index-key
          <div key={stableIdx}>
            <Feature Element="div" id={stableIdx} title={feature.title} active>
              {feature.description}
            </Feature>
            <div className={s.contentWrapper}>
              {features[stableIdx].content}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

function Feature({
  children,
  title,
  active,
  onClick,
  learnMoreLink,
  id,
  Element = 'li',
}) {
  return (
    <Element className={active ? s.activeFeature : s.feature}>
      {onClick ? (
        <button
          className={s.heading}
          onClick={() => onClick(id)}
          aria-expanded={active}
          aria-controls={`feature-${id}`}
        >
          {title}
        </button>
      ) : (
        <span className={s.heading}>{title}</span>
      )}
      <div className={s.body} id={`feature-${id}`} aria-hidden={!active}>
        <p>{children}</p>
        {learnMoreLink && (
          <Button
            url={learnMoreLink}
            className={s.learnMoreLink}
            title="Learn more"
            linkType="inbound"
            theme={{
              variant: 'tertiary-neutral',
            }}
          />
        )}
      </div>
    </Element>
  )
}
