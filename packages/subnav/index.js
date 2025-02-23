import classNames from 'classnames'
import useProductMeta from '@hashicorp/platform-product-meta'
import useNavRef from './helpers/useNavRef'

import MenuItemsOverflow from './partials/MenuItemsOverflow/index.js'
import TitleLink from './partials/TitleLink/index.js'
import MenuItemsDefault from './partials/MenuItemsDefault/index.js'
import CtaLinks from './partials/CtaLinks/index.js'
import traverse, { isObject } from './helpers/traverse/index.js'
import { areBasePathsMatching } from './helpers/areBasePathsMatching'

const productAllowList = {
  consul: 'consul',
  hcp: 'hcp',
  nomad: 'nomad',
  packer: 'packer',
  terraform: 'terraform',
  tfc: 'terraform',
  vagrant: 'vagrant',
  vault: 'vault',
  boundary: 'boundary',
  waypoint: 'waypoint',
}

function SubnavInner({
  hasOverflow,
  titleLink,
  product,
  ctaLinks = [],
  hideGithubStars,
  menuItems,
  menuItemsAlign = 'center',
  constrainWidth,
  currentPath,
  Link,
  matchOnBasePath = false,
}) {
  const { themeClass } = useProductMeta(product) // overrides --brand css vars
  // Add _isActiveUrl to menuItems so we can highlight them appropriately
  const menuItemsWithActive = traverse(menuItems, (_key, value) => {
    const hasUrl = isObject(value) && value.url
    if (hasUrl) {
      value._isActiveUrl = matchOnBasePath
        ? areBasePathsMatching(value.url, currentPath)
        : value.url === currentPath
    }
    return value
  })

  return (
    <div
      className={classNames('constrain-width-wrapper ', {
        'g-grid-container': constrainWidth,
      })}
    >
      <div
        className={classNames('g-subnav-inner', themeClass, {
          'is-constrained': constrainWidth,
        })}
        data-overflow-target
      >
        <TitleLink
          text={titleLink.text}
          url={titleLink.url}
          product={product}
          Link={Link}
        />
        {!hasOverflow && (
          <MenuItemsDefault
            menuItems={menuItemsWithActive}
            menuItemsAlign={menuItemsAlign}
            product={product}
            Link={Link}
          />
        )}
        {!hasOverflow && (
          <CtaLinks
            links={ctaLinks}
            product={product}
            Link={Link}
            hideGithubStars={hideGithubStars}
          />
        )}
        {hasOverflow && (
          <MenuItemsOverflow
            menuItems={menuItemsWithActive}
            ctaLinks={ctaLinks}
            hideGithubStars={hideGithubStars}
            product={product}
            Link={Link}
          />
        )}
      </div>
    </div>
  )
}

function Subnav(props) {
  const [isSticky, hasOverflow, wrapperRef] = useNavRef()
  // Set the brand theme automatically based on the nav's title
  const product =
    productAllowList[props.titleLink.text.toLowerCase()] || 'hashicorp'

  return (
    <nav
      ref={wrapperRef}
      className={classNames('g-subnav', {
        'is-sticky': isSticky,
      })}
      aria-label={`${product} website navigation`}
    >
      <SubnavInner
        {...props}
        product={product}
        hasOverflow={hasOverflow}
        isSticky={isSticky}
      />
    </nav>
  )
}

export default Subnav
