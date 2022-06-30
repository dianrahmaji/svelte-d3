<script lang="ts">
  import { axisBottom, axisLeft, select } from 'd3'

  import type { Dimension } from 'src/utils/dimension'
  import type { Position } from '../types'


  export let label: string
  export let scale: string
  export let position: Position
  export let dimension: Dimension

  let g: SVGElement
  let axisTransform: string
  let labelTransform: string
  let x: number
  let y: number

  $: {
    select(g).selectAll("*").remove()

    let axis
    
    switch(position) {
      case 'bottom':
        axis = axisBottom(scale).tickSizeOuter(0)
        axisTransform = `translate(${dimension.margin.left}, ${dimension.boundedHeight()})`
        labelTransform = `translate(15, ${dimension.boundedHeight() / 2 + (label.length * 3)}) rotate(-90)`
        break
      case 'left':
        axis = axisLeft(scale).tickSizeOuter(0)
        axisTransform = `translate(${dimension.margin.left}, 0)`
        x = dimension.boundedWidth() / 2
        y = dimension.boundedHeight() + 35
        break
    }

    select(g).call(axis)
  }

  $: {

  }
</script>

<g bind:this={g} transform={axisTransform} />
<text {x} {y} transform={labelTransform}>{label}</text>
