import React, { Children } from 'react'
import CodeBlock from '../../index.js'
import normalizePlainCode from '../../utils/normalize-plain-code'

function CodeBlockConfig({
  className,
  children,
  filename,
  heading,
  hideClipboard,
  highlight,
  lineNumbers,
  hasBarAbove,
  theme,
}) {
  // Ensure there is exactly one valid child element
  const validChildren = Children.toArray(children)
  const childCount = Children.count(children)
  if (childCount !== 1 || validChildren.length !== 1) {
    throw new Error(
      `In CodeBlockConfig, found ${childCount} total children and ${validChildren.length} valid children. Please ensure that CodeBlockConfig has exactly one child element, and ensure it is a valid element.`
    )
  }
  // Validate that the first child is a code block
  const onlyChild = validChildren[0]
  const childType = onlyChild.props.mdxType || onlyChild.type
  if (childType !== 'pre') {
    throw new Error(
      `In CodeBlockConfig, found a child with type "${childType}". Please ensure a fenced code block, which corresponds to the MDX type "pre", is passed to CodeBlockConfig instead. In JSX, please use CodeBlock directly rather than CodeBlockConfig.`
    )
  }
  // Extract the language and code from the block
  const languageClass = onlyChild.props.className
  const language = languageClass
    ? languageClass.replace('language-', '')
    : undefined
  const codeChildren = onlyChild.props.children.props.children
  // Non-highlighted code, which appears when children are a string,
  // needs to have its HTML entities escaped.
  // Highlighted code is not affected.
  const code = normalizePlainCode(codeChildren)

  // Render the code block, using options passed to CodeBlockConfig
  return (
    <CodeBlock
      className={className}
      code={code}
      language={language}
      theme={theme}
      hasBarAbove={hasBarAbove}
      options={{
        filename,
        highlight,
        heading,
        lineNumbers,
        showClipboard: !hideClipboard,
      }}
    />
  )
}

export default CodeBlockConfig
