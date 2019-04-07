// based on:
// http://bl.ocks.org/mbostock/996370
// http://bl.ocks.org/mbostock/950642
var d3 = window.d3 // http://d3js.org/d3.v3.min.js

var w = window.innerWidth * 0.95
var h = window.innerHeight * 0.95
var currentScale = Math.sqrt(window.innerHeight * window.innerWidth) / 150


var vis = d3.select('#chart')
  .append('svg:svg')
  .attr('width', w)
  .attr('height', h)

var nodes = d3.selectAll('li')[0]
var links = nodes.slice(1).map(function (d) {
  return {source: d, target: d.parentNode.parentNode}
})

var force = d3.layout.force()
    .charge(-1 * currentScale * 100)
    .distance(10 * currentScale)
    .nodes(nodes)
    .links(links)
    .size([w, h])
    .start()

var link = vis.selectAll('line.link')
    .data(links)
  .enter().append('svg:line')
    .style('stroke', '#aaa')
    .attr('x1', function (d) { return d.source.x })
    .attr('y1', function (d) { return d.source.y })
    .attr('x2', function (d) { return d.target.x })
    .attr('y2', function (d) { return d.target.y })

var node = vis.selectAll('circle.node')
  .data(nodes).enter().append('g')
  .attr('class', 'node')
  .call(force.drag)

var clickablenodes = vis.selectAll('g')
  .filter(function (d, i) {
    var href = d.childNodes[0].href
    return (href &&
//      href.indexOf(window.location.origin) === -1 &&
      href.indexOf('#') !== (href.length -1))
  })
  .attr('class', 'node clickablenode')
  .style('fill', '#00f')

var circleD = 1 + (currentScale * 0.5)
node.append('svg:circle')
    .style('fill', '#000')
    .style('stroke', '#fff')
    .attr('r', circleD)

var clickAction = function (d) {
  var a = d.childNodes[0]
  if (a.target === '_blank') a.click() // here we check if the target is blank, then open it in a new window
  else { // else, just use jquery to load the content in the div/section
    console.log(a.href)
    window.$('#bodyContent').load(a.href, function () {
      window.scrollBy(0, window.innerHeight * 0.9) // scroll to it
    })
  }
}

clickablenodes.on('click', clickAction)

node.append('text')
  .attr('dx', 12)
  .attr('dy', '.35em')
  .text(function (d) { return d.childNodes[0].textContent })

force.on('tick', function () {
  link.attr('x1', function (d) { return d.source.x })
      .attr('y1', function (d) { return d.source.y })
      .attr('x2', function (d) { return d.target.x })
      .attr('y2', function (d) { return d.target.y })

  node.attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')' })
})

// see the following as a noscript solution
document.getElementById('list').style.display = 'none'
