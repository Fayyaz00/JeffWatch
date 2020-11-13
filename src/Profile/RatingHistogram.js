import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

const RatingHistogram = ({ ratings, showSpecificRatings }) => {
  let d3Container = useRef(null)
  const width = window.innerWidth < 700 ? window.innerWidth : window.innerWidth * .6
  const height = 350

  useEffect(() => {
    
    if (!ratings || !d3Container.current) return
    const colors = ['#00ff00', '#00f3a5', '#00c0ff', '#009cff', '#4c83ff', '#8761f5', '#b81cd7', '#ea00aa', '#ff0045', '#ff0000']
    const rectHeight = 30
    
    const formattedData = ratings
    .map(o => o.rating * 2 - 1)
    .reduce((acc, val) => {
      acc[val]++
      return acc
    }, [0,0,0,0,0,0,0,0,0,0])
    .reverse()
    
    const yScale = d3.scaleBand()
    .domain(formattedData.keys())
    .range([0, height])
      .padding(.20)

    const max = d3.max(formattedData, d => d)

    const xScale = d3.scaleLinear()
      .domain([0, max])
      .range([0, width-50])

    const colorScale = d3.scaleOrdinal()
      .domain(formattedData.keys())
      .range(colors)

    const svg = d3.select(d3Container.current)

    svg.selectAll('*').remove()

    const g = svg.selectAll('g')
      .data(formattedData).enter().append('g')
      .on('click', function() {
        showSpecificRatings(+this.children[1].innerHTML)
      })
      .on('mouseover', function(d,i) {
        d3.select(this)
          .style('cursor', 'pointer')
        
        d3.select(this.children[2])
          .style('visibility', 'visible')
      })
      .on('mouseout', function(d,i) {
        d3.select(this)
          .style('cursor', 'default')    

        d3.select(this.children[2])
          .style('visibility', 'hidden')
      })

    const rects = g.append('rect')
      .attr('y', (d,i) => yScale(i))
      .attr('x', 30)
      .attr('width', 0)
      .attr('height', rectHeight)
      .attr('fill', (d,i) => colorScale(i))
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('opacity', 0)
      .on('mouseover', function(d,i) {
        d3.select(this)
          .style('cursor', 'pointer')
          .transition('20')
          .attr('opacity', '.75')
      })
      .on('mouseout', function(d,i) {
        d3.select(this)
          .style('cursor', 'default')
          .transition('20')
          .attr('opacity', '1')  
      })
      .transition().duration(750)
        .attr('width', d => xScale(d))
        .attr('opacity', 1)

    const text = g.append('text')
      .text((d,i) => (((10 - i) / 2)).toFixed(1))
      .attr('dy', '1.2em')
      .attr('y', (d,i) => yScale(i))
      .style('font-weight', 'bold')

    const tooltip = g.append('text')
      .text((d,i) => d)
      .attr('y', (d,i) => yScale(i))
      .attr('dy', '1.2em')
      .attr('dx', 35)
      .style('font-weight', 'bold')
      .style('visibility', 'hidden')


  }, [ratings, width, showSpecificRatings])

  return (
    <div style={{width: width, border: '1px dashed'}}>
      <h2>Ratings: {ratings.length}</h2>
      <svg
        className="d3-component"
        width={width}
        height={height}
        ref={d3Container}
      />
    </div>
  )
}

export default RatingHistogram