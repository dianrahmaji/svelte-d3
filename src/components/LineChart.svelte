<script lang="ts">
  import { draw } from 'svelte/transition'
  import { curveStep, extent, line, scaleLinear, scaleTime, timeParse } from 'd3'
  import { Margin, Dimension } from '../utils/dimension'
  import dataset from '../../public/my_weather_data.json'

  import Axis from '../components/Axis.svelte'

  import type { Weather } from '../types'
  
  // dimensions
  const margin = new Margin(0, 40, 45, 40)
  const dimension = new Dimension(420, window.innerHeight, margin)
  
  // accessors
  $: xAccessor = (d: Weather): string =>  timeParse("%Y-%m-%d")(d.date)
  $: yAccessor = (d: Weather): Weather['temperatureMax'] => d.temperatureMax
  
  // scales
  $: xScale = scaleTime()
      .domain(extent(dataset, xAccessor))
      .range([0, dimension.boundedWidth()])
  $: yScale = scaleLinear()
      .domain(extent(dataset, yAccessor))
      .range([dimension.boundedHeight(), 0])  
  
  // path
  $: d = line()
      .x(d => xScale(xAccessor(d)))
      .y(d => yScale(yAccessor(d)))
      .curve(curveStep)(dataset)
  </script>
  
  <h1>Temperature in NYC every Month in 2018</h1>

  <svg width={dimension.width} height={dimension.height}>
    <rect 
      x="0"
      y={yScale(32)}
      width={dimension.boundedWidth()}
      height={dimension.boundedHeight() - yScale(32)}
      transform="translate({margin.left}, 0)"
    />
  
    <g transform="translate({margin.left}, 0)">
      <path {d} transition:draw={{ duration: 4000 }} />
    </g>
  
    <Axis
      {dimension}
      scale={yScale}
      position="left"
      label="Month"
      />
    <Axis
      {dimension}
      scale={xScale}
      position="bottom"
      label="Temperature (°F)"
    />
  </svg>
  
  <style lang="scss">
    h1 {
      margin-top: 3rem;
      text-align: center;
    }
  
    svg {
      display: block;
      margin: 4rem auto 0;
  
      path {
        fill: none;
        stroke: #af9358;
      }
      
      rect {
        fill: #e0f3f3;
      }
    }
  </style>
  