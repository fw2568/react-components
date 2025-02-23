import useProductMeta from '@hashicorp/platform-product-meta'
import classNames from 'classnames'
import Button from '@hashicorp/react-button'

export default function ContentCta({
  heading,
  content,
  product = 'hashicorp',
  links,
}) {
  if (!heading || !content) {
    throw new Error('<ContentCTA /> requires heading & content props')
  }
  const hasLinks = links && links.length > 0
  if (hasLinks && links.filter((l) => !l.title || !l.url).length > 0) {
    throw new Error('<ContentCTA /> `links` must have both a title and a URL')
  }
  const isContentString = typeof content === 'string'
  const isContentRenderProp = typeof content === 'function'
  const { themeClass } = useProductMeta(product)

  return (
    <div
      className={classNames('g-content-cta', themeClass, {
        hasTheme: themeClass,
      })}
    >
      <h4 data-testid="heading" className="g-type-display-4">
        {heading}
      </h4>

      {isContentString ? (
        <p data-testid="content" className="g-type-body">
          {content}
        </p>
      ) : isContentRenderProp ? (
        content()
      ) : null}
      {hasLinks && (
        <div data-testid="links" className="links">
          {links.map(({ title, url }, i) => (
            <Button
              key={title}
              title={title}
              url={url}
              theme={{
                brand: product,
                variant: i === 0 ? 'primary' : 'secondary',
              }}
              size="small"
            />
          ))}
        </div>
      )}
    </div>
  )
}
