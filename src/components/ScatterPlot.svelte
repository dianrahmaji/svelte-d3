<script lang="ts">
  import { extent, min, scaleLinear } from 'd3'
  import { Dimension, Margin } from '../utils/dimension';
  import dataset from '../../public/my_weather_data.json'
  import type { Weather } from '../types';

  import Axis from '../components/Axis.svelte'

  const margin = new Margin(50, 50, 10, 10)
  const r = 5

  $: width = min([
    window.innerWidth * .9,
    window.innerHeight * .9
  ])
  $: dimension = new Dimension(width, width, margin)
  $: xAccessor = (d: Weather): Weather['dewPoint'] => d.dewPoint
  $: yAccessor = (d: Weather): Weather['humidity'] => d.humidity
  $: colorAccessor = (d: Weather): Weather['cloudCover'] => d.cloudCover
  $: xScale = scaleLinear()
      .domain(extent(dataset, xAccessor))
      .range([0, dimension.boundedWidth()])
      .nice()
  $: yScale = scaleLinear()
      .domain(extent(dataset, yAccessor))
      .range([dimension.boundedHeight(), 0])
      .nice()
  $: colorScale = scaleLinear()
      .domain(extent(dataset, colorAccessor))
      .range(["skyblue", "darkslategrey"])
</script>

<svg width={dimension.width} height={dimension.height}>
  <g transform="translate({dimension.margin.left}, {dimension.margin.top})">
    {#each dataset as d (d.date)}
      <circle
        {r}
        cx={xScale(xAccessor(d))}
        cy={yScale(yAccessor(d))}
        fill={colorScale(colorAccessor(d))}
      />
    {/each}
  </g>

  <Axis
  {dimension}
    scale={yScale}
    position="left"
    label="Relative humidity"
  />
  <Axis
    {dimension}
    scale={xScale}
    position="bottom"
    label="Dew point (&deg;F)"
  />
</svg>

<style lang="scss">
  svg {
    display: block;
    margin: 4rem auto 0;
  }
</style>