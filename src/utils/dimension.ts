export class Margin {
  bottom: number
  left: number
  right: number
  top: number

  constructor(bottom: number, left: number, right: number, top: number) {
    this.bottom = bottom
    this.left = left
    this.right = right
    this.top = top
  }

  horizontalMargin(): number {
    return this.right + this.left
  }

  verticalMargin(): number {
    return this.top + this.bottom
  }
}

export class Dimension {
  height: number
  width: number
  margin: Margin

  constructor(height: number, width: number, margin: Margin) {
    this.height = height
    this.width = width
    this.margin = margin
  }

  boundedHeight(): number {
    return this.height - this.margin.verticalMargin()
  }

  boundedWidth(): number {
    return this.width - this.margin.horizontalMargin()
  }
}
